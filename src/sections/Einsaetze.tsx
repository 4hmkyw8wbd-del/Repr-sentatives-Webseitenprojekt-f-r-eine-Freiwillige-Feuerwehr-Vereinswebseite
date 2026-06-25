import { useMemo, useState } from 'react'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { Icon } from '../components/ui/Icon'
import { einsaetze, einsatzArtMeta, type EinsatzArt } from '../data/einsaetze'

type Filter = EinsatzArt | 'alle'

const filterReihenfolge: { id: Filter; label: string }[] = [
  { id: 'alle', label: 'Alle Einsätze' },
  { id: 'brand', label: 'Brand' },
  { id: 'thl', label: 'Technische Hilfeleistung' },
  { id: 'unwetter', label: 'Unwetter' },
  { id: 'sonstiges', label: 'Sonstiges' },
]

export function Einsaetze() {
  const [filter, setFilter] = useState<Filter>('alle')

  const gefiltert = useMemo(
    () => (filter === 'alle' ? einsaetze : einsaetze.filter((e) => e.art === filter)),
    [filter],
  )

  return (
    <section id="einsaetze" className="section">
      <div className="container-page">
        <SectionHeading
          eyebrow="Aktuelle Einsätze"
          title="Transparent und respektvoll dokumentiert"
          intro="Wir berichten sachlich über unsere Einsätze – ohne Namen, ohne private Adressen und ohne Sensationssprache. Im Mittelpunkt steht die geleistete Hilfe."
        />

        {/* Filter */}
        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Einsätze filtern">
          {filterReihenfolge.map((f) => {
            const active = filter === f.id
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={active}
                className={[
                  'min-h-[40px] rounded-full px-4 py-1.5 text-sm font-medium transition-colors',
                  active
                    ? 'bg-fire-500 text-white'
                    : 'border border-white/15 bg-white/5 text-offwhite/75 hover:border-signal-400/50 hover:text-white',
                ].join(' ')}
              >
                {f.label}
              </button>
            )
          })}
        </div>

        {/* Timeline */}
        <ol className="relative mt-10 space-y-6 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-white/10">
          {gefiltert.map((e, i) => {
            const meta = einsatzArtMeta[e.art]
            return (
              <Reveal as="li" key={e.id} delay={i * 80} className="relative pl-14">
                <span
                  className={`absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-full bg-anthracite-800 ring-1 ring-white/10 ${meta.color}`}
                >
                  <Icon name={meta.icon} className="h-5 w-5" />
                </span>
                <details className="card group [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-3 gap-y-1">
                    <span className={`text-xs font-medium uppercase tracking-wide ${meta.color}`}>
                      {meta.label}
                    </span>
                    <span className="text-xs text-offwhite/50">{e.datumLabel}</span>
                    <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-offwhite/60">
                      abgeschlossen
                    </span>
                    <h3 className="w-full text-base font-semibold text-white">{e.titel}</h3>
                  </summary>
                  <div className="mt-3 space-y-2 text-sm text-offwhite/70">
                    <p>{e.beschreibung}</p>
                    <p>
                      <span className="text-offwhite/50">Ort:</span> {e.ort}
                    </p>
                    <p className="flex flex-wrap items-center gap-2">
                      <span className="text-offwhite/50">Eingesetzt:</span>
                      {e.fahrzeuge.map((f) => (
                        <span key={f} className="rounded bg-navy-700/60 px-2 py-0.5 text-xs">
                          {f}
                        </span>
                      ))}
                    </p>
                  </div>
                </details>
              </Reveal>
            )
          })}
        </ol>

        {gefiltert.length === 0 && (
          <p className="mt-8 text-sm text-offwhite/60">
            Für diese Kategorie liegen aktuell keine Einsätze vor.
          </p>
        )}
      </div>
    </section>
  )
}
