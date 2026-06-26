# Portfolio-Projekt: Freiwillige Feuerwehr Huntefeld

**Freiwillige Feuerwehr Huntefeld – moderne Vereinswebseite für Ehrenamt,
Nachwuchs und regionale Sichtbarkeit**

> Hinweis: Dies ist ein rein fiktives Demonstrations- und Portfolio-Projekt.
> Alle Inhalte, Namen, Adressen und Einsätze sind frei erfunden. Es handelt sich
> nicht um eine reale Feuerwehr.

## Beschreibung

Für dieses repräsentative Projekt wurde eine moderne Website für eine Freiwillige
Feuerwehr konzipiert. Im Mittelpunkt stehen Mitgliedergewinnung, Jugendfeuerwehr,
Kinderfeuerwehr, Einsatzdarstellung und Bürgerinformation. Die Seite verbindet
regionale Vertrauenswürdigkeit mit hochwertigem Design, klarer Nutzerführung und
interaktiven 3D-Elementen.

## Projektziele

- neue Mitglieder gewinnen
- Jugendfeuerwehr sichtbarer machen
- Kinderfeuerwehr vertrauenswürdig darstellen
- Einsätze respektvoll und datenschutzsensibel dokumentieren
- Kontaktanfragen vereinfachen
- Feuerwehr als modernen lokalen Akteur präsentieren

## Ergebniswirkung

Die Website zeigt, dass digitale Lösungen für Vereine, Feuerwehren und lokale
Institutionen professionell, seriös und wirkungsorientiert umgesetzt werden können.

## Umgesetzte Highlights

- **Interaktives 3D-Hero** (react-three-fiber): frei drehbares, stilisiertes
  Feuerwehrfahrzeug mit rotierendem Blaulicht, Leiter und Kontaktschatten –
  per Maus/Touch bedienbar, lazy geladen, mit SVG-Fallback und Respektierung
  von `prefers-reduced-motion`.
- **Gerätekunde** – „Wusstest du?"-Fakten und Ausrüstungskarten vermitteln
  spannendes Hintergrundwissen über Technik und Geräte.
- **Einsatz-Timeline mit Filter** – datenschutzsensibel, ohne Namen, Kennzeichen
  oder private Adressen.
- **Mitgliedschafts-Finder** – führt Interessierte interaktiv zur passenden
  Mitgliedschaftsform.
- **Jugendfeuerwehr-Erlebnisleiste** und kindgerechter **Kinderfeuerwehr-Bereich**.
- **Fahrzeug-Detailansichten**, aufklappbare **Sicherheitstipps**, interaktives
  **Jahresrad** der Veranstaltungen.
- **Mobile-First**: sticky Navigation, persistente CTA-Leiste, große Touch-Flächen.
- **Accessibility**: semantisches HTML, Fokuszustände, Tastaturbedienung,
  ARIA-Verknüpfungen im Kontaktformular.
- **Simuliertes Kontaktformular** mit Validierung und Honeypot-Spamschutz.

## Tech-Stack

- Vite + React + TypeScript
- Tailwind CSS (Custom-Theme: Navy / Feuerwehr-Rot / Blaulicht-Akzente)
- react-three-fiber + drei (Three.js) für 3D, code-split und lazy
- React Router (Onepage + Impressum/Datenschutz-Platzhalter)

## Lokal starten

```bash
npm install
npm run dev      # Entwicklungsserver
npm run build    # Produktions-Build
npm run preview  # Build lokal ansehen
```
