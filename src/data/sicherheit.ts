import type { IconName } from '../components/ui/Icon'

export type Sicherheitstipp = {
  icon: IconName
  titel: string
  text: string
}

/**
 * Allgemeine, neutrale Bürgerhinweise.
 * Bewusst OHNE Notrufnummer und ohne Notfall-Framing,
 * da dies ein fiktives Demonstrationsprojekt ist.
 */
export const sicherheitstipps: Sicherheitstipp[] = [
  {
    icon: 'rauchmelder',
    titel: 'Rauchmelder',
    text: 'Rauchmelder retten Leben. Prüfen Sie regelmäßig die Funktion und tauschen Sie die Batterien rechtzeitig. In Schlaf- und Kinderzimmern sowie Fluren sind sie besonders wichtig.',
  },
  {
    icon: 'flamme',
    titel: 'Fettbrand niemals mit Wasser löschen',
    text: 'Brennendes Fett darf niemals mit Wasser gelöscht werden – es kommt zur gefährlichen Stichflamme. Decken Sie den Topf ab und schalten Sie die Hitzequelle aus.',
  },
  {
    icon: 'co',
    titel: 'Kohlenmonoxid (CO)',
    text: 'CO ist unsichtbar und geruchlos. Halten Sie Heizungen und Kamine gewartet und sorgen Sie für ausreichende Belüftung. CO-Melder bieten zusätzlichen Schutz.',
  },
  {
    icon: 'rettungsgasse',
    titel: 'Rettungsgasse bilden',
    text: 'Bei stockendem Verkehr auf mehrspurigen Straßen frühzeitig eine Rettungsgasse bilden – zwischen der linken und den übrigen Spuren. So kommen Einsatzkräfte schneller voran.',
  },
  {
    icon: 'hydrant',
    titel: 'Hydranten freihalten',
    text: 'Hydranten müssen jederzeit zugänglich sein. Parken Sie nicht auf Hydrantenmarkierungen und melden Sie zugewachsene oder beschädigte Hydranten der Gemeinde.',
  },
  {
    icon: 'unwetter',
    titel: 'Verhalten bei Unwetter',
    text: 'Bei Sturm und Starkregen möglichst zu Hause bleiben, Fenster schließen und lose Gegenstände sichern. Meiden Sie Keller bei drohender Überflutung und folgen Sie Warnhinweisen.',
  },
  {
    icon: 'erstehilfe',
    titel: 'Erste Hilfe auffrischen',
    text: 'Grundkenntnisse in Erster Hilfe geben Sicherheit. Ein regelmäßiger Auffrischungskurs hilft, im entscheidenden Moment ruhig und richtig zu handeln.',
  },
]
