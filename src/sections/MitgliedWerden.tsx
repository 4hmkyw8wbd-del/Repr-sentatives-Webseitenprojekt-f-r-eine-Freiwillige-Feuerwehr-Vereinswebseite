import { useMemo, useState } from 'react'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'
import {
  finderOptionen,
  mitgliedsarten,
  staerken,
  type Empfehlung,
} from '../data/mitgliedschaft'

export function MitgliedWerden() {
  const [gewaehlt, setGewaehlt] = useState<Set<string>>(new Set())

  const toggle = (id: string) =>
    setGewaehlt((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  // Empfehlung: häufigste Kategorie unter den gewählten Aussagen
  const empfehlung = useMemo<Empfehlung | null>(() => {
    if (gewaehlt.size === 0) return null
    const zaehler = new Map<Empfehlung, number>()
    finderOptionen
      .filter((o) => gewaehlt.has(o.id))
      .forEach((o) => zaehler.set(o.empfehlung, (zaehler.get(o.empfehlung) ?? 0) + 1))
    let best: Empfehlung | null = null
    let max = 0
    zaehler.forEach((n, key) => {
      if (n > max) {
        max = n
        best = key
      }
    })
    return best
  }, [gewaehlt])

  const empfohleneArt = mitgliedsarten.find((m) => m.id === empfehlung)

  return (
    <section id="mitmachen" className="section">
      <div className="container-page">
        <SectionHeading
          eyebrow="Mitglied werden"
          title="Du musst kein Held sein. Nur bereit, Verantwortung zu übernehmen."
          intro="Wir suchen Menschen mit unterschiedlichsten Stärken. Ob technisches Interesse, Organisationstalent oder einfach der Wunsch zu helfen – bei uns ist Platz für dich."
        />

        {/* Stärken */}
        <Reveal className="mt-8 flex flex-wrap gap-2">
          {staerken.map((s) => (
            <span
              key={s.text}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-offwhite/80"
            >
              <Icon name={s.icon} className="h-4 w-4 text-signal-400" />
              {s.text}
            </span>
          ))}
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Mitgliedschafts-Finder */}
          <Reveal className="card">
            <h3 className="text-lg font-semibold text-white">Mitgliedschafts-Finder</h3>
            <p className="mt-1 text-sm text-offwhite/60">
              Wähle aus, was auf dich zutrifft – wir zeigen dir den passenden Weg.
            </p>
            <ul className="mt-5 space-y-2">
              {finderOptionen.map((o) => {
                const active = gewaehlt.has(o.id)
                return (
                  <li key={o.id}>
                    <button
                      type="button"
                      onClick={() => toggle(o.id)}
                      aria-pressed={active}
                      className={[
                        'flex w-full items-center gap-3 rounded-lg border p-3 text-left text-sm transition-colors',
                        active
                          ? 'border-fire-500/60 bg-fire-500/10 text-white'
                          : 'border-white/10 bg-navy-800/40 text-offwhite/80 hover:border-signal-400/40',
                      ].join(' ')}
                    >
                      <span
                        className={[
                          'grid h-8 w-8 shrink-0 place-items-center rounded-md',
                          active ? 'bg-fire-500 text-white' : 'bg-white/5 text-signal-400',
                        ].join(' ')}
                      >
                        <Icon name={o.icon} className="h-4 w-4" />
                      </span>
                      {o.text}
                    </button>
                  </li>
                )
              })}
            </ul>
          </Reveal>

          {/* Empfehlung */}
          <Reveal className="flex flex-col">
            <div
              className="card flex h-full flex-col justify-center"
              aria-live="polite"
            >
              {empfohleneArt ? (
                <div>
                  <span className="eyebrow">Unsere Empfehlung</span>
                  <div className="mt-4 flex items-center gap-4">
                    <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-fire-500/15 text-fire-400">
                      <Icon name={empfohleneArt.icon} className="h-9 w-9" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-white">
                        {empfohleneArt.titel}
                      </h3>
                      <p className="mt-1 text-sm text-offwhite/70">{empfohleneArt.text}</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button href="#kontakt" size="lg">
                      {empfohleneArt.cta}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center text-offwhite/55">
                  <Icon name="kompass" className="mx-auto h-12 w-12 text-signal-400/60" />
                  <p className="mt-3 text-sm">
                    Wähle links eine oder mehrere Aussagen aus, um deine passende
                    Mitgliedschaft zu finden.
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        </div>

        {/* Alle Mitgliedschaftsarten */}
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {mitgliedsarten.map((m, i) => (
            <Reveal as="li" key={m.id} delay={i * 60}>
              <div className="card h-full">
                <Icon name={m.icon} className="h-7 w-7 text-signal-400" />
                <h3 className="mt-3 font-semibold text-white">{m.titel}</h3>
                <p className="mt-1 text-sm text-offwhite/65">{m.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
