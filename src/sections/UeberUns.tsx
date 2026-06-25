import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { Icon } from '../components/ui/Icon'
import { site } from '../data/site'

const geraetehausInfo: { icon: Parameters<typeof Icon>[0]['name']; label: string; value: string }[] = [
  { icon: 'haus', label: 'Standort', value: `${site.address.street}, ${site.address.city}` },
  { icon: 'fahrzeug', label: 'Fahrzeuge', value: 'HLF 20, MTW, Anhänger' },
  { icon: 'team', label: 'Mannschaft', value: 'Aktive aus vielen Berufen' },
  { icon: 'funkmelder', label: 'Übungsabend', value: site.uebungsabend },
  { icon: 'kompass', label: 'Jugendfeuerwehr', value: 'Ab 10 Jahren' },
  { icon: 'tropfen', label: 'Kinderfeuerwehr', value: 'Spielerischer Einstieg' },
]

export function UeberUns() {
  return (
    <section id="ueber-uns" className="section">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHeading
            eyebrow="Über uns"
            title="Eine Gemeinschaft, die für ihre Region da ist"
            intro="Unsere Feuerwehr besteht aus Menschen, die im Alltag ganz unterschiedlichen Berufen nachgehen – und im Ernstfall gemeinsam Verantwortung übernehmen."
          />
          <Reveal className="mt-6 space-y-4 text-offwhite/75">
            <p>
              Ob Brand, Verkehrsunfall, Unwetter oder technische Hilfeleistung: Wir
              trainieren regelmäßig, arbeiten im Team und stehen für unsere Region
              bereit. Die Freiwillige Feuerwehr Huntefeld ist ehrenamtlich
              organisiert und fest im Ort verwurzelt.
            </p>
            <p>
              Moderne Technik und traditionelle Kameradschaft gehören für uns
              zusammen. Bei uns zählt nicht der Applaus, sondern die Verlässlichkeit
              im entscheidenden Moment.
            </p>
          </Reveal>
        </div>

        <Reveal>
          {/* Interaktive Gerätehaus-Karte */}
          <div className="card group relative overflow-hidden">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-fire-500/15 text-fire-400">
                <Icon name="haus" className="h-7 w-7" />
              </span>
              <div>
                <h3 className="text-lg font-semibold text-white">Unser Gerätehaus</h3>
                <p className="text-sm text-offwhite/60">Regionaler Ankerpunkt</p>
              </div>
            </div>
            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              {geraetehausInfo.map((info) => (
                <div
                  key={info.label}
                  className="flex items-start gap-3 rounded-lg border border-white/5 bg-navy-800/40 p-3 transition-colors hover:border-signal-400/40"
                >
                  <Icon name={info.icon} className="mt-0.5 h-5 w-5 shrink-0 text-signal-400" />
                  <div>
                    <dt className="text-xs uppercase tracking-wide text-offwhite/50">
                      {info.label}
                    </dt>
                    <dd className="text-sm text-offwhite/90">{info.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
