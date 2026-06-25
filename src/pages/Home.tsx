import { Hero } from '../sections/Hero'
import { UeberUns } from '../sections/UeberUns'
import { Einsatzabteilung } from '../sections/Einsatzabteilung'
import { Einsaetze } from '../sections/Einsaetze'
import { FahrzeugeTechnik } from '../sections/FahrzeugeTechnik'
import { Jugendfeuerwehr } from '../sections/Jugendfeuerwehr'
import { Kinderfeuerwehr } from '../sections/Kinderfeuerwehr'
import { MitgliedWerden } from '../sections/MitgliedWerden'
import { Ausbildung } from '../sections/Ausbildung'
import { Gemeinschaft } from '../sections/Gemeinschaft'
import { Sicherheitstipps } from '../sections/Sicherheitstipps'
import { Kontakt } from '../sections/Kontakt'

export function Home() {
  return (
    <main>
      <Hero />
      <UeberUns />
      <Einsatzabteilung />
      <Einsaetze />
      <FahrzeugeTechnik />
      <Jugendfeuerwehr />
      <Kinderfeuerwehr />
      <MitgliedWerden />
      <Ausbildung />
      <Gemeinschaft />
      <Sicherheitstipps />
      <Kontakt />
    </main>
  )
}
