import { useMemo, useRef } from 'react'
import { Canvas, useFrame, type ThreeElements } from '@react-three/fiber'
import { Float, OrbitControls, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

/* ------------------------------------------------------------------ *
 * Interaktives 3D-Feuerwehrfahrzeug (stilisiert)
 * – frei drehbar (Maus/Touch), ruhige Auto-Rotation
 * – rotierendes Blaulicht, dezent pulsierend
 * Bewusst abstrahiert: ein wiedererkennbares Löschfahrzeug, kein reales
 * Modell. Teil eines fiktiven Demonstrationsprojekts.
 * ------------------------------------------------------------------ */

const RED = '#d12130'
const RED_DARK = '#9c1622'
const SILVER = '#c7d0d8'
const DARK = '#16222e'
const GLASS = '#7fb6d6'

type BoxProps = {
  args: [number, number, number]
  color: string
  metalness?: number
  roughness?: number
} & Omit<ThreeElements['mesh'], 'args'>

function Box({ args, color, metalness = 0.4, roughness = 0.45, ...rest }: BoxProps) {
  return (
    <mesh castShadow receiveShadow {...rest}>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
    </mesh>
  )
}

function Wheel({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[Math.PI / 2, 0, 0]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.34, 0.34, 0.22, 24]} />
        <meshStandardMaterial color="#11161b" metalness={0.3} roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.04, 16]} />
        <meshStandardMaterial color={SILVER} metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  )
}

/** Rotierendes Blaulicht mit pulsierender Leuchtkraft. */
function Blaulicht({ position }: { position: [number, number, number] }) {
  const light = useRef<THREE.Group>(null)
  const mat = useRef<THREE.MeshStandardMaterial>(null)
  useFrame((state) => {
    if (light.current) light.current.rotation.y += 0.12
    if (mat.current) {
      mat.current.emissiveIntensity = 1.2 + Math.sin(state.clock.elapsedTime * 6) * 0.7
    }
  })
  return (
    <group position={position}>
      {/* Sockel */}
      <mesh>
        <boxGeometry args={[0.5, 0.06, 0.24]} />
        <meshStandardMaterial color={DARK} metalness={0.5} roughness={0.5} />
      </mesh>
      {/* zwei Leuchten, gemeinsam rotierend */}
      <group ref={light}>
        {[-0.12, 0.12].map((x) => (
          <mesh key={x} position={[x, 0.12, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.12, 16]} />
            <meshStandardMaterial
              ref={x > 0 ? mat : undefined}
              color="#2f6df6"
              emissive="#3b82f6"
              emissiveIntensity={1.4}
              transparent
              opacity={0.92}
            />
          </mesh>
        ))}
      </group>
      <pointLight position={[0, 0.3, 0]} color="#3b82f6" intensity={0.6} distance={4} />
    </group>
  )
}

function FireTruck() {
  return (
    <group position={[0, -0.15, 0]}>
      {/* Fahrgestell */}
      <Box args={[3.4, 0.3, 1.3]} position={[0, 0.28, 0]} color={RED_DARK} />

      {/* Aufbau / Geräteraum (hinten) */}
      <Box args={[1.9, 0.95, 1.3]} position={[0.55, 0.9, 0]} color={RED} />
      {/* Rollladen-Andeutung am Geräteraum */}
      <Box args={[0.02, 0.7, 1.0]} position={[-0.4, 0.85, 0.66]} color={SILVER} metalness={0.7} roughness={0.3} />
      <Box args={[0.02, 0.7, 1.0]} position={[0.6, 0.85, 0.66]} color={SILVER} metalness={0.7} roughness={0.3} />
      <Box args={[0.02, 0.7, 1.0]} position={[1.5, 0.85, 0.66]} color={SILVER} metalness={0.7} roughness={0.3} />

      {/* Kabine (vorne) */}
      <Box args={[1.25, 0.85, 1.28]} position={[-1.25, 0.85, 0]} color={RED} />
      {/* Frontscheibe */}
      <mesh position={[-1.9, 0.95, 0]} rotation={[0, 0, 0.35]}>
        <boxGeometry args={[0.08, 0.5, 1.0]} />
        <meshStandardMaterial color={GLASS} metalness={0.2} roughness={0.1} transparent opacity={0.7} />
      </mesh>
      {/* Seitenfenster */}
      {[-0.55, 0.55].map((z) => (
        <mesh key={z} position={[-1.3, 0.95, z * 0.64]}>
          <boxGeometry args={[0.6, 0.34, 0.04]} />
          <meshStandardMaterial color={GLASS} metalness={0.2} roughness={0.1} transparent opacity={0.65} />
        </mesh>
      ))}

      {/* Stoßstange + Scheinwerfer */}
      <Box args={[0.12, 0.22, 1.3]} position={[-1.94, 0.45, 0]} color={SILVER} metalness={0.7} roughness={0.3} />
      {[-0.4, 0.4].map((z) => (
        <mesh key={z} position={[-1.98, 0.55, z]}>
          <cylinderGeometry args={[0.09, 0.09, 0.06, 16]} />
          <meshStandardMaterial color="#fff7d6" emissive="#fde68a" emissiveIntensity={0.6} />
        </mesh>
      ))}

      {/* Weißer Zierstreifen */}
      <Box args={[3.42, 0.12, 1.32]} position={[0, 0.62, 0]} color="#f4f6f8" metalness={0.2} roughness={0.5} />

      {/* Leiter auf dem Dach */}
      <group position={[0.4, 1.45, 0]} rotation={[0, 0, 0.04]}>
        <Box args={[2.2, 0.08, 0.12]} position={[0, 0, -0.18]} color={SILVER} metalness={0.7} roughness={0.3} />
        <Box args={[2.2, 0.08, 0.12]} position={[0, 0, 0.18]} color={SILVER} metalness={0.7} roughness={0.3} />
        {Array.from({ length: 8 }).map((_, i) => (
          <Box
            key={i}
            args={[0.06, 0.05, 0.36]}
            position={[-0.95 + i * 0.27, 0, 0]}
            color={SILVER}
            metalness={0.7}
            roughness={0.3}
          />
        ))}
      </group>

      {/* Blaulichtbalken auf der Kabine */}
      <Blaulicht position={[-1.25, 1.34, 0]} />

      {/* Räder */}
      <Wheel position={[-1.15, 0.28, 0.62]} />
      <Wheel position={[-1.15, 0.28, -0.62]} />
      <Wheel position={[1.0, 0.28, 0.62]} />
      <Wheel position={[1.0, 0.28, -0.62]} />
    </group>
  )
}

function SceneContent() {
  const group = useRef<THREE.Group>(null)
  // sanftes Wippen für mehr Lebendigkeit
  useFrame((state) => {
    if (group.current) {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.04
    }
  })

  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} castShadow />
      <directionalLight position={[-5, 3, -4]} intensity={0.4} color="#7fb6d6" />

      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.25}>
        <group ref={group}>
          <FireTruck />
        </group>
      </Float>

      <ContactShadows
        position={[0, -0.02, 0]}
        opacity={0.5}
        scale={9}
        blur={2.4}
        far={4}
        color="#000000"
      />
    </>
  )
}

export default function HeroScene() {
  const controls = useMemo(
    () => ({
      minPolarAngle: Math.PI / 3.2,
      maxPolarAngle: Math.PI / 1.9,
    }),
    [],
  )

  return (
    <Canvas
      dpr={[1, 1.8]}
      shadows
      camera={{ position: [4.5, 2.4, 5.2], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <SceneContent />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.9}
        minPolarAngle={controls.minPolarAngle}
        maxPolarAngle={controls.maxPolarAngle}
      />
    </Canvas>
  )
}
