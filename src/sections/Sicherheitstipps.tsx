import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { Icon } from '../components/ui/Icon'
import { sicherheitstipps } from '../data/sicherheit'

export function Sicherheitstipps() {
  return (
    <section id="sicherheit" className="section">
      <div className="container-page">
        <SectionHeading
          eyebrow="Bürgerinformationen"
          title="Sicherheitstipps für den Alltag"
          intro="Allgemeine Hinweise, die im Alltag Sicherheit geben. Klicken Sie auf eine Karte, um mehr zu erfahren."
        />

        <ul className="mt-12 grid gap-4 md:grid-cols-2">
          {sicherheitstipps.map((tipp, i) => (
            <Reveal as="li" key={tipp.titel} delay={i * 50}>
              <details className="group card [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-signal-400/10 text-signal-400">
                    <Icon name={tipp.icon} className="h-7 w-7" />
                  </span>
                  <h3 className="flex-1 font-semibold text-white">{tipp.titel}</h3>
                  <Icon
                    name="kompass"
                    className="h-5 w-5 text-offwhite/40 transition-transform group-open:rotate-180 motion-reduce:transition-none"
                  />
                </summary>
                <p className="mt-3 pl-16 text-sm text-offwhite/70">{tipp.text}</p>
              </details>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
