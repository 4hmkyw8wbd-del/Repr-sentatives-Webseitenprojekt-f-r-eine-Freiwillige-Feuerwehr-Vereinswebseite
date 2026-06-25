import { useState, type FormEvent } from 'react'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { Button } from '../components/ui/Button'
import { Icon } from '../components/ui/Icon'

const anliegen = [
  'Allgemeine Anfrage',
  'Mitglied werden',
  'Jugendfeuerwehr anfragen',
  'Kinderfeuerwehr anfragen',
  'Fördermitgliedschaft',
  'Presseanfrage',
  'Brandschutzerziehung anfragen',
]

type Errors = Partial<Record<'name' | 'email' | 'anliegen' | 'nachricht' | 'datenschutz', string>>

export function Kontakt() {
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  function validate(form: HTMLFormElement): Errors {
    const data = new FormData(form)
    const next: Errors = {}
    const name = (data.get('name') as string)?.trim()
    const email = (data.get('email') as string)?.trim()
    const anl = data.get('anliegen') as string
    const nachricht = (data.get('nachricht') as string)?.trim()
    const datenschutz = data.get('datenschutz')

    if (!name) next.name = 'Bitte geben Sie Ihren Namen an.'
    if (!email) next.email = 'Bitte geben Sie Ihre E-Mail-Adresse an.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = 'Bitte geben Sie eine gültige E-Mail-Adresse an.'
    if (!anl) next.anliegen = 'Bitte wählen Sie ein Anliegen aus.'
    if (!nachricht) next.nachricht = 'Bitte schreiben Sie uns eine kurze Nachricht.'
    if (!datenschutz) next.datenschutz = 'Bitte bestätigen Sie den Hinweis.'
    return next
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget

    // Honeypot: von Menschen unsichtbar; wenn ausgefüllt -> stiller Abbruch.
    if ((new FormData(form).get('website') as string)?.length) {
      setStatus('success')
      form.reset()
      return
    }

    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length > 0) {
      setStatus('error')
      return
    }

    setStatus('sending')
    // Simulierter Versand – kein echtes Backend.
    window.setTimeout(() => {
      setStatus('success')
      form.reset()
    }, 700)
  }

  return (
    <section id="kontakt" className="section bg-navy-950/40">
      <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHeading
            eyebrow="Kontakt"
            title="Unverbindlich Kontakt aufnehmen"
            intro="Ob Mitmachen, Jugendfeuerwehr oder eine allgemeine Frage – schreiben Sie uns. Wir melden uns gern zurück."
          />
          <Reveal className="mt-6 rounded-xl border border-gold-400/25 bg-gold-400/5 p-4 text-sm text-offwhite/75">
            <p className="flex items-start gap-2">
              <Icon name="kompass" className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
              <span>
                <strong className="text-gold-400">Hinweis:</strong> Dies ist ein
                fiktives Demonstrationsformular. Es werden keine Daten übertragen oder
                gespeichert und es wird keine echte Nachricht versendet.
              </span>
            </p>
          </Reveal>
        </div>

        <Reveal>
          <form className="card space-y-5" onSubmit={handleSubmit} noValidate>
            {/* Honeypot (für Menschen unsichtbar) */}
            <div className="absolute -left-[9999px]" aria-hidden>
              <label>
                Website
                <input type="text" name="website" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <Field id="name" label="Name" error={errors.name}>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                className={inputCls(!!errors.name)}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="email" label="E-Mail" error={errors.email}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  className={inputCls(!!errors.email)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
              </Field>
              <Field id="telefon" label="Telefon (optional)">
                <input
                  id="telefon"
                  name="telefon"
                  type="tel"
                  autoComplete="tel"
                  className={inputCls(false)}
                />
              </Field>
            </div>

            <Field id="anliegen" label="Anliegen" error={errors.anliegen}>
              <select
                id="anliegen"
                name="anliegen"
                defaultValue=""
                className={inputCls(!!errors.anliegen)}
                aria-invalid={!!errors.anliegen}
                aria-describedby={errors.anliegen ? 'anliegen-error' : undefined}
              >
                <option value="" disabled>
                  Bitte auswählen…
                </option>
                {anliegen.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </Field>

            <Field id="nachricht" label="Nachricht" error={errors.nachricht}>
              <textarea
                id="nachricht"
                name="nachricht"
                rows={5}
                className={inputCls(!!errors.nachricht)}
                aria-invalid={!!errors.nachricht}
                aria-describedby={errors.nachricht ? 'nachricht-error' : undefined}
              />
            </Field>

            <div>
              <label className="flex items-start gap-3 text-sm text-offwhite/75">
                <input
                  type="checkbox"
                  name="datenschutz"
                  className="mt-1 h-4 w-4 rounded border-white/20 bg-navy-800"
                  aria-invalid={!!errors.datenschutz}
                  aria-describedby={errors.datenschutz ? 'datenschutz-error' : undefined}
                />
                <span>
                  Mir ist bewusst, dass dies ein fiktives Demoformular ist und keine
                  Daten übermittelt werden.
                </span>
              </label>
              {errors.datenschutz && (
                <p id="datenschutz-error" className="mt-1 text-xs text-fire-400">
                  {errors.datenschutz}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button type="submit" size="lg" disabled={status === 'sending'}>
                {status === 'sending' ? 'Wird gesendet…' : 'Unverbindlich Kontakt aufnehmen'}
              </Button>

              <div aria-live="polite" className="text-sm">
                {status === 'success' && (
                  <p className="flex items-center gap-2 text-signal-300">
                    <Icon name="erstehilfe" className="h-5 w-5" />
                    Vielen Dank! Ihre (fiktive) Anfrage wurde erfolgreich simuliert.
                  </p>
                )}
                {status === 'error' && (
                  <p className="text-fire-400">
                    Bitte überprüfen Sie die markierten Felder.
                  </p>
                )}
              </div>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  )
}

function inputCls(hasError: boolean) {
  return [
    'w-full rounded-lg border bg-navy-800/60 px-4 py-3 text-sm text-offwhite placeholder:text-offwhite/40 transition-colors',
    hasError
      ? 'border-fire-500/70 focus:border-fire-500'
      : 'border-white/10 focus:border-signal-400',
  ].join(' ')
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-offwhite/85">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-fire-400">
          {error}
        </p>
      )}
    </div>
  )
}
