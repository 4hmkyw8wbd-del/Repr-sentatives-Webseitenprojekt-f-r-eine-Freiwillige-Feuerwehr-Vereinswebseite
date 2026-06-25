/**
 * Dauerhaft sichtbarer Hinweis, dass es sich um ein rein fiktives
 * Demonstrations-/Portfolio-Projekt handelt – keine reale Feuerwehr.
 */
export function FictionBanner() {
  return (
    <div className="bg-anthracite-900 text-center text-xs sm:text-sm text-offwhite/70 border-b border-white/5">
      <div className="container-page py-2">
        <span className="inline-flex items-center gap-2">
          <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-gold-400" />
          Fiktives Demonstrationsprojekt – Inhalte frei erfunden, keine reale
          Organisation.
        </span>
      </div>
    </div>
  )
}

export function FictionBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-gold-400/40 bg-gold-400/10 px-3 py-1 text-xs font-medium text-gold-400">
      <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-gold-400" />
      Fiktives Demoprojekt
    </span>
  )
}
