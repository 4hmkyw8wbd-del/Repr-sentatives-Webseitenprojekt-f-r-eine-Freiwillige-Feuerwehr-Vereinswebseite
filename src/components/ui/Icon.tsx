import type { SVGProps } from 'react'

export type IconName =
  | 'helm'
  | 'schild'
  | 'flamme'
  | 'rettungsgeraet'
  | 'unwetter'
  | 'funkmelder'
  | 'fahrzeug'
  | 'hydrant'
  | 'strahlrohr'
  | 'blaulicht'
  | 'tuer'
  | 'trage'
  | 'wache'
  | 'team'
  | 'pokal'
  | 'zelt'
  | 'kompass'
  | 'tropfen'
  | 'puzzle'
  | 'haus'
  | 'herz'
  | 'werkzeug'
  | 'fuehrerschein'
  | 'rauchmelder'
  | 'co'
  | 'rettungsgasse'
  | 'erstehilfe'
  | 'atemschutz'
  | 'funk'

const paths: Record<IconName, string> = {
  helm: 'M12 4c-4.4 0-8 3.1-8 7.5V14h3v-2.2A5 5 0 0 1 17 12V14h3v-2.5C20 7.1 16.4 4 12 4ZM3 15h18v3H3z',
  schild: 'M12 3 5 6v5c0 4.4 3 8 7 9 4-1 7-4.6 7-9V6l-7-3Z',
  flamme: 'M12 3c1 3-2 4-2 7a2 2 0 1 0 4 0c2 1 3 3 3 5a5 5 0 1 1-10 0c0-4 4-6 5-12Z',
  rettungsgeraet: 'M6 4 4 6l5 5-2 2 3 3 2-2 5 5 2-2-5-5 2-2-3-3-2 2-5-5Z',
  unwetter: 'M7 13a4 4 0 1 1 1-7.9A5 5 0 0 1 18 8a3.5 3.5 0 0 1-.5 6.9H7Zm4 1-2 5h2l-1 3 4-5h-2l1-3Z',
  funkmelder: 'M9 3h6v4H9zM8 8h8v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V8Zm3 3h2v5h-2z',
  fahrzeug: 'M3 11l2-5h9l3 4h2a2 2 0 0 1 2 2v3h-2a2 2 0 1 1-4 0H9a2 2 0 1 1-4 0H3v-4Zm3-4-1 3h6V7H6Z',
  hydrant: 'M9 4h6v2h-1v3h2v2h-2v6a3 3 0 0 1-6 0v-6H6V9h2V6H7V4Zm-4 16h14v2H5z',
  strahlrohr: 'M3 10h7l8-3v3l3 1-3 1v3l-8-3H3z',
  blaulicht: 'M9 3h6v3a3 3 0 0 1 3 3v3H6V9a3 3 0 0 1 3-3V3ZM4 15h16v3H4zM6 19h12v2H6z',
  tuer: 'M5 3h11a2 2 0 0 1 2 2v16H5V3Zm9 8h2v2h-2z',
  trage: 'M3 9h18v2H3zM5 7v10M19 7v10M9 13h6',
  wache: 'M12 3 4 7v3h16V7l-8-4Zm-7 9h14v9H5v-9Zm5 2v5h4v-5h-4Z',
  team: 'M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 20a6 6 0 0 1 12 0v1H2v-1Zm12.5-5.7A6 6 0 0 1 22 20v1h-5v-1a8 8 0 0 0-2.5-5.7Z',
  pokal: 'M7 4h10v3a5 5 0 0 1-10 0V4ZM5 5H3v2a3 3 0 0 0 3 3M19 5h2v2a3 3 0 0 1-3 3M10 13h4v3h-4zM8 18h8v2H8z',
  zelt: 'M12 3 3 20h8l1-6 1 6h8L12 3Z',
  kompass: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm3 7-2 4-4 2 2-4 4-2Z',
  tropfen: 'M12 3c3 4 6 7 6 10a6 6 0 0 1-12 0c0-3 3-6 6-10Z',
  puzzle: 'M10 3h4v2a2 2 0 1 0 4 0V3h3v4h-2a2 2 0 1 0 0 4h2v4h-4v-2a2 2 0 1 0-4 0v2H6v-4h2a2 2 0 1 0 0-4H6V3h4Z',
  haus: 'M12 3 2 11h3v9h6v-5h2v5h6v-9h3L12 3Z',
  herz: 'M12 21S4 14.5 4 8.8A4.3 4.3 0 0 1 12 6a4.3 4.3 0 0 1 8 2.8C20 14.5 12 21 12 21Z',
  werkzeug: 'M14 3a5 5 0 0 0-4.6 7L3 16.4 6.6 20 13 13.6A5 5 0 0 0 21 9l-3 3-2-2 3-3a5 5 0 0 0-5-4Z',
  fuehrerschein: 'M3 5h18v14H3V5Zm3 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4Zm-1 6h6v1H5v-1Zm9-6h5v1h-5zm0 3h5v1h-5z',
  rauchmelder: 'M12 4a7 7 0 0 1 7 7v3H5v-3a7 7 0 0 1 7-7Zm-1 5h2v3h-2zM9 17h6v2H9z',
  co: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-2 7H8a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2v-2H8v-2h2V9Zm5 0h-1a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2Zm0 2v2h-1v-2h1Z',
  rettungsgasse: 'M4 4h4v16H4zM16 4h4v16h-4zM11 5h2v3h-2zM11 11h2v3h-2zM11 17h2v2h-2z',
  erstehilfe: 'M4 5h16v14H4V5Zm7 3v3H8v2h3v3h2v-3h3v-2h-3V8h-2Z',
  atemschutz: 'M12 3a6 6 0 0 0-6 6v3a6 6 0 0 0 4 5.7V21h4v-3.3A6 6 0 0 0 18 12V9a6 6 0 0 0-6-6Zm-2 8h4v2h-4z',
  funk: 'M12 8a4 4 0 0 0-4 4h2a2 2 0 1 1 4 0h2a4 4 0 0 0-4-4Zm0-4a8 8 0 0 0-8 8h2a6 6 0 1 1 12 0h2a8 8 0 0 0-8-8Zm-1 9h2v6h-2z',
}

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName
  title?: string
}

export function Icon({ name, title, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...props}
    >
      {title && <title>{title}</title>}
      <path d={paths[name]} />
    </svg>
  )
}
