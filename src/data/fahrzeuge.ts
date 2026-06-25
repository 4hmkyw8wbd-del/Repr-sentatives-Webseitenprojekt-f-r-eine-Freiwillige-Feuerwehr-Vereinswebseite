import type { IconName } from '../components/ui/Icon'

export type Fahrzeug = {
  id: string
  kuerzel: string
  name: string
  icon: IconName
  kurz: string
  besatzung: string
  einsatzgebiet: string
  beladung: string[]
  besonderheiten: string
  szenarien: string[]
}

export const fahrzeuge: Fahrzeug[] = [
  {
    id: 'hlf20',
    kuerzel: 'HLF 20',
    name: 'Hilfeleistungslöschgruppenfahrzeug',
    icon: 'fahrzeug',
    kurz: 'Das Hauptfahrzeug für Brandbekämpfung und technische Hilfeleistung.',
    besatzung: 'Staffel/Gruppe (bis zu 9 Einsatzkräfte)',
    einsatzgebiet: 'Brandbekämpfung, technische Hilfeleistung, Unwetter',
    beladung: [
      'Löschwassertank und Pumpe',
      'Atemschutzgeräte',
      'Hydraulisches Rettungsgerät',
      'Schlauchmaterial und Strahlrohre',
      'Beleuchtung und Stromerzeuger',
    ],
    besonderheiten:
      'Vielseitig einsetzbar – vereint Löschtechnik und Rettungsgerät in einem Fahrzeug.',
    szenarien: ['Wohnungsbrand', 'Verkehrsunfall', 'Sturmschäden'],
  },
  {
    id: 'mtw',
    kuerzel: 'MTW',
    name: 'Mannschaftstransportwagen',
    icon: 'team',
    kurz: 'Für Personaltransport, Jugendfeuerwehr und Logistik.',
    besatzung: 'Bis zu 8 Personen',
    einsatzgebiet: 'Transport, Logistik, Jugend- und Kinderfeuerwehr',
    beladung: [
      'Sitzplätze für Einsatzkräfte',
      'Material für Ausbildung und Dienste',
      'Funk- und Kommunikationstechnik',
    ],
    besonderheiten:
      'Flexibles Logistikfahrzeug – auch für Übungen und Veranstaltungen der Nachwuchsabteilungen.',
    szenarien: ['Personaltransport', 'Übungsdienste', 'Veranstaltungen'],
  },
  {
    id: 'anhaenger',
    kuerzel: 'Anhänger',
    name: 'Anhänger Unwetter / Logistik',
    icon: 'unwetter',
    kurz: 'Für Pumpen, Sandsäcke, Beleuchtung und Materialtransport.',
    besatzung: 'Wird mit Zugfahrzeug eingesetzt',
    einsatzgebiet: 'Unwetterlagen, Logistik, Materialnachschub',
    beladung: [
      'Tauch- und Schmutzwasserpumpen',
      'Sandsäcke und Hochwassermaterial',
      'Mobile Beleuchtung',
    ],
    besonderheiten:
      'Schnell verfügbares Zusatzmaterial bei länger andauernden Unwetterlagen.',
    szenarien: ['Starkregen', 'Überflutung', 'Längere Einsatzlagen'],
  },
]
