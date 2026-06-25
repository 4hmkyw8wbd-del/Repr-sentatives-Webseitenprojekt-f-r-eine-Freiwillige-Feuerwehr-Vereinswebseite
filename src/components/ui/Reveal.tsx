import type { ReactNode } from 'react'
import { useReveal } from '../../hooks/useReveal'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type RevealProps = {
  children: ReactNode
  /** Verzoegerung in ms fuer gestaffelte Reveals (z. B. Kachelraster). */
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'section' | 'article'
}

/**
 * Dezentes Scroll-Reveal. Faellt bei prefers-reduced-motion auf statisch
 * (sofort sichtbar, keine Transition) zurueck.
 */
export function Reveal({ children, delay = 0, className = '', as = 'div' }: RevealProps) {
  const reducedMotion = usePrefersReducedMotion()
  const { ref, visible } = useReveal<HTMLElement>()

  const Tag = as as 'div'

  if (reducedMotion) {
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <Tag
      ref={ref as never}
      className={[
        'transition-all duration-700 ease-out motion-reduce:transition-none',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5',
        className,
      ].join(' ')}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </Tag>
  )
}
