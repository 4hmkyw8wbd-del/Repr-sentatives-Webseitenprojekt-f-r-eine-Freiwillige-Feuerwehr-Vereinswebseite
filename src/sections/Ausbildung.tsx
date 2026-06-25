import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { Icon } from '../components/ui/Icon'
import { ausbildungsSchritte } from '../data/content'

export function Ausbildung() {
  return (
    <section id="ausbildung" className="section">
      <div className="container-page">
        <SectionHeading
          eyebrow="Ausbildung & Übungsdienste"
          title="Schritt für Schritt in die Feuerwehr hineinwachsen"
          intro="Niemand wird ins kalte Wasser geworfen. Eine fundierte Ausbildung und regelmäßige Übungsdienste bereiten dich gründlich auf den Einsatzdienst vor."
        />

        <ol className="mt-12 grid gap-4 md:grid-cols-2">
          {ausbildungsSchritte.map((s, i) => (
            <Reveal as="li" key={s.titel} delay={i * 60}>
              <div className="flex items-start gap-4 rounded-xl border border-white/5 bg-anthracite-800/60 p-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-fire-500/15 text-fire-400 font-semibold">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <Icon name={s.icon} className="h-5 w-5 text-signal-400" />
                    <h3 className="font-semibold text-white">{s.titel}</h3>
                  </div>
                  <p className="mt-1 text-sm text-offwhite/65">{s.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-8 text-sm text-offwhite/60">
          <p>
            Hinzu kommen regelmäßige Sicherheitsunterweisungen sowie gemeinsame
            Übungen mit Nachbarwehren – für eingespielte Abläufe im Ernstfall.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
