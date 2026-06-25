import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'
import { kinderThemen } from '../data/content'

export function Kinderfeuerwehr() {
  return (
    <section id="kinderfeuerwehr" className="section bg-navy-950/40">
      <div className="container-page">
        <SectionHeading
          eyebrow="Kinderfeuerwehr"
          title="Spielerisch lernen, gemeinsam wachsen"
          intro="In der Kinderfeuerwehr entdecken Kinder spielerisch, was Helfen, Teamarbeit und Verantwortung bedeuten. Mit altersgerechten Aktivitäten, kleinen Experimenten und viel Gemeinschaft entsteht ein sicherer erster Kontakt zur Feuerwehr."
        />

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kinderThemen.map((t, i) => (
            <Reveal as="li" key={t.titel} delay={i * 60}>
              <div className="group h-full rounded-2xl border border-white/5 bg-anthracite-800/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-signal-300/40">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-signal-300/10 text-signal-300 transition-transform duration-300 group-hover:scale-110 motion-reduce:group-hover:scale-100">
                  <Icon name={t.icon} className="h-7 w-7" />
                </span>
                <h3 className="mt-4 font-semibold text-white">{t.titel}</h3>
                <p className="mt-2 text-sm text-offwhite/65">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10 rounded-2xl border border-signal-300/20 bg-signal-300/5 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm text-offwhite/75">
              <strong className="text-white">Für Eltern:</strong> Sicherheit, Betreuung
              und eine pädagogische Haltung stehen im Mittelpunkt. Es geht nicht um
              gefährliche Einsätze, sondern um Gemeinschaft und spielerisches Lernen.
            </p>
            <Button href="#kontakt" size="lg">
              <Icon name="tropfen" className="h-5 w-5" /> Kinderfeuerwehr anfragen
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
