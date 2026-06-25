import { Link } from 'react-router-dom'
import { navLinks, site } from '../../data/site'
import { Icon } from '../ui/Icon'

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-navy-950">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-fire-500 text-white">
                <Icon name="helm" className="h-5 w-5" />
              </span>
              <span className="font-semibold text-white">{site.name}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-offwhite/60">
              Ehrenamtlich organisiert, fest in der Region verwurzelt: Technik,
              Teamgeist und Verlässlichkeit für unsere Gemeinschaft.
            </p>
            <p className="mt-4 text-sm text-offwhite/50">
              {site.address.street}
              <br />
              {site.address.zip} {site.address.city}
              <br />
              {site.email}
            </p>
          </div>

          <nav aria-label="Footer-Navigation">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-offwhite/70">
              Bereiche
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-offwhite/60">
              {navLinks.slice(0, 6).map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Rechtliches">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-offwhite/70">
              Rechtliches
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-offwhite/60">
              <li>
                <Link to="/impressum" className="hover:text-white">
                  Impressum
                </Link>
              </li>
              <li>
                <Link to="/datenschutz" className="hover:text-white">
                  Datenschutz
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 rounded-xl border border-gold-400/25 bg-gold-400/5 p-4 text-sm text-offwhite/70">
          <strong className="text-gold-400">Hinweis:</strong> Dies ist ein rein
          fiktives Demonstrations- und Portfolio-Projekt zur groben Visualisierung
          der gestalterischen und technischen Möglichkeiten. Alle Inhalte, Namen,
          Adressen und Einsätze sind frei erfunden. Es handelt sich nicht um eine
          reale Feuerwehr, und das Kontaktformular versendet keine echten Nachrichten.
        </div>

        <p className="mt-8 text-xs text-offwhite/40">
          © {new Date().getFullYear()} {site.name} (fiktiv). Konzept &amp; Umsetzung
          als Beispielprojekt.
        </p>
      </div>
    </footer>
  )
}
