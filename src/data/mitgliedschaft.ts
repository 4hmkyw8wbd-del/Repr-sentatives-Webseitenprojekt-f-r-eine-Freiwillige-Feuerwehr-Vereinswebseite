import type { IconName } from '../components/ui/Icon'

export type Empfehlung = 'einsatz' | 'jugend' | 'kinder' | 'foerder'

export type Mitgliedsart = {
  id: Empfehlung
  titel: string
  icon: IconName
  text: string
  cta: string
}

export const mitgliedsarten: Mitgliedsart[] = [
  {
    id: 'einsatz',
    titel: 'Aktive Einsatzabteilung',
    icon: 'helm',
    text: 'Du übernimmst Verantwortung im Einsatz – nach einer fundierten Ausbildung und immer im Team.',
    cta: 'Zum Übungsdienst vorbeikommen',
  },
  {
    id: 'jugend',
    titel: 'Jugendfeuerwehr',
    icon: 'kompass',
    text: 'Für Jugendliche: Technik, Teamgeist, Wettbewerbe und echte Gemeinschaft.',
    cta: 'Probetraining anfragen',
  },
  {
    id: 'kinder',
    titel: 'Kinderfeuerwehr',
    icon: 'tropfen',
    text: 'Für Kinder: spielerisch lernen, sicher betreut und mit viel Gemeinschaft.',
    cta: 'Kinderfeuerwehr anfragen',
  },
  {
    id: 'foerder',
    titel: 'Fördermitgliedschaft',
    icon: 'herz',
    text: 'Unterstütze die Feuerwehr finanziell und ideell – ganz ohne Einsatzdienst.',
    cta: 'Fördermitglied werden',
  },
]

/** Aussagen für den Mitgliedschafts-Finder (§13) */
export type FinderOption = {
  id: string
  text: string
  icon: IconName
  empfehlung: Empfehlung
}

export const finderOptionen: FinderOption[] = [
  { id: 'technik', text: 'Ich bin technisch interessiert.', icon: 'werkzeug', empfehlung: 'einsatz' },
  { id: 'helfen', text: 'Ich möchte anderen helfen.', icon: 'herz', empfehlung: 'einsatz' },
  { id: 'ehrenamt', text: 'Ich suche ein sinnvolles Ehrenamt.', icon: 'team', empfehlung: 'einsatz' },
  { id: 'jung', text: 'Ich bin jugendlich und neugierig.', icon: 'kompass', empfehlung: 'jugend' },
  { id: 'kind', text: 'Mein Kind interessiert sich für Feuerwehr.', icon: 'tropfen', empfehlung: 'kinder' },
  { id: 'foerdern', text: 'Ich möchte die Feuerwehr finanziell unterstützen.', icon: 'herz', empfehlung: 'foerder' },
]

/** §13 – Vielfältige Stärken, die gebraucht werden */
export const staerken: { icon: IconName; text: string }[] = [
  { icon: 'werkzeug', text: 'Handwerkliches Geschick' },
  { icon: 'team', text: 'Teamgeist' },
  { icon: 'kompass', text: 'Organisationstalent' },
  { icon: 'fuehrerschein', text: 'Führerschein' },
  { icon: 'herz', text: 'Soziale Motivation' },
  { icon: 'strahlrohr', text: 'Technisches Interesse' },
]
