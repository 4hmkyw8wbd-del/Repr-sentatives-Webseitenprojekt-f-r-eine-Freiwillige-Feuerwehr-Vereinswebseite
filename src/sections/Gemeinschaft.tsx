import { useState } from 'react'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { Icon } from '../components/ui/Icon'
import { veranstaltungen } from '../data/content'

export function Gemeinschaft() {
  const [aktiv, setAktiv] = useState(0)
  const v = veranstaltungen[aktiv]

  return (
    <section id="gemeinschaft" className="section bg-navy-950/40">
      <div className="container-page">
        <SectionHeading
          eyebrow="Gemeinschaft & Veranstaltungen"
          title="Mehr als Einsätze – ein lebendiger Teil des Ortes"
          intro="Vom Osterfeuer bis zum Zeltlager: Unsere Feuerwehr bringt Menschen zusammen und gestaltet das Leben in der Gemeinde aktiv mit."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
          {/* Jahresrad als interaktive Liste */}
          <Reveal>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {veranstaltungen.map((item, i) => {
                const active = i === aktiv
                return (
                  <li key={item.titel}>
                    <button
                      type="button"
                      onMouseEnter={() => setAktiv(i)}
                      onFocus={() => setAktiv(i)}
                      onClick={() => setAktiv(i)}
                      aria-pressed={active}
                      className={[
                        'flex w-full flex-col items-center gap-1 rounded-xl border p-4 text-center transition-all',
                        active
                          ? 'border-fire-500/60 bg-fire-500/10 -translate-y-1'
                          : 'border-white/10 bg-white/5 hover:border-signal-400/40',
                      ].join(' ')}
                    >
                      <Icon
                        name={item.icon}
                        className={active ? 'h-7 w-7 text-fire-400' : 'h-7 w-7 text-signal-400'}
                      />
                      <span className="text-xs font-medium uppercase tracking-wide text-offwhite/50">
                        {item.monat}
                      </span>
                      <span className="text-sm font-semibold text-white">{item.titel}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </Reveal>

          {/* Detail */}
          <Reveal key={aktiv} className="card text-center lg:text-left" aria-live="polite">
            <span className="grid h-16 w-16 place-items-center rounded-2xl bg-fire-500/15 text-fire-400 mx-auto lg:mx-0">
              <Icon name={v.icon} className="h-9 w-9" />
            </span>
            <h3 className="mt-4 text-2xl font-semibold text-white">{v.titel}</h3>
            <p className="mt-1 text-sm uppercase tracking-wide text-signal-300">{v.monat}</p>
            <p className="mt-3 text-offwhite/75">{v.text}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
