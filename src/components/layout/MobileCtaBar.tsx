import { Icon } from '../ui/Icon'

/**
 * Sticky CTA-Leiste am unteren Rand – nur auf kleinen Viewports.
 * Haelt die wichtigsten Handlungen (Mitmachen, Kontakt) stets erreichbar.
 */
export function MobileCtaBar() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-navy-950/95 backdrop-blur pb-[env(safe-area-inset-bottom)]">
      <div className="grid grid-cols-2 gap-2 p-2">
        <a
          href="#mitmachen"
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-fire-500 text-sm font-medium text-white"
        >
          <Icon name="helm" className="h-4 w-4" /> Mitglied werden
        </a>
        <a
          href="#kontakt"
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/5 text-sm font-medium text-offwhite"
        >
          <Icon name="herz" className="h-4 w-4" /> Kontakt
        </a>
      </div>
    </div>
  )
}
