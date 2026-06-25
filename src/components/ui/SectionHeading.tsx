import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type SectionHeadingProps = {
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  align?: 'left' | 'center'
  id?: string
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  id,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={[
        'max-w-2xl',
        align === 'center' ? 'mx-auto text-center' : '',
      ].join(' ')}
    >
      {eyebrow && (
        <span className="eyebrow">
          <span aria-hidden className="h-px w-6 bg-signal-400/60" />
          {eyebrow}
        </span>
      )}
      <h2 id={id} className="mt-4 text-3xl sm:text-4xl text-white">
        {title}
      </h2>
      {intro && <p className="mt-4 text-base sm:text-lg text-offwhite/70">{intro}</p>}
    </Reveal>
  )
}
