import { useEffect, useState } from 'react'
import { navLinks, site } from '../../data/site'
import { Icon } from '../ui/Icon'
import { Button } from '../ui/Button'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Menue schliessen, sobald ein Anker angeklickt wird
  const close = () => setOpen(false)

  return (
    <header
      className={[
        'sticky top-0 z-50 transition-colors duration-300',
        scrolled
          ? 'bg-navy-950/90 backdrop-blur border-b border-white/5'
          : 'bg-transparent',
      ].join(' ')}
    >
      <nav className="container-page flex items-center justify-between gap-4 py-3" aria-label="Hauptnavigation">
        <a href="#start" className="flex items-center gap-2.5 font-semibold text-white" onClick={close}>
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-fire-500 text-white">
            <Icon name="helm" className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-sm sm:text-base">{site.shortName}</span>
            <span className="block text-[10px] font-normal uppercase tracking-wider text-offwhite/50">
              Huntefeld
            </span>
          </span>
        </a>

        <ul className="hidden lg:flex items-center gap-6 text-sm text-offwhite/80">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-white transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button href="#mitmachen" size="md">
            Mitglied werden
          </Button>
        </div>

        <button
          type="button"
          className="lg:hidden grid h-11 w-11 place-items-center rounded-lg border border-white/10 text-offwhite"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-4 w-5">
            <span
              className={[
                'absolute left-0 block h-0.5 w-5 bg-current transition-transform',
                open ? 'top-2 rotate-45' : 'top-0',
              ].join(' ')}
            />
            <span
              className={[
                'absolute left-0 top-2 block h-0.5 w-5 bg-current transition-opacity',
                open ? 'opacity-0' : 'opacity-100',
              ].join(' ')}
            />
            <span
              className={[
                'absolute left-0 block h-0.5 w-5 bg-current transition-transform',
                open ? 'top-2 -rotate-45' : 'top-4',
              ].join(' ')}
            />
          </span>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="lg:hidden border-t border-white/5 bg-navy-950/95 backdrop-blur">
          <ul className="container-page flex flex-col py-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={close}
                  className="block py-3 text-base text-offwhite/85 hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <Button href="#mitmachen" size="lg" className="w-full" onClick={close}>
                Mitglied werden
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
