import { z } from 'zod'
import { profile } from '@/data/profile'

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name (at least 2 characters).').max(80, 'Name is too long.'),
  email: z.string().trim().email('Please enter a valid email address.').max(254, 'Email is too long.'),
  subject: z.string().trim().min(3, 'Please add a short subject.').max(120, 'Subject is too long (120 characters max).'),
  message: z
    .string()
    .trim()
    .min(20, 'Please write a little more (at least 20 characters).')
    .max(4000, 'Message is too long (4,000 characters max).'),
  // Honeypot: real visitors never see or fill this field.
  company: z.string().max(0).optional(),
})

export type ContactValues = z.infer<typeof contactSchema>

export const contactEndpoint = (import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined)?.trim() || ''

export type ContactMode = 'endpoint' | 'mailto' | 'unavailable'

export const contactMode: ContactMode = contactEndpoint ? 'endpoint' : profile.email ? 'mailto' : 'unavailable'

/** Posts JSON to the configured form service. Throws on any non-2xx response. */
export async function submitToEndpoint(values: ContactValues) {
  const { company: _honeypot, ...payload } = values
  void _honeypot
  const res = await fetch(contactEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
}

export function buildMailto(values: ContactValues) {
  const body = `${values.message}\n\n— ${values.name} (${values.email})`
  return `mailto:${profile.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`
}
