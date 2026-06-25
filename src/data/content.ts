import type { IconName } from '../components/ui/Icon'

export type IconItem = {
  icon: IconName
  titel: string
  text: string
}

/** §8 Einsatzabteilung – Aufgabenbereiche */
export const einsatzbereiche: IconItem[] = [
  { icon: 'flamme', titel: 'Brandbekämpfung', text: 'Schutz von Menschen, Tieren und Sachwerten im Brandfall.' },
  { icon: 'rettungsgeraet', titel: 'Technische Hilfeleistung', text: 'Befreien, Sichern und Helfen mit hydraulischem Gerät.' },
  { icon: 'unwetter', titel: 'Unwettereinsätze', text: 'Hilfe bei Starkregen, Sturm und vollgelaufenen Kellern.' },
  { icon: 'fahrzeug', titel: 'Verkehrsunfälle', text: 'Absicherung, Brandschutz und Unterstützung am Unfallort.' },
  { icon: 'tuer', titel: 'Türöffnungen', text: 'Schonende Zugänge in Notlagen, etwa für den Rettungsdienst.' },
  { icon: 'trage', titel: 'Tragehilfen', text: 'Unterstützung des Rettungsdienstes bei schwierigen Transporten.' },
  { icon: 'wache', titel: 'Brandsicherheitswachen', text: 'Vorbeugender Brandschutz bei Veranstaltungen.' },
  { icon: 'team', titel: 'Überörtliche Hilfe', text: 'Unterstützung benachbarter Feuerwehren bei größeren Lagen.' },
]

/** §11 Jugendfeuerwehr – Erlebnisleiste */
export const jugendStationen: IconItem[] = [
  { icon: 'helm', titel: 'Ankommen', text: 'Reinschnuppern, kennenlernen, wohlfühlen.' },
  { icon: 'team', titel: 'Team kennenlernen', text: 'Neue Freundschaften und ein starkes Miteinander.' },
  { icon: 'strahlrohr', titel: 'Technik ausprobieren', text: 'Geräte verstehen und sicher anwenden.' },
  { icon: 'funkmelder', titel: 'Übungsdienst erleben', text: 'Realistische Szenarien gemeinsam meistern.' },
  { icon: 'pokal', titel: 'Wettbewerb mitmachen', text: 'Können zeigen und im Team gewinnen.' },
  { icon: 'zelt', titel: 'Zeltlager erleben', text: 'Gemeinschaft, Abenteuer und unvergessliche Tage.' },
  { icon: 'kompass', titel: 'Verantwortung übernehmen', text: 'Schritt für Schritt in die aktive Wehr hineinwachsen.' },
]

/** §12 Kinderfeuerwehr – Kacheln */
export const kinderThemen: IconItem[] = [
  { icon: 'puzzle', titel: 'Spielerisches Lernen', text: 'Altersgerecht entdecken, was Feuerwehr bedeutet.' },
  { icon: 'flamme', titel: 'Brandschutzerziehung', text: 'Sicher mit dem Thema Feuer umgehen.' },
  { icon: 'team', titel: 'Teamspiele', text: 'Zusammenhalt und Hilfsbereitschaft erleben.' },
  { icon: 'werkzeug', titel: 'Bastelaktionen', text: 'Kreativität rund um die Feuerwehr.' },
  { icon: 'tropfen', titel: 'Kleine Experimente', text: 'Staunen und Begreifen mit viel Spaß.' },
  { icon: 'haus', titel: 'Besuch im Gerätehaus', text: 'Fahrzeuge und Technik aus der Nähe erleben.' },
  { icon: 'herz', titel: 'Gemeinschaft erleben', text: 'Ein sicherer erster Kontakt zur Feuerwehr.' },
]

/** §14 Ausbildung – Schritte */
export const ausbildungsSchritte: IconItem[] = [
  { icon: 'helm', titel: 'Grundausbildung', text: 'Die Basis für den sicheren Einsatzdienst.' },
  { icon: 'atemschutz', titel: 'Atemschutz', text: 'Vorgehen unter schwerem Atemschutz.' },
  { icon: 'funk', titel: 'Funk & Kommunikation', text: 'Klare Verständigung im Einsatz.' },
  { icon: 'rettungsgeraet', titel: 'Technische Hilfeleistung', text: 'Umgang mit hydraulischem Rettungsgerät.' },
  { icon: 'erstehilfe', titel: 'Erste Hilfe', text: 'Schnell und richtig helfen können.' },
  { icon: 'fahrzeug', titel: 'Maschinisten', text: 'Fahrzeuge und Pumpen sicher bedienen.' },
  { icon: 'team', titel: 'Führung', text: 'Gruppen- und Truppführung übernehmen.' },
]

/** §15 Gemeinschaft – Jahresrad */
export type Veranstaltung = { monat: string; titel: string; text: string; icon: IconName }
export const veranstaltungen: Veranstaltung[] = [
  { monat: 'Apr', titel: 'Osterfeuer', text: 'Traditioneller Treffpunkt für das ganze Dorf.', icon: 'flamme' },
  { monat: 'Jun', titel: 'Feuerwehrfest', text: 'Begegnung, Technik zum Anfassen und Gemeinschaft.', icon: 'team' },
  { monat: 'Jul', titel: 'Zeltlager', text: 'Höhepunkt des Jahres für die Jugendfeuerwehr.', icon: 'zelt' },
  { monat: 'Sep', titel: 'Wettbewerbe', text: 'Können zeigen und gemeinsam wachsen.', icon: 'pokal' },
  { monat: 'Okt', titel: 'Brandschutzerziehung', text: 'Sicherheit für Kinder und Familien.', icon: 'rauchmelder' },
  { monat: 'Nov', titel: 'Laternenumzug', text: 'Begleitung und Absicherung für die Kleinsten.', icon: 'blaulicht' },
]
