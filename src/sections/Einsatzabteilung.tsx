import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { Icon } from '../components/ui/Icon'
import { einsatzbereiche } from '../data/content'

export function Einsatzabteilung() {
  return (
    <section id="einsatzabteilung" className="section bg-navy-950/40">
      <div className="container-page">
        <SectionHeading
          eyebrow="Einsatzabteilung"
          title="Was wir leisten – und warum es zählt"
          intro="Die Einsatzabteilung ist rund um die Uhr bereit. Vom Brand über die technische Hilfeleistung bis zum Unwetter: Wir helfen dort, wo es darauf ankommt."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {einsatzbereiche.map((b, i) => (
            <Reveal as="li" key={b.titel} delay={i * 60}>
              <div className="card group h-full transition-transform duration-300 hover:-translate-y-1 hover:[transform:perspective(800px)_rotateX(4deg)]">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-signal-400/10 text-signal-400 transition-colors group-hover:bg-fire-500/15 group-hover:text-fire-400">
                  <Icon name={b.icon} className="h-7 w-7" />
                </span>
                <h3 className="mt-4 font-semibold text-white">{b.titel}</h3>
                <p className="mt-2 text-sm text-offwhite/65">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
