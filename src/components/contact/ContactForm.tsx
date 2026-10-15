import { useEffect, useRef, useState } from 'react'
import { useForm, type FieldErrors, type UseFormRegisterReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, CheckCircle2, Loader2, Mail, Send } from 'lucide-react'
import { buildMailto, contactMode, contactSchema, submitToEndpoint, type ContactValues } from '@/lib/contact'
import { Button } from '@/components/common/Button'
import { cn } from '@/lib/utils'

type Status = { kind: 'idle' } | { kind: 'success'; message: string } | { kind: 'error'; message: string }

export default function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const statusRef = useRef<HTMLDivElement>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({ resolver: zodResolver(contactSchema), mode: 'onTouched' })

  useEffect(() => {
    if (status.kind !== 'idle') statusRef.current?.focus()
  }, [status])

  const onSubmit = async (values: ContactValues) => {
    // Bots fill the hidden field; quietly drop the submission.
    if (values.company) return

    if (contactMode === 'mailto') {
      window.location.assign(buildMailto(values))
      setStatus({
        kind: 'success',
        message: 'Your email app should open with this message ready to send. Nothing has been sent yet: please press send there.',
      })
      return
    }

    try {
      await submitToEndpoint(values)
      setStatus({ kind: 'success', message: 'Thanks! Your message was sent. I’ll get back to you soon.' })
      reset()
    } catch {
      setStatus({ kind: 'error', message: 'Sorry, your message could not be sent. Please try again in a moment.' })
    }
  }

  const disabled = contactMode === 'unavailable'

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="card relative p-5 sm:p-7" aria-describedby="contact-form-note">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name} reg={register('name')} autoComplete="name" disabled={disabled} />
        <Field label="Email" error={errors.email} reg={register('email')} type="email" autoComplete="email" disabled={disabled} />
      </div>
      <div className="mt-4">
        <Field label="Subject" error={errors.subject} reg={register('subject')} disabled={disabled} />
      </div>
      <div className="mt-4">
        <Field label="Message" error={errors.message} reg={register('message')} textarea disabled={disabled} />
      </div>

      {/* Honeypot, hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Company
          <input tabIndex={-1} autoComplete="off" {...register('company')} />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p id="contact-form-note" className="text-[12.5px] leading-relaxed text-subtle sm:max-w-xs">
          {contactMode === 'endpoint' && 'Your message is sent securely to my inbox.'}
          {contactMode === 'mailto' && 'This opens your email app with the message filled in. You send it from there.'}
          {contactMode === 'unavailable' && 'The contact form is not configured yet.'}
        </p>
        <Button type="submit" size="lg" disabled={isSubmitting || disabled} className="sm:min-w-44">
          {isSubmitting ? (
            <>
              <Loader2 size={17} className="animate-spin" aria-hidden="true" /> Sending…
            </>
          ) : contactMode === 'mailto' ? (
            <>
              <Mail size={17} aria-hidden="true" /> Open in email app
            </>
          ) : (
            <>
              <Send size={17} aria-hidden="true" /> Send message
            </>
          )}
        </Button>
      </div>

      <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="outline-none">
        {status.kind !== 'idle' && (
          <p
            className={cn(
              'mt-5 flex items-start gap-2.5 rounded-xl border px-4 py-3 text-sm',
              status.kind === 'success' ? 'border-success/30 bg-success/10 text-fg' : 'border-danger/30 bg-danger/10 text-fg',
            )}
          >
            {status.kind === 'success' ? (
              <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-success" aria-hidden="true" />
            ) : (
              <AlertCircle size={17} className="mt-0.5 shrink-0 text-danger" aria-hidden="true" />
            )}
            <span>
              <span className="sr-only">{status.kind === 'success' ? 'Success: ' : 'Error: '}</span>
              {status.message}
            </span>
          </p>
        )}
      </div>
    </form>
  )
}

interface FieldProps {
  label: string
  reg: UseFormRegisterReturn
  error?: FieldErrors<ContactValues>[keyof ContactValues]
  type?: string
  autoComplete?: string
  textarea?: boolean
  disabled?: boolean
}

function Field({ label, reg, error, type = 'text', autoComplete, textarea, disabled }: FieldProps) {
  const id = `contact-${reg.name}`
  const errorId = `${id}-error`
  const className = cn(
    'w-full rounded-xl border bg-elevated/40 px-3.5 text-[15px] text-fg outline-none transition-colors placeholder:text-subtle disabled:opacity-60',
    'focus:border-primary/70 focus:bg-elevated/70 focus:ring-3 focus:ring-primary/15',
    error ? 'border-danger/70' : 'border-line-strong',
    textarea ? 'min-h-36 resize-y py-3' : 'h-12',
  )
  const shared = {
    id,
    ...reg,
    disabled,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    className,
  }
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-medium text-fg">
        {label}
      </label>
      {textarea ? <textarea rows={6} {...shared} /> : <input type={type} autoComplete={autoComplete} {...shared} />}
      {error?.message && (
        <p id={errorId} className="mt-1.5 flex items-center gap-1.5 text-[12.5px] text-danger">
          <AlertCircle size={13} aria-hidden="true" />
          {error.message}
        </p>
      )}
    </div>
  )
}
