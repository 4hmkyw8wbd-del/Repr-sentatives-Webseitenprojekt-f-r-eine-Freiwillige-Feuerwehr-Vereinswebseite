/**
 * Zentrale Stammdaten der (fiktiven) Feuerwehr Huntefeld.
 * Alle Angaben sind frei erfunden und dienen nur der Demonstration.
 */
export const site = {
  name: 'Freiwillige Feuerwehr Huntefeld',
  shortName: 'FF Huntefeld',
  region: 'Ländlicher Raum zwischen Vechta, Lohne und Diepholz',
  address: {
    street: 'Am Gerätehaus 1',
    zip: '49000',
    city: 'Huntefeld',
  },
  email: 'kontakt@ff-huntefeld.example',
  uebungsabend: 'Mittwochs, 19:30 Uhr',
} as const

export type NavLink = { href: string; label: string }

export const navLinks: NavLink[] = [
  { href: '#ueber-uns', label: 'Über uns' },
  { href: '#einsatzabteilung', label: 'Einsatzabteilung' },
  { href: '#einsaetze', label: 'Einsätze' },
  { href: '#technik', label: 'Technik' },
  { href: '#jugendfeuerwehr', label: 'Jugendfeuerwehr' },
  { href: '#kinderfeuerwehr', label: 'Kinderfeuerwehr' },
  { href: '#mitmachen', label: 'Mitmachen' },
  { href: '#kontakt', label: 'Kontakt' },
]
