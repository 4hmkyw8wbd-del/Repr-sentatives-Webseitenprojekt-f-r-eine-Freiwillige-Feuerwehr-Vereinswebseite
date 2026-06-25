import { useEffect, useRef, useState } from 'react'

/**
 * IntersectionObserver-basiertes Scroll-Reveal.
 * Liefert eine ref und ein `visible`-Flag. Sobald das Element einmal sichtbar
 * war, bleibt es sichtbar (kein Flackern beim Zurueckscrollen).
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.15 },
) {
  const ref = useRef<T | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      })
    }, options)

    observer.observe(node)
    return () => observer.disconnect()
  }, [options])

  return { ref, visible }
}
