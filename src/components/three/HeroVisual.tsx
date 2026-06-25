import { lazy, Suspense, useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { Icon } from '../ui/Icon'

// Three.js-Szene wird nur bei Bedarf nachgeladen (Code-Splitting).
const HeroScene = lazy(() => import('./HeroScene'))

/** Statischer SVG-Fallback: keine Bewegung, kein WebGL nötig. */
function HeroFallback() {
  const orbit: { name: Parameters<typeof Icon>[0]['name']; cls: string }[] = [
    { name: 'funkmelder', cls: 'top-2 left-1/2 -translate-x-1/2' },
    { name: 'hydrant', cls: 'top-1/3 -right-2' },
    { name: 'strahlrohr', cls: 'bottom-4 right-6' },
    { name: 'fahrzeug', cls: 'bottom-4 left-6' },
    { name: 'blaulicht', cls: 'top-1/3 -left-2' },
  ]
  return (
    <div className="relative mx-auto grid aspect-square w-full max-w-md place-items-center">
      <div className="absolute inset-6 rounded-full border border-signal-400/20" />
      <div className="absolute inset-12 rounded-full border border-signal-400/10" />
      <div className="grid h-32 w-32 place-items-center rounded-2xl bg-navy-700/80 shadow-xl ring-1 ring-white/10">
        <Icon name="schild" className="h-16 w-16 text-fire-500" />
      </div>
      {orbit.map((o) => (
        <span
          key={o.name}
          className={`absolute grid h-10 w-10 place-items-center rounded-lg bg-anthracite-700 text-signal-300 ring-1 ring-white/10 ${o.cls}`}
        >
          <Icon name={o.name} className="h-5 w-5" />
        </span>
      ))}
    </div>
  )
}

export function HeroVisual() {
  const reducedMotion = usePrefersReducedMotion()
  const [enable3D, setEnable3D] = useState(false)

  useEffect(() => {
    if (reducedMotion) return
    // Nur aktivieren, wenn WebGL verfügbar ist.
    try {
      const canvas = document.createElement('canvas')
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (gl) setEnable3D(true)
    } catch {
      setEnable3D(false)
    }
  }, [reducedMotion])

  return (
    <div className="relative aspect-square w-full max-w-md mx-auto">
      {enable3D ? (
        <Suspense fallback={<HeroFallback />}>
          <HeroScene />
        </Suspense>
      ) : (
        <HeroFallback />
      )}
    </div>
  )
}
