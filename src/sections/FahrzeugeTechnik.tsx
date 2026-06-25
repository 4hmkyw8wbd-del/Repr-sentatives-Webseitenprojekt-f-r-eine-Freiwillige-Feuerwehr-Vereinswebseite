import { useState } from 'react'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { Icon } from '../components/ui/Icon'
import { fahrzeuge } from '../data/fahrzeuge'

export function FahrzeugeTechnik() {
  const [aktiv, setAktiv] = useState(fahrzeuge[0].id)
  const fahrzeug = fahrzeuge.find((f) => f.id === aktiv)!

  return (
    <section id="technik" className="section bg-navy-950/40">
      <div className="container-page">
        <SectionHeading
          eyebrow="Fahrzeuge & Technik"
          title="Moderne Technik für vielfältige Aufgaben"
          intro="Feuerwehrarbeit ist technisch, abwechslungsreich und spannend. Wähle ein Fahrzeug, um Details zu Besatzung, Beladung und Einsatzszenarien zu sehen."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[320px_1fr]">
          {/* Auswahl */}
          <div className="flex flex-col gap-3" role="tablist" aria-label="Fahrzeuge">
            {fahrzeuge.map((f) => {
              const active = f.id === aktiv
              return (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setAktiv(f.id)}
                  className={[
                    'flex items-center gap-4 rounded-xl border p-4 text-left transition-all',
                    active
                      ? 'border-fire-500/60 bg-fire-500/10'
                      : 'border-white/10 bg-white/5 hover:border-signal-400/40 hover:-translate-y-0.5',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'grid h-12 w-12 shrink-0 place-items-center rounded-lg',
                      active ? 'bg-fire-500 text-white' : 'bg-navy-700 text-signal-400',
                    ].join(' ')}
                  >
                    <Icon name={f.icon} className="h-7 w-7" />
                  </span>
                  <span>
                    <span className="block font-semibold text-white">{f.kuerzel}</span>
                    <span className="block text-xs text-offwhite/60">{f.kurz}</span>
                  </span>
                </button>
              )
            })}
          </div>

          {/* Detail */}
          <Reveal key={fahrzeug.id} className="card">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-2xl font-semibold text-white">{fahrzeug.kuerzel}</h3>
              <p className="text-sm text-offwhite/60">{fahrzeug.name}</p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Detail label="Besatzung">{fahrzeug.besatzung}</Detail>
              <Detail label="Einsatzgebiet">{fahrzeug.einsatzgebiet}</Detail>
            </div>

            <div className="mt-6">
              <h4 className="text-xs uppercase tracking-wide text-offwhite/50">Beladung (Auszug)</h4>
              <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                {fahrzeug.beladung.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-offwhite/80">
                    <Icon name="strahlrohr" className="mt-0.5 h-4 w-4 shrink-0 text-signal-400" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 rounded-lg border border-white/5 bg-navy-800/40 p-4">
              <h4 className="text-xs uppercase tracking-wide text-offwhite/50">Besonderheiten</h4>
              <p className="mt-1 text-sm text-offwhite/80">{fahrzeug.besonderheiten}</p>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {fahrzeug.szenarien.map((s) => (
                <span key={s} className="rounded-full bg-white/5 px-3 py-1 text-xs text-offwhite/70">
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-white/5 bg-navy-800/40 p-4">
      <p className="text-xs uppercase tracking-wide text-offwhite/50">{label}</p>
      <p className="mt-1 text-sm text-offwhite/90">{children}</p>
    </div>
  )
}
