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
  fakt: string
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
    fakt: 'Der eingebaute Löschwassertank fasst rund 2.000 Liter – damit kann sofort gelöscht werden, noch bevor eine Wasserversorgung über Hydranten aufgebaut ist.',
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
    fakt: 'Der MTW ist oft das erste Fahrzeug, das die Jugendfeuerwehr kennenlernt – hier beginnt für viele die Begeisterung für die Feuerwehr.',
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
    fakt: 'Eine leistungsfähige Tauchpumpe fördert mehrere hundert Liter Wasser pro Minute – so werden vollgelaufene Keller in kurzer Zeit wieder frei.',
  },
]

export type Geraet = {
  icon: IconName
  name: string
  text: string
}

/** „Gerätekunde" – wissenswerte Fakten über typische Ausrüstung. */
export const geraete: Geraet[] = [
  {
    icon: 'atemschutz',
    name: 'Atemschutzgerät',
    text: 'Ermöglicht das Vorgehen in verrauchten Räumen. Die Pressluftflasche reicht je nach Belastung für rund 20–30 Minuten Arbeitszeit.',
  },
  {
    icon: 'rettungsgeraet',
    name: 'Hydraulischer Rettungssatz',
    text: 'Schere und Spreizer entwickeln mehrere Tonnen Kraft – damit lassen sich nach Unfällen Fahrzeugteile schonend öffnen.',
  },
  {
    icon: 'strahlrohr',
    name: 'Strahlrohr',
    text: 'Formt den Wasserstrahl – vom kräftigen Vollstrahl bis zum feinen Sprühnebel, der besonders gut Wärme bindet.',
  },
  {
    icon: 'funk',
    name: 'Digitalfunk',
    text: 'Hält den Trupp in Verbindung mit der Einsatzleitung – abhörsicher und auch bei vielen gleichzeitigen Gesprächen zuverlässig.',
  },
  {
    icon: 'tropfen',
    name: 'Wärmebildkamera',
    text: 'Macht Hitzequellen und Personen im dichten Rauch sichtbar – ein wichtiges Hilfsmittel bei der Personensuche.',
  },
  {
    icon: 'hydrant',
    name: 'Hydrant & Schläuche',
    text: 'Über das Hydrantennetz wird die Wasserversorgung aufgebaut. Eine einzelne Schlauchlänge misst meist 20 Meter.',
  },
]
