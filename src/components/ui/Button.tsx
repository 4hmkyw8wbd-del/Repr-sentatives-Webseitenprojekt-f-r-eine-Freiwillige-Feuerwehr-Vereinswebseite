import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus-visible:outline-none disabled:opacity-60 disabled:pointer-events-none'

const variants: Record<Variant, string> = {
  primary:
    'bg-fire-500 text-white shadow-lg shadow-fire-600/25 hover:bg-fire-400 hover:-translate-y-0.5 active:translate-y-0',
  secondary:
    'bg-white/5 text-offwhite border border-white/15 hover:border-signal-400/60 hover:bg-white/10 hover:-translate-y-0.5',
  ghost:
    'text-signal-300 hover:text-signal-400 underline-offset-4 hover:underline',
}

const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm min-h-[44px]',
  lg: 'px-7 py-3.5 text-base min-h-[52px]',
}

type CommonProps = {
  variant?: Variant
  size?: Size
  children: ReactNode
  className?: string
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = 'primary', size = 'md', children, className = '' } = props
  const cls = [base, variants[variant], sizes[size], className].join(' ')

  if ('href' in props && props.href !== undefined) {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props
    void _v
    void _s
    void _c
    void _ch
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    )
  }

  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } =
    props as ButtonAsButton
  void _v
  void _s
  void _c
  void _ch
  void _h
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  )
}
