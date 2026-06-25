import type { IconName } from '../components/ui/Icon'

export type EinsatzArt = 'brand' | 'thl' | 'unwetter' | 'sonstiges'

export type Einsatz = {
  id: string
  datum: string // ISO
  datumLabel: string
  art: EinsatzArt
  titel: string
  ort: string
  fahrzeuge: string[]
  beschreibung: string
}

export const einsatzArtMeta: Record<
  EinsatzArt,
  { label: string; icon: IconName; color: string }
> = {
  brand: { label: 'Brand', icon: 'flamme', color: 'text-fire-400' },
  thl: { label: 'Technische Hilfeleistung', icon: 'rettungsgeraet', color: 'text-signal-400' },
  unwetter: { label: 'Unwetter', icon: 'unwetter', color: 'text-gold-400' },
  sonstiges: { label: 'Sonstiges', icon: 'funkmelder', color: 'text-offwhite/70' },
}

/**
 * Beispiel-Einsaetze. Bewusst datenschutzsensibel formuliert:
 * keine Namen, keine Kennzeichen, keine privaten Adressen, sachliche Sprache.
 */
export const einsaetze: Einsatz[] = [
  {
    id: 'e-2026-06-18',
    datum: '2026-06-18',
    datumLabel: '18. Juni 2026',
    art: 'sonstiges',
    titel: 'Ausgelöste Brandmeldeanlage',
    ort: 'Gewerbegebiet Huntefeld',
    fahrzeuge: ['HLF 20', 'MTW'],
    beschreibung:
      'Nach sorgfältiger Erkundung konnte kein Feuer festgestellt werden. Die Anlage wurde zurückgestellt und die Einsatzstelle an den Betreiber übergeben.',
  },
  {
    id: 'e-2026-06-02',
    datum: '2026-06-02',
    datumLabel: '02. Juni 2026',
    art: 'unwetter',
    titel: 'Unwettereinsatz nach Starkregen',
    ort: 'Ortsteil Huntefeld-Nord',
    fahrzeuge: ['HLF 20', 'Anhänger Unwetter/Logistik'],
    beschreibung:
      'Mehrere Einsatzstellen wurden nach starkem Regen abgearbeitet. Im Vordergrund standen die Beseitigung von Wasser und die Sicherung von Verkehrswegen.',
  },
  {
    id: 'e-2026-05-14',
    datum: '2026-05-14',
    datumLabel: '14. Mai 2026',
    art: 'thl',
    titel: 'Technische Hilfeleistung nach Verkehrsunfall',
    ort: 'Gemeinde Huntefeld',
    fahrzeuge: ['HLF 20'],
    beschreibung:
      'Die Feuerwehr unterstützte bei der Absicherung der Einsatzstelle und stellte den Brandschutz sicher. Im Anschluss wurde die Fahrbahn gereinigt.',
  },
]
