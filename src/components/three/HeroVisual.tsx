import { lazy, Suspense } from 'react'
import { Icon } from '../ui/Icon'

const Feuerwehr3DDiorama = lazy(() => import('./Feuerwehr3DDiorama'))

function DiagramFallback() {
  const orbit: { name: Parameters<typeof Icon>[0]['name']; cls: string }[] = [
    { name: 'funkmelder', cls: 'top-2 left-1/2 -translate-x-1/2' },
    { name: 'hydrant', cls: 'top-1/3 -right-2' },
    { name: 'strahlrohr', cls: 'bottom-4 right-6' },
    { name: 'fahrzeug', cls: 'bottom-4 left-6' },
    { name: 'blaulicht', cls: 'top-1/3 -left-2' },
  ]
  return (
    <div className="relative mx-auto grid aspect-square w-full max-w-xl place-items-center">
      <div className="absolute inset-6 rounded-full border border-signal-400/20 animate-pulse-soft motion-reduce:animate-none" />
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
      <p className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-offwhite/40">
        3D-Diorama wird geladen …
      </p>
    </div>
  )
}

export function HeroVisual() {
  return (
    <Suspense fallback={<DiagramFallback />}>
      <Feuerwehr3DDiorama />
    </Suspense>
  )
}
