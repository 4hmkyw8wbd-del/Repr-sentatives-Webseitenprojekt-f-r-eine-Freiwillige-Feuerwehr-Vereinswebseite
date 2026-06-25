import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'
import { jugendStationen } from '../data/content'

export function Jugendfeuerwehr() {
  return (
    <section id="jugendfeuerwehr" className="section">
      <div className="container-page">
        <SectionHeading
          eyebrow="Jugendfeuerwehr"
          title="Technik, Teamgeist und echte Gemeinschaft"
          intro="In der Jugendfeuerwehr lernst du nicht nur, wie Feuerwehr funktioniert. Du erlebst Teamgeist, Wettbewerbe, Zeltlager, Technik und echte Verantwortung – Schritt für Schritt und immer gemeinsam mit anderen."
        />

        {/* Erlebnisleiste */}
        <ol className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-7">
          {/* Verbindungslinie (nur ab lg) */}
          <span
            aria-hidden
            className="hidden lg:block absolute left-0 right-0 top-7 h-px bg-gradient-to-r from-signal-400/10 via-signal-400/50 to-fire-500/50"
          />
          {jugendStationen.map((s, i) => (
            <Reveal as="li" key={s.titel} delay={i * 80} className="relative">
              <div className="flex flex-col items-center text-center lg:items-center">
                <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full bg-anthracite-800 text-signal-300 ring-1 ring-white/10">
                  <Icon name={s.icon} className="h-7 w-7" />
                  <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-fire-500 text-[10px] font-bold text-white">
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-3 text-sm font-semibold text-white">{s.titel}</h3>
                <p className="mt-1 text-xs text-offwhite/60">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-12 flex flex-col sm:flex-row flex-wrap gap-3">
          <Button href="#kontakt" size="lg">
            <Icon name="helm" className="h-5 w-5" /> Probetraining anfragen
          </Button>
          <Button href="#kontakt" variant="secondary" size="lg">
            Dienstzeiten ansehen
          </Button>
          <Button href="#kontakt" variant="ghost" size="lg">
            Kontakt zur Jugendfeuerwehr →
          </Button>
        </Reveal>
      </div>
    </section>
  )
}
