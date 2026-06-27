import { useCallback, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

/* ── INFO database ─────────────────────────────────────────────────────────
 * Community-CTAs only — keine kommerziellen Calls, kein 112-Bezug.
 * Kennzeichen, Namen und Daten sind fiktiv (Huntefeld = fiktiv).
 * ──────────────────────────────────────────────────────────────────────── */
const INFO = {
  station: {
    icon: '🏛️',
    shortName: 'Feuerwehrhaus',
    plate: 'Zentrum · Wache',
    title: 'Feuerwehrhaus Huntefeld',
    text: 'Zentrale Anlaufstelle für Einsätze, Ausbildung, Jugendfeuerwehr und das aktive Vereinsleben. Klicke erneut um die Innenbeleuchtung zu deaktivieren.',
    cta: 'Mitglied werden',
    ctaLink: '#mitmachen',
  },
  hlf: {
    icon: '🚒',
    shortName: 'HLF 20',
    plate: 'HUN-FW 2',
    title: 'HLF 20 – Hilfeleistungslöschgruppenfahrzeug',
    text: 'Symbol für Einsatzbereitschaft, technische Hilfeleistung und Brandschutz. Löst beim Auswählen die Blaulicht-Animation aus.',
    cta: 'Einsatzabteilung entdecken',
    ctaLink: '#einsatzabteilung',
  },
  mtw: {
    icon: '🚐',
    shortName: 'MTW',
    plate: 'HUN-FW 1',
    title: 'MTW – Mannschaftstransportwagen',
    text: 'Ideal für Mannschaftstransport, Jugendfeuerwehr, Ausbildung und Vereinsfahrten. Schnell, flexibel, teamorientiert.',
    cta: 'Jugendfeuerwehr beitreten',
    ctaLink: '#jugendfeuerwehr',
  },
  trailer: {
    icon: '🔧',
    shortName: 'Anhänger',
    plate: 'HUN-FW A1',
    title: 'Feuerwehr-Anhänger',
    text: 'Zusatzmaterial für Unwetterlagen, Logistik und besondere Einsätze – schnell einsatzbereit und vielseitig nutzbar.',
    cta: 'Kinderfeuerwehr entdecken',
    ctaLink: '#kinderfeuerwehr',
  },
} as const

type InfoKey = keyof typeof INFO

const VEHICLE_IDS: InfoKey[] = ['station', 'hlf', 'mtw', 'trailer']

/* ── Siren (Web Audio API) ────────────────────────────────────────────────
 * 2x Sägezahn-Sweep: 900→660 Hz, dann 660→900 Hz, je 0.82 s.
 * Gain-Envelope: 0 → 0.07 → 0.07 → 0 (identisch zum Design-Original).
 * ──────────────────────────────────────────────────────────────────────── */
function playSirenOnCtx(ctx: AudioContext) {
  if (ctx.state === 'suspended') ctx.resume()
  for (let i = 0; i < 2; i++) {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain)
    gain.connect(ctx.destination)
    const st = ctx.currentTime + i * 0.88
    const f1 = i === 0 ? 900 : 660
    const f2 = i === 0 ? 660 : 900
    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(f1, st)
    osc.frequency.linearRampToValueAtTime(f2, st + 0.82)
    gain.gain.setValueAtTime(0, st)
    gain.gain.linearRampToValueAtTime(0.07, st + 0.06)
    gain.gain.linearRampToValueAtTime(0.07, st + 0.76)
    gain.gain.linearRampToValueAtTime(0, st + 0.88)
    osc.start(st)
    osc.stop(st + 0.88)
  }
}

/* ── Component ─────────────────────────────────────────────────────────── */
export default function Feuerwehr3DDiorama() {
  const containerRef = useRef<HTMLDivElement>(null)

  // UI state
  const [selected, setSelected] = useState<InfoKey | null>(null)
  const [hovered, setHovered] = useState<InfoKey | null>(null)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [webglError, setWebglError] = useState(false)

  // Stable refs for rAF loop (avoids stale closure on state)
  const selectedRef = useRef<InfoKey | null>(null)
  const hoveredRef = useRef<InfoKey | null>(null)
  const soundEnabledRef = useRef(false)
  selectedRef.current = selected
  hoveredRef.current = hovered
  soundEnabledRef.current = soundEnabled

  // Three.js handles (mutations, never cause re-renders)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const animIdRef = useRef<number | null>(null)
  const resizeObsRef = useRef<ResizeObserver | null>(null)
  const audioCtxRef = useRef<AudioContext | null>(null)
  const mxRef = useRef(0)
  const myRef = useRef(0)
  const objectsRef = useRef<Partial<Record<InfoKey, THREE.Group>>>({})
  const clickablesRef = useRef<THREE.Group[]>([])
  const stationIntLightRef = useRef<THREE.PointLight | null>(null)
  const hlfBlueLightsRef = useRef<{ mat: THREE.MeshLambertMaterial; phase: number }[]>([])
  const hlfPointLightsRef = useRef<THREE.PointLight[]>([])

  /* ── Three.js scene setup (runs once on mount) ─────────────────────── */
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // WebGL availability check
    try {
      const probe = document.createElement('canvas')
      if (!probe.getContext('webgl') && !probe.getContext('experimental-webgl')) {
        throw new Error('no webgl')
      }
    } catch {
      setWebglError(true)
      return
    }

    /* ── Scene helpers ─────────────────────────────────────────────────── */
    function box(
      w: number, h: number, d: number,
      color: number,
      opts: THREE.MeshLambertMaterialParameters = {},
    ): THREE.Mesh {
      const m = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, d),
        new THREE.MeshLambertMaterial({ color, ...opts }),
      )
      m.castShadow = true
      m.receiveShadow = true
      return m
    }

    function cyl(
      rt: number, rb: number, h: number, segs: number,
      color: number,
      opts: THREE.MeshLambertMaterialParameters = {},
    ): THREE.Mesh {
      const m = new THREE.Mesh(
        new THREE.CylinderGeometry(rt, rb, h, segs),
        new THREE.MeshLambertMaterial({ color, ...opts }),
      )
      m.castShadow = true
      return m
    }

    function reg(group: THREE.Group) {
      group.traverse(o => {
        if ((o as THREE.Mesh).isMesh) o.userData.gid = group.userData.id
      })
      clickablesRef.current.push(group)
    }

    function addWheels(
      g: THREE.Group,
      halfLen: number, halfZ: number, r: number, thick: number,
    ) {
      const wg = new THREE.CylinderGeometry(r, r, thick, 10)
      const wm = new THREE.MeshLambertMaterial({ color: 0x1a1a1a })
      const hg = new THREE.CylinderGeometry(r * 0.44, r * 0.44, thick + 0.01, 8)
      const hm = new THREE.MeshLambertMaterial({ color: 0x888888 })
      for (const x of [-halfLen, halfLen]) {
        for (const z of [-halfZ - thick / 2, halfZ + thick / 2]) {
          const w = new THREE.Mesh(wg, wm)
          w.rotation.x = Math.PI / 2; w.position.set(x, r, z); w.castShadow = true; g.add(w)
          const hub = new THREE.Mesh(hg, hm)
          hub.rotation.x = Math.PI / 2; hub.position.set(x, r, z); g.add(hub)
        }
      }
    }

    function addPlate(g: THREE.Group, x: number, y: number, z: number) {
      const p = box(0.55, 0.18, 0.05, 0xfafafa); p.position.set(x, y, z); g.add(p)
      const eu = box(0.08, 0.18, 0.06, 0x0044aa); eu.position.set(x - 0.24, y, z + 0.01); g.add(eu)
      const txt = box(0.42, 0.07, 0.06, 0x111111); txt.position.set(x + 0.04, y, z + 0.01); g.add(txt)
    }

    /* ── Renderer ──────────────────────────────────────────────────────── */
    const W = el.clientWidth || 800
    const H = el.clientHeight || 480

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setSize(W, H)
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setClearColor(0x0d1823, 1)
    el.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100)
    camera.position.set(12, 9, 12)
    camera.lookAt(0, 1.5, 0)

    const clock = new THREE.Clock()

    /* ── Scene ─────────────────────────────────────────────────────────── */
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x0d1823, 0.022)

    const sg = new THREE.Group()
    sg.rotation.y = -0.35
    scene.add(sg)

    // Lighting
    sg.add(new THREE.AmbientLight(0x3a4d66, 1.1))
    sg.add(new THREE.HemisphereLight(0x4466aa, 0x221100, 0.55))

    const sun = new THREE.DirectionalLight(0xfff0e0, 1.5)
    sun.position.set(9, 14, 7)
    sun.castShadow = true
    sun.shadow.mapSize.set(1024, 1024)
    const sc = sun.shadow.camera as THREE.OrthographicCamera
    sc.left = sc.bottom = -15; sc.right = sc.top = 15; sc.far = 55
    sg.add(sun)

    const fill = new THREE.DirectionalLight(0x334488, 0.35)
    fill.position.set(-8, 4, -8); sg.add(fill)

    /* ── Ground ────────────────────────────────────────────────────────── */
    const disk = new THREE.Mesh(
      new THREE.CircleGeometry(15, 72),
      new THREE.MeshLambertMaterial({ color: 0x131b28 }),
    )
    disk.rotation.x = -Math.PI / 2; disk.receiveShadow = true; sg.add(disk)

    const court = box(11, 0.02, 9, 0x1e2a3a); court.position.set(0, 0.01, 0.5); sg.add(court)

    for (const lx of [-1.7, 1.7]) {
      const line = box(0.09, 0.02, 5.5, 0xd4a800, { opacity: 0.45, transparent: true })
      line.position.set(lx, 0.02, 1.0); sg.add(line)
    }
    const sep = box(0.09, 0.02, 5.5, 0x4a6080, { opacity: 0.3, transparent: true })
    sep.position.set(-1.7, 0.02, 1.0); sg.add(sep)

    /* ── Feuerwehrhaus ─────────────────────────────────────────────────── */
    {
      const g = new THREE.Group(); g.userData.id = 'station'
      const BW = 5.6, BH = 2.8, BD = 3.6

      // Main body + wing
      const body = box(BW, BH, BD, 0xdde4ed); body.position.y = BH / 2; g.add(body)
      const wing = box(1.7, 2.0, BD, 0xcdd3dc); wing.position.set(3.65, 1.0, 0); g.add(wing)

      // Gable roof (two angled slabs)
      const rh = 1.25, rw = BW + 0.22, rd = BD + 0.22
      const halfW = rw / 2
      const sLen = Math.sqrt(halfW * halfW + rh * rh)
      const ang = Math.atan2(rh, halfW)
      const roofMat = new THREE.MeshLambertMaterial({ color: 0x2d3a4e })
      for (const [sign, posX] of [[-1, -halfW / 2], [1, halfW / 2]] as [number, number][]) {
        const slope = new THREE.Mesh(new THREE.BoxGeometry(sLen, 0.2, rd), roofMat)
        slope.castShadow = true
        slope.rotation.z = sign * ang
        slope.position.set(posX, BH + rh / 2, 0)
        g.add(slope)
      }

      // Wing flat roof + parapet
      const wr = box(1.72, 0.2, BD + 0.22, 0x2d3a4e); wr.position.set(3.65, 2.1, 0); g.add(wr)
      const para = box(1.72, 0.3, 0.12, 0x2d3a4e); para.position.set(3.65, 2.32, -(BD / 2 + 0.11)); g.add(para)

      // Garage doors (2 bays)
      for (const dx of [-1.25, 1.25]) {
        const door = box(2.1, 2.3, 0.1, 0x68748a); door.position.set(dx, 1.15, BD / 2 + 0.06); g.add(door)
        for (let j = 0; j < 4; j++) {
          const panel = box(2.0, 0.05, 0.06, 0x58627a)
          panel.position.set(dx, 0.38 + j * 0.57, BD / 2 + 0.12); g.add(panel)
        }
      }

      // Door frame
      const ft = box(4.7, 0.14, 0.12, 0xfafafa); ft.position.set(0, 2.4, BD / 2 + 0.08); g.add(ft)
      const fv = box(0.12, 2.38, 0.12, 0xfafafa); fv.position.set(0, 1.19, BD / 2 + 0.08); g.add(fv)

      // Red sign band
      const sign = box(BW, 0.44, 0.09, 0xcc1111); sign.position.set(0, BH + 0.01, BD / 2 + 0.08); g.add(sign)
      const stxt = box(BW - 0.5, 0.11, 0.1, 0xffffff, { opacity: 0.85, transparent: true })
      stxt.position.set(0, BH + 0.01, BD / 2 + 0.12); g.add(stxt)

      // Upper windows
      const winMat = new THREE.MeshLambertMaterial({ color: 0x7aaabb, emissive: 0x224455, emissiveIntensity: 0.4 })
      for (const wx of [-2.1, 2.1]) {
        const win = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.68, 0.09), winMat)
        win.position.set(wx, 2.22, BD / 2 + 0.08); g.add(win)
        const sill = box(1.0, 0.08, 0.16, 0xdddddd); sill.position.set(wx, 1.84, BD / 2 + 0.1); g.add(sill)
      }

      // Side windows (right face)
      const sWinMat = new THREE.MeshLambertMaterial({ color: 0x7aaabb, emissive: 0x224455, emissiveIntensity: 0.3 })
      for (const wz of [-1.1, 0, 1.1]) {
        const sw = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.55, 0.7), sWinMat)
        sw.position.set(BW / 2 + 0.06, 1.9, wz); g.add(sw)
      }

      // Door lamp
      const doorLamp = cyl(0.08, 0.08, 0.22, 8, 0xffffcc, { emissive: 0xffff88, emissiveIntensity: 0.9 })
      doorLamp.rotation.z = Math.PI / 2; doorLamp.position.set(0, 2.7, BD / 2 + 0.2); g.add(doorLamp)

      // Interior point light (animated when selected)
      const intLight = new THREE.PointLight(0xffaa44, 0, 5)
      intLight.position.set(0, 1.0, 0); g.add(intLight)
      stationIntLightRef.current = intLight

      g.position.set(0, 0, -3.8)
      sg.add(g)
      objectsRef.current.station = g
      reg(g)
    }

    /* ── HLF 20 ────────────────────────────────────────────────────────── */
    {
      const g = new THREE.Group(); g.userData.id = 'hlf'

      // Body + cab
      const body = box(3.0, 1.1, 1.3, 0xcc1111); body.position.set(0.15, 0.82, 0); g.add(body)
      const cab = box(1.0, 1.32, 1.3, 0xcc1111); cab.position.set(-1.05, 0.92, 0); g.add(cab)
      const cabRoof = box(1.0, 0.14, 1.35, 0xaa0d0d); cabRoof.position.set(-1.05, 1.59, 0); g.add(cabRoof)
      const ws = box(0.08, 0.56, 0.94, 0x1a2c3e); ws.position.set(-1.56, 1.1, 0); g.add(ws)
      const grl = box(0.08, 0.36, 0.9, 0x222222); grl.position.set(-1.57, 0.52, 0); g.add(grl)
      const bmp = box(0.1, 0.3, 1.2, 0x888888); bmp.position.set(-1.57, 0.25, 0); g.add(bmp)

      // Reflective side stripes
      const stripe = box(3.1, 0.17, 0.05, 0xffffff); stripe.position.set(0.15, 0.8, 0.68); g.add(stripe)
      const stripeB = box(3.1, 0.17, 0.05, 0xffffff); stripeB.position.set(0.15, 0.8, -0.68); g.add(stripeB)

      // Lightbar base
      const lb = box(1.3, 0.17, 0.44, 0x111111); lb.position.set(-0.5, 1.72, 0); g.add(lb)

      // Blue lights (2 spheres, alternating blink)
      const blueLights: { mat: THREE.MeshLambertMaterial; phase: number }[] = []
      const blueConfig: [number, number][] = [[-0.9, 0], [-0.1, Math.PI]]
      for (const [lx, phase] of blueConfig) {
        const lm = new THREE.MeshLambertMaterial({ color: 0x33aaff, emissive: 0x33aaff, emissiveIntensity: 1.0 })
        const ls = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 6), lm)
        ls.position.set(lx, 1.87, 0); g.add(ls)
        blueLights.push({ mat: lm, phase })
      }
      hlfBlueLightsRef.current = blueLights

      const bl1 = new THREE.PointLight(0x2288ff, 0, 3.5); bl1.position.set(-0.9, 2.1, 0); g.add(bl1)
      const bl2 = new THREE.PointLight(0x2288ff, 0, 3.5); bl2.position.set(-0.1, 2.1, 0); g.add(bl2)
      hlfPointLightsRef.current = [bl1, bl2]

      // Equipment compartments
      for (const zs of [1, -1]) {
        const comp = box(1.9, 0.58, 0.07, 0xaa0d0d); comp.position.set(0.5, 0.52, zs * 0.69); g.add(comp)
        for (const cx of [-0.6, 0, 0.6]) {
          const hdl = box(0.04, 0.5, 0.08, 0x880a0a); hdl.position.set(0.5 + cx, 0.52, zs * 0.7); g.add(hdl)
        }
      }

      addWheels(g, 1.55, 0.68, 0.31, 0.19)
      addPlate(g, 0.15, 0.32, 0.7)

      g.position.set(0.3, 0, 1.8); g.rotation.y = 0.07
      sg.add(g)
      objectsRef.current.hlf = g
      reg(g)
    }

    /* ── MTW ───────────────────────────────────────────────────────────── */
    {
      const g = new THREE.Group(); g.userData.id = 'mtw'

      const body = box(2.3, 1.02, 1.12, 0xcc1111); body.position.set(0.05, 0.73, 0); g.add(body)
      const cab = box(0.88, 1.17, 1.12, 0xcc1111); cab.position.set(-0.77, 0.8, 0); g.add(cab)
      const ws = box(0.07, 0.51, 0.88, 0x1a2c3e); ws.position.set(-1.22, 0.92, 0); g.add(ws)
      const stripe = box(2.35, 0.14, 0.05, 0xffffff); stripe.position.set(0.05, 0.55, 0.6); g.add(stripe)
      const bmp = box(0.08, 0.28, 1.0, 0x888888); bmp.position.set(-1.23, 0.22, 0); g.add(bmp)

      const swinMat = new THREE.MeshLambertMaterial({ color: 0x7aaabb, emissive: 0x224455, emissiveIntensity: 0.3 })
      for (const zs of [1, -1]) {
        for (const wx of [-0.4, 0.4]) {
          const sw = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.38, 0.07), swinMat)
          sw.position.set(wx, 0.95, zs * 0.6); g.add(sw)
        }
      }

      addWheels(g, 1.15, 0.58, 0.27, 0.16)
      addPlate(g, 0, 0.28, 0.61)

      g.position.set(-3.6, 0, 0.6); g.rotation.y = 0.16
      sg.add(g)
      objectsRef.current.mtw = g
      reg(g)
    }

    /* ── Anhänger ──────────────────────────────────────────────────────── */
    {
      const g = new THREE.Group(); g.userData.id = 'trailer'

      const frame = box(1.95, 0.13, 1.05, 0x252e3c); frame.position.set(0, 0.22, 0); g.add(frame)
      const body = box(1.8, 0.68, 1.0, 0xcc1111); body.position.set(0, 0.62, 0); g.add(body)
      const cover = box(1.62, 0.1, 0.92, 0xaa0d0d); cover.position.set(0, 0.98, 0); g.add(cover)

      for (const zs of [1, -1]) {
        const stripe = box(1.82, 0.1, 0.05, 0xffffff); stripe.position.set(0, 0.36, zs * 0.49); g.add(stripe)
      }

      // Rear chevrons
      const chevL = box(0.06, 0.62, 0.06, 0xffcc00); chevL.position.set(-0.88, 0.6, 0.5); g.add(chevL)
      const chevR = box(0.06, 0.62, 0.06, 0xcc1111); chevR.position.set(-0.55, 0.6, 0.5); g.add(chevR)

      // Hitch
      const hitch = cyl(0.04, 0.04, 0.58, 6, 0x555555); hitch.rotation.z = Math.PI / 2; hitch.position.set(-1.22, 0.18, 0); g.add(hitch)
      const ball = cyl(0.08, 0.07, 0.1, 8, 0x888888); ball.position.set(-1.54, 0.18, 0); g.add(ball)

      // Single axle wheels
      for (const zs of [1, -1]) {
        const zp = zs * 0.6
        const wh = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.14, 10), new THREE.MeshLambertMaterial({ color: 0x1a1a1a }))
        wh.rotation.x = Math.PI / 2; wh.position.set(0, 0.22, zp); wh.castShadow = true; g.add(wh)
        const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.15, 8), new THREE.MeshLambertMaterial({ color: 0x777777 }))
        hub.rotation.x = Math.PI / 2; hub.position.set(0, 0.22, zp); g.add(hub)
      }

      addPlate(g, 0, 0.3, 0.54)

      g.position.set(3.6, 0, 0.6); g.rotation.y = -0.16
      sg.add(g)
      objectsRef.current.trailer = g
      reg(g)
    }

    /* ── Scene details ─────────────────────────────────────────────────── */
    // Lamp posts
    const lampPositions: [number, number][] = [[-5.5, -3], [5.5, -3]]
    for (const [px, pz] of lampPositions) {
      const post = cyl(0.055, 0.075, 6, 8, 0x3a4a5e); post.position.set(px, 3, pz); sg.add(post)
      const head = box(0.8, 0.15, 0.15, 0x3a4a5e); head.position.set(px, 6.1, pz); sg.add(head)
      const glowM = new THREE.MeshLambertMaterial({ color: 0xfffce0, emissive: 0xffffaa, emissiveIntensity: 1.0 })
      const glow = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.1, 0.25, 8), glowM)
      glow.position.set(px, 5.97, pz); sg.add(glow)
      const pl = new THREE.PointLight(0xfffde8, 0.8, 6); pl.position.set(px, 5.7, pz); sg.add(pl)
    }

    // Hydrant
    const hyb = cyl(0.1, 0.12, 0.48, 8, 0xcc3300); hyb.position.set(-6, 0.24, 1.8); sg.add(hyb)
    const hyt = cyl(0.14, 0.1, 0.12, 8, 0xcc3300); hyt.position.set(-6, 0.54, 1.8); sg.add(hyt)
    const hyk = cyl(0.05, 0.05, 0.2, 6, 0xaa2200); hyk.position.set(-6, 0.72, 1.8); sg.add(hyk)

    // Info board
    const bpost = cyl(0.04, 0.04, 2.8, 6, 0x3a4a5e); bpost.position.set(6.2, 1.4, -3.2); sg.add(bpost)
    const brd = box(1.0, 0.6, 0.07, 0xcc1111); brd.position.set(6.2, 2.95, -3.2); sg.add(brd)
    const brdW = box(0.85, 0.12, 0.09, 0xffffff, { opacity: 0.8, transparent: true })
    brdW.position.set(6.2, 2.95, -3.16); sg.add(brdW)

    // Sandbags
    for (let i = 0; i < 3; i++) {
      const sb = box(0.35, 0.18, 0.22, 0x8a7a4a); sb.position.set(-2.4 + i * 0.38, 0.09, 3.0); sg.add(sb)
    }

    /* ── Resize observer ───────────────────────────────────────────────── */
    const resizeObs = new ResizeObserver(() => {
      const w2 = el.clientWidth || 800
      const h2 = el.clientHeight || 480
      renderer.setSize(w2, h2)
      camera.aspect = w2 / h2
      camera.updateProjectionMatrix()
    })
    resizeObs.observe(el)
    resizeObsRef.current = resizeObs

    /* ── Raycasting helpers ────────────────────────────────────────────── */
    function getHitId(clientX: number, clientY: number): InfoKey | null {
      const rect = renderer.domElement.getBoundingClientRect()
      const nx = ((clientX - rect.left) / rect.width) * 2 - 1
      const ny = -((clientY - rect.top) / rect.height) * 2 + 1
      mxRef.current = nx; myRef.current = ny

      const ray = new THREE.Raycaster()
      ray.setFromCamera(new THREE.Vector2(nx, ny), camera)

      const meshes: THREE.Mesh[] = []
      clickablesRef.current.forEach(grp =>
        grp.traverse(o => { if ((o as THREE.Mesh).isMesh) meshes.push(o as THREE.Mesh) })
      )
      const hits = ray.intersectObjects(meshes)
      return hits.length > 0 ? (hits[0].object.userData.gid as InfoKey) : null
    }

    function activateObject(id: InfoKey) {
      if (id === 'station' && stationIntLightRef.current) {
        stationIntLightRef.current.intensity = 3.0
      }
      if (id === 'hlf' && soundEnabledRef.current && audioCtxRef.current) {
        playSirenOnCtx(audioCtxRef.current)
      }
    }

    /* ── Event listeners ───────────────────────────────────────────────── */
    function onMouseMove(e: MouseEvent) {
      const id = getHitId(e.clientX, e.clientY)
      if (id !== hoveredRef.current) {
        renderer.domElement.style.cursor = id ? 'pointer' : 'default'
        setHovered(id)
      }
    }

    function onClickCanvas(e: MouseEvent) {
      const id = getHitId(e.clientX, e.clientY)
      if (!id) { setSelected(null); return }
      if (id === selectedRef.current) { setSelected(null); return }
      activateObject(id)
      setSelected(id)
    }

    function onTouchEnd(e: TouchEvent) {
      if (!e.changedTouches.length) return
      const t = e.changedTouches[0]
      const id = getHitId(t.clientX, t.clientY)
      if (!id) { setSelected(null); return }
      if (id === selectedRef.current) { setSelected(null); return }
      activateObject(id)
      setSelected(id)
    }

    renderer.domElement.addEventListener('mousemove', onMouseMove)
    renderer.domElement.addEventListener('click', onClickCanvas)
    renderer.domElement.addEventListener('touchend', onTouchEnd, { passive: true })

    /* ── Animation loop ────────────────────────────────────────────────── */
    function animate() {
      animIdRef.current = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()
      const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false

      const sel = selectedRef.current
      const hov = hoveredRef.current

      // Gentle scene oscillation
      if (!reduced) {
        sg.rotation.y = -0.35 + Math.sin(t * 0.14) * 0.22
      }

      // Camera parallax follow mouse
      if (!reduced) {
        const tx = 12 + mxRef.current * 1.8
        const ty = 9 + myRef.current * 1.1
        camera.position.x += (tx - camera.position.x) * 0.035
        camera.position.y += (ty - camera.position.y) * 0.035
        camera.lookAt(0, 1.5, 0)
      }

      // Hover/select float & scale for each object
      for (const [id, grp] of Object.entries(objectsRef.current) as [InfoKey, THREE.Group][]) {
        if (!grp) continue
        const isS = sel === id
        const isH = hov === id && !isS
        const targetScale = isS ? 1.08 : isH ? 1.04 : 1.0
        const targetY = isS ? 0.14 : isH ? 0.07 : 0
        if (!reduced) {
          grp.scale.x += (targetScale - grp.scale.x) * 0.11
          grp.scale.y += (targetScale - grp.scale.y) * 0.11
          grp.scale.z += (targetScale - grp.scale.z) * 0.11
          grp.position.y += (targetY - grp.position.y) * 0.11
        }
      }

      // HLF blue light animation
      const blink = sel === 'hlf' && !reduced
      hlfBlueLightsRef.current.forEach(({ mat, phase }) => {
        if (blink) {
          const on = Math.sin(t * 11 + phase) > 0
          mat.emissiveIntensity = on ? 2.8 : 0.05
          mat.color.setHex(on ? 0x44ccff : 0x112233)
          mat.emissive.setHex(on ? 0x44ccff : 0x001122)
        } else {
          mat.emissiveIntensity = 0.4
          mat.color.setHex(0x33aaff)
          mat.emissive.setHex(0x33aaff)
        }
      })
      hlfPointLightsRef.current.forEach((pl, i) => {
        pl.intensity = blink ? (Math.sin(t * 11 + i * Math.PI) > 0 ? 4.5 : 0) : 0
      })

      // Station interior light (warm pulse)
      const intLight = stationIntLightRef.current
      if (intLight) {
        const target = sel === 'station' ? 0.8 + Math.sin(t * 2.2) * 0.18 : 0
        intLight.intensity += (target - intLight.intensity) * 0.07
      }

      renderer.render(scene, camera)
    }

    animate()

    /* ── Cleanup ───────────────────────────────────────────────────────── */
    return () => {
      if (animIdRef.current !== null) cancelAnimationFrame(animIdRef.current)
      resizeObs.disconnect()
      renderer.domElement.removeEventListener('mousemove', onMouseMove)
      renderer.domElement.removeEventListener('click', onClickCanvas)
      renderer.domElement.removeEventListener('touchend', onTouchEnd)
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
      renderer.dispose()
      rendererRef.current = null
      objectsRef.current = {}
      clickablesRef.current = []
      hlfBlueLightsRef.current = []
      hlfPointLightsRef.current = []
      stationIntLightRef.current = null
    }
  }, []) // intentionally empty — Three.js scene is imperative, state via refs

  /* ── Sound toggle ──────────────────────────────────────────────────── */
  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => {
      const next = !prev
      if (next && !audioCtxRef.current) {
        const AC = window.AudioContext ?? (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
        if (AC) audioCtxRef.current = new AC()
      }
      return next
    })
  }, [])

  /* ── UI select (sidebar / keyboard bar) ────────────────────────────── */
  const doSelectUI = useCallback((id: InfoKey) => {
    const isCurrentlySelected = selectedRef.current === id
    if (!isCurrentlySelected) {
      if (id === 'station' && stationIntLightRef.current) {
        stationIntLightRef.current.intensity = 3.0
      }
      if (id === 'hlf' && soundEnabledRef.current && audioCtxRef.current) {
        playSirenOnCtx(audioCtxRef.current)
      }
    }
    setSelected(prev => (prev === id ? null : id))
  }, [])

  /* ── Render ────────────────────────────────────────────────────────── */
  const info = selected ? INFO[selected] : null

  return (
    <div className="w-full">

      {/* Canvas + Sidebar */}
      <div className="flex gap-5 items-start flex-wrap">

        {/* Canvas wrapper */}
        <div
          className="flex-1 min-w-[300px] relative rounded-[18px] overflow-hidden border border-white/[0.06]"
          style={{ background: '#0d1823', boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}
        >
          <div
            ref={containerRef}
            className="w-full relative"
            style={{ height: 'clamp(320px, 48vw, 560px)' }}
          />

          {webglError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#0d1823] p-8 text-center">
              <span className="text-5xl">⚠️</span>
              <p className="text-base font-semibold text-offwhite">WebGL nicht verfügbar</p>
              <p className="text-sm text-offwhite/50 max-w-[280px] leading-relaxed">
                Bitte Browser aktualisieren oder Hardware-Beschleunigung aktivieren.
              </p>
            </div>
          )}

          {/* Scene label top-left */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-[0.07em] px-2.5 py-1 rounded-md backdrop-blur-md"
            style={{ background: 'rgba(8,15,25,0.8)', border: '1px solid rgba(255,255,255,0.08)', color: '#4a6080' }}
          >
            3D-Diorama · Feuerwehr Huntefeld
          </div>

          {/* Hover chip bottom-left */}
          {hovered && (
            <div
              aria-live="polite"
              className="pointer-events-none absolute bottom-3.5 left-3.5 text-xs font-medium px-3 py-1.5 rounded-lg backdrop-blur-md flex items-center gap-1.5"
              style={{ background: 'rgba(8,15,25,0.88)', border: '1px solid rgba(255,255,255,0.1)', color: '#e8edf4' }}
            >
              <span className="text-fire-500">▶</span>
              {INFO[hovered].shortName}
            </div>
          )}

          {/* Sound toggle top-right */}
          <button
            onClick={toggleSound}
            aria-label={soundEnabled ? 'Sound deaktivieren' : 'Sound aktivieren (HLF-Sirene)'}
            className="absolute top-3 right-3 w-[38px] h-[38px] flex items-center justify-center rounded-lg text-base backdrop-blur-md transition-colors hover:border-white/[0.16]"
            style={{
              background: 'rgba(8,15,25,0.8)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#c0d0e0',
              cursor: 'pointer',
            }}
          >
            {soundEnabled ? '🔊' : '🔈'}
          </button>

          {/* Fiktiv-Kennzeichnung bottom-right */}
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-3.5 right-3.5 text-[10px] font-semibold uppercase tracking-[0.06em] px-2.5 py-1 rounded-md backdrop-blur-md"
            style={{ background: 'rgba(8,15,25,0.8)', border: '1px solid rgba(255,255,255,0.08)', color: '#4a6080' }}
          >
            Fiktiv · Demo
          </div>
        </div>

        {/* Sidebar */}
        <div className="flex-none w-[280px] min-w-[260px] flex flex-col gap-3.5">

          {/* Info card (when object selected) */}
          {info ? (
            <div
              role="region"
              aria-label={`Details: ${info.title}`}
              className="rounded-2xl p-[22px]"
              style={{
                background: 'rgba(12,22,34,0.96)',
                border: '1px solid rgba(204,17,17,0.3)',
                borderLeft: '3px solid #cc1111',
                animation: 'slideInRight 0.28s ease',
              }}
            >
              <div className="flex items-start gap-2.5 mb-3.5">
                <span className="text-[26px] shrink-0 leading-none" aria-hidden>{info.icon}</span>
                <p className="text-sm font-bold leading-snug" style={{ color: '#e8edf4' }}>{info.title}</p>
              </div>
              <p className="text-[13px] leading-[1.75] mb-[18px]" style={{ color: '#6080a0' }}>
                {info.text}
              </p>
              <a
                href={info.ctaLink}
                className="block text-center py-2.5 px-4 rounded-[9px] text-[13px] font-semibold tracking-wide transition-colors hover:opacity-90"
                style={{
                  background: '#cc1111',
                  color: '#fff',
                  boxShadow: '0 4px 18px rgba(204,17,17,0.35)',
                  textDecoration: 'none',
                }}
              >
                {info.cta} →
              </a>
              <button
                onClick={() => setSelected(null)}
                className="block w-full mt-2 py-1.5 rounded-lg text-xs transition-colors hover:bg-white/[0.04]"
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: '#4a6080',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Schließen ✕
              </button>
            </div>
          ) : (
            <div
              className="rounded-2xl p-[22px]"
              style={{ background: 'rgba(12,20,32,0.7)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="text-[22px] mb-[11px]" aria-hidden>👆</div>
              <p className="text-sm font-semibold mb-2" style={{ color: '#d0dcea' }}>Element auswählen</p>
              <p className="text-xs leading-[1.75]" style={{ color: '#4a6080' }}>
                Klicke auf das{' '}
                <strong style={{ color: '#d0dcea' }}>Feuerwehrhaus</strong>,{' '}
                das <strong style={{ color: '#cc4444' }}>HLF</strong>,{' '}
                den <strong style={{ color: '#cc4444' }}>MTW</strong>{' '}
                oder den <strong style={{ color: '#d0dcea' }}>Anhänger</strong>.
              </p>
              <div
                className="mt-3.5 pt-3.5 text-[11px] leading-[1.8]"
                style={{ borderTop: '1px solid rgba(255,255,255,0.05)', color: '#3a5070' }}
              >
                🔵 HLF → Blaulicht-Animation<br />
                🏛 Feuerwehrhaus → Innenbeleuchtung<br />
                🔊 Ton-Button → Sirenen-Sound
              </div>
            </div>
          )}

          {/* Vehicle selector list */}
          <div
            className="rounded-2xl p-[18px] flex flex-col gap-2"
            style={{ background: 'rgba(12,20,32,0.7)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <div
              className="text-[10px] font-bold uppercase tracking-[0.1em] mb-1"
              style={{ color: '#3a5070' }}
            >
              Einsatzmittel &amp; Objekte
            </div>
            {VEHICLE_IDS.map(id => {
              const d = INFO[id]
              const active = selected === id
              return (
                <button
                  key={id}
                  onClick={() => doSelectUI(id)}
                  aria-label={`${d.shortName} auswählen`}
                  aria-pressed={active}
                  className="flex items-center gap-2.5 py-2 px-[11px] rounded-[9px] text-left w-full transition-colors hover:bg-white/[0.04]"
                  style={{
                    border: `1px solid ${active ? 'rgba(204,17,17,0.42)' : 'rgba(255,255,255,0.06)'}`,
                    background: active ? 'rgba(204,17,17,0.1)' : 'transparent',
                    color: '#e8edf4',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                >
                  <span className="text-[18px] shrink-0 leading-none" aria-hidden>{d.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold truncate">{d.shortName}</div>
                    <div className="text-[10px] mt-px tracking-[0.04em]" style={{ color: '#3a5070' }}>
                      {d.plate}
                    </div>
                  </div>
                  <span
                    className="text-[10px] shrink-0 font-bold"
                    style={{ color: active ? '#cc1111' : '#3a5070' }}
                    aria-hidden
                  >
                    {active ? '●' : '○'}
                  </span>
                </button>
              )
            })}
          </div>

        </div>
      </div>

      {/* Keyboard navigation bar */}
      <div
        className="mt-4 px-[18px] py-3.5 rounded-xl flex items-center gap-3 flex-wrap"
        style={{ background: 'rgba(12,20,32,0.5)', border: '1px solid rgba(255,255,255,0.05)' }}
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.1em] shrink-0" style={{ color: '#3a5070' }}>
          Navigation
        </span>
        <div className="flex gap-2 flex-wrap" role="group" aria-label="Objekte direkt auswählen">
          {VEHICLE_IDS.map(id => (
            <button
              key={id}
              onClick={() => doSelectUI(id)}
              aria-label={`${INFO[id].shortName} auswählen`}
              className="text-xs font-medium py-1 px-3 rounded-[7px] transition-colors hover:bg-white/[0.08] hover:text-[#c0d0e0]"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: '#8090a8',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              {INFO[id].icon} {INFO[id].shortName}
            </button>
          ))}
        </div>
      </div>

      {/* Accessibility text alternative */}
      <details
        className="mt-4 rounded-xl"
        style={{ background: 'rgba(10,16,26,0.5)', border: '1px solid rgba(255,255,255,0.05)' }}
      >
        <summary
          className="text-xs font-medium py-3.5 px-[18px] flex items-center gap-2 cursor-pointer select-none list-none"
          style={{ color: '#3a5070' }}
        >
          <span className="text-sm" aria-hidden>♿</span>
          Textliche Beschreibung des 3D-Modells (Barrierefreiheit)
        </summary>
        <div
          className="px-[18px] pb-[18px] pt-3.5 text-xs leading-[1.9]"
          style={{ borderTop: '1px solid rgba(255,255,255,0.04)', color: '#4a6080' }}
        >
          <p className="mb-2">
            <strong style={{ color: '#c0d0e0' }}>Feuerwehrhaus Huntefeld:</strong>{' '}
            Zweigeschossiges Gebäude mit hellgrauen Wänden, dunklem Satteldach, zwei Garagentoren und rotem Signalband. Zentrum des Dioramas.
          </p>
          <p className="mb-2">
            <strong style={{ color: '#cc4444' }}>HLF 20 (HUN-FW 2):</strong>{' '}
            Großes rotes Hilfeleistungslöschgruppenfahrzeug mit Blaulichtbalken. Steht prominent vor dem Haupttor.
          </p>
          <p className="mb-2">
            <strong style={{ color: '#cc4444' }}>MTW (HUN-FW 1):</strong>{' '}
            Rotes Mannschaftstransportfahrzeug, links im Diorama positioniert.
          </p>
          <p className="mb-2">
            <strong style={{ color: '#c0d0e0' }}>Anhänger (HUN-FW A1):</strong>{' '}
            Roter Feuerwehranhänger mit Deichsel und Chevrons, rechts der Szene.
          </p>
          <p className="text-[11px] mt-2.5" style={{ color: '#2a3a50' }}>
            Alle Kennzeichen, Namen und Daten sind fiktiv. Kein Bezug zu realen Personen, Einsätzen oder Organisationen.
          </p>
        </div>
      </details>

    </div>
  )
}
