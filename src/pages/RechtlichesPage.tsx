import { Link } from 'react-router-dom'
import { Icon } from '../components/ui/Icon'

type Props = {
  titel: string
  einleitung: string
}

/**
 * Gemeinsame Platzhalterseite für Impressum und Datenschutz.
 * Macht explizit deutlich, dass es diese Angaben nicht gibt, da es sich um
 * ein rein fiktives Demonstrationsprojekt handelt.
 */
export function RechtlichesPage({ titel, einleitung }: Props) {
  return (
    <main className="container-page min-h-[70vh] py-20">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-signal-300 hover:text-signal-400"
      >
        <Icon name="kompass" className="h-4 w-4 rotate-180" /> Zurück zur Startseite
      </Link>

      <h1 className="mt-8 text-3xl sm:text-4xl font-bold text-white">{titel}</h1>
      <p className="mt-4 max-w-2xl text-offwhite/70">{einleitung}</p>

      <div className="mt-8 max-w-2xl rounded-2xl border border-gold-400/25 bg-gold-400/5 p-6">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gold-400/15 text-gold-400">
            <Icon name="schild" className="h-6 w-6" />
          </span>
          <div className="text-sm text-offwhite/80">
            <p className="font-semibold text-gold-400">
              Es gibt hier kein {titel.toLowerCase()}.
            </p>
            <p className="mt-2">
              Diese Website ist ein rein <strong>fiktives Demonstrations- und
              Portfolio-Projekt</strong> zur groben Visualisierung gestalterischer und
              technischer Möglichkeiten. Es existiert kein realer Betreiber, keine
              reale Organisation und es werden keine personenbezogenen Daten erhoben,
              verarbeitet oder gespeichert.
            </p>
            <p className="mt-2">
              Für ein echtes Projekt würden an dieser Stelle die rechtlich
              erforderlichen Angaben ergänzt.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}

export function ImpressumPage() {
  return (
    <RechtlichesPage
      titel="Impressum"
      einleitung="Hinweis zu den Anbieterangaben dieser Beispielseite."
    />
  )
}

export function DatenschutzPage() {
  return (
    <RechtlichesPage
      titel="Datenschutz"
      einleitung="Hinweis zum Umgang mit Daten auf dieser Beispielseite."
    />
  )
}
