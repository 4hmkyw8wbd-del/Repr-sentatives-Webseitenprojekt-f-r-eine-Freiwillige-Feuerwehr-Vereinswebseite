import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'
import { HeroVisual } from '../components/three/HeroVisual'
import { FictionBadge } from '../components/layout/FictionBadge'

export function Hero() {
  return (
    <section
      id="start"
      className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28"
    >
      {/* Dezenter Blaulicht-Schimmer im Hintergrund */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-signal-400/10 blur-3xl animate-pulse-soft motion-reduce:animate-none" />
        <div className="absolute right-0 top-1/4 h-72 w-72 rounded-full bg-fire-600/10 blur-3xl" />
      </div>

      <div className="container-page grid items-center gap-12 lg:grid-cols-2">
        <div>
          <FictionBadge />
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] text-white">
            Freiwillige Feuerwehr Huntefeld –{' '}
            <span className="text-fire-500">bereit, wenn es darauf ankommt.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-offwhite/75">
            Wir sind da, wenn Menschen Hilfe brauchen – bei Bränden, Unfällen,
            Unwettern und technischen Hilfeleistungen. Gleichzeitig sind wir eine
            starke Gemeinschaft, die neue Mitglieder, Jugendliche und Kinder
            willkommen heißt.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button href="#mitmachen" size="lg">
              <Icon name="helm" className="h-5 w-5" /> Mitglied werden
            </Button>
            <Button href="#jugendfeuerwehr" size="lg" variant="secondary">
              <Icon name="kompass" className="h-5 w-5" /> Jugendfeuerwehr kennenlernen
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a href="#einsaetze" className="text-signal-300 hover:text-signal-400 underline-offset-4 hover:underline">
              Aktuelle Einsätze ansehen →
            </a>
            <a href="#kontakt" className="text-signal-300 hover:text-signal-400 underline-offset-4 hover:underline">
              Kontakt aufnehmen →
            </a>
          </div>
        </div>

        <div className="order-first lg:order-last">
          <HeroVisual />
        </div>
      </div>
    </section>
  )
}
