import { useMemo, useRef } from 'react'
import { Canvas, useFrame, type ThreeElements } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

/**
 * Zentrales Schutzschild (stilisiert) – ruhig rotierend, reagiert dezent
 * auf die Cursorposition (Parallax).
 */
function Shield() {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (!group.current) return
    const { x, y } = state.pointer
    // Sehr dezente Cursor-Reaktion
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.35, 0.05)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y * 0.25, 0.05)
  })

  return (
    <group ref={group}>
      {/* Schildkörper – hexagonale Fläche zeigt zur Kamera */}
      <mesh castShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.15, 1.15, 0.18, 6]} />
        <meshStandardMaterial color="#16314a" metalness={0.5} roughness={0.35} />
      </mesh>
      {/* Innenfläche */}
      <mesh position={[0, 0, 0.12]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.06, 6]} />
        <meshStandardMaterial color="#0b1b2b" metalness={0.3} roughness={0.5} />
      </mesh>
      {/* Flamme / Akzent – steht auf der Schildfläche */}
      <mesh position={[0, -0.05, 0.2]}>
        <coneGeometry args={[0.3, 0.72, 16]} />
        <meshStandardMaterial
          color="#e11d2e"
          emissive="#c8102e"
          emissiveIntensity={0.6}
          metalness={0.2}
          roughness={0.4}
        />
      </mesh>
    </group>
  )
}

type NodeProps = {
  position: [number, number, number]
  color: string
} & ThreeElements['mesh']

function SymbolNode({ position, color, ...rest }: NodeProps) {
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh position={position} {...rest}>
        <icosahedronGeometry args={[0.16, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
    </Float>
  )
}

/** Verbindungslinien vom Schild zu den Symbol-Knoten */
function ConnectionLines({ nodes }: { nodes: [number, number, number][] }) {
  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = []
    nodes.forEach((n) => {
      points.push(new THREE.Vector3(0, 0, 0))
      points.push(new THREE.Vector3(...n))
    })
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [nodes])

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color="#38bdf8" transparent opacity={0.25} />
    </lineSegments>
  )
}

function SceneContent() {
  const nodes = useMemo<[number, number, number][]>(
    () => [
      [1.9, 0.9, 0.2],
      [-1.95, 0.5, -0.3],
      [1.6, -1.1, 0.4],
      [-1.5, -1.0, 0.2],
      [0.2, 1.8, -0.4],
    ],
    [],
  )
  const colors = ['#38bdf8', '#f5c451', '#f0394a', '#7dd3fc', '#38bdf8']

  const orbit = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    if (orbit.current) orbit.current.rotation.z += delta * 0.06
  })

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} />
      <pointLight position={[-3, -2, 2]} intensity={0.5} color="#38bdf8" />

      <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.4}>
        <Shield />
      </Float>

      <group ref={orbit}>
        <ConnectionLines nodes={nodes} />
        {nodes.map((n, i) => (
          <SymbolNode key={i} position={n} color={colors[i]} />
        ))}
      </group>
    </>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <SceneContent />
    </Canvas>
  )
}
