import { lazy, Suspense } from 'react'
import { MapPin } from 'lucide-react'
import { profile, socialLinks } from '@/data/profile'
import { Section } from '@/components/common/Section'
import { SocialIcon } from '@/components/common/BrandIcons'

// Form validation libraries stay out of the initial bundle; the chunk is
// prefetched when the browser is idle so layout is stable before scrolling.
const loadContactForm = () => import('@/components/contact/ContactForm')
const ContactForm = lazy(loadContactForm)
if (typeof window !== 'undefined') {
  const idle = window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 1500))
  idle(() => void loadContactForm())
}

export function ContactSection() {
  return (
    <Section id="contact">
      <div className="relative isolate overflow-hidden rounded-[20px] border border-line bg-card/50 p-5 sm:p-8 lg:p-10">
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <div className="absolute -top-32 -right-24 size-[420px] rounded-full bg-accent/15 blur-[110px]" />
          <div className="absolute -bottom-40 -left-24 size-[420px] rounded-full bg-primary/15 blur-[110px]" />
        </div>
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] xl:gap-12">
          <div>
            <p className="mb-2 font-mono text-xs font-medium tracking-[0.18em] text-primary uppercase">Contact</p>
            <h2 id="contact-title" className="text-[clamp(1.9rem,1.3rem+2.2vw,3rem)] leading-[1.05] font-semibold tracking-tight text-fg">
              Have a project <span className="text-gradient">in mind?</span>
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
              I&apos;m interested in discussing application development, collaboration, and opportunities to build useful products.
            </p>

            {(socialLinks.length > 0 || profile.location) && (
              <ul className="mt-8 space-y-2">
                {socialLinks.map((l) => (
                  <li key={l.kind}>
                    <a
                      href={l.href}
                      {...(l.kind !== 'email' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group flex items-center gap-3 rounded-xl border border-line bg-card/70 px-4 py-3 transition-colors hover:border-primary/40"
                    >
                      <span className="grid size-9 place-items-center rounded-lg bg-elevated text-muted group-hover:text-primary">
                        <SocialIcon kind={l.kind} size={17} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[12px] text-subtle">{l.label}</span>
                        <span className="block truncate text-sm font-medium text-fg">{l.display}</span>
                      </span>
                    </a>
                  </li>
                ))}
                {profile.location && (
                  <li className="flex items-center gap-3 px-4 py-3 text-sm text-muted">
                    <MapPin size={17} aria-hidden="true" className="text-subtle" />
                    {profile.location}
                  </li>
                )}
              </ul>
            )}
          </div>
          <Suspense fallback={<div className="card min-h-[500px]" aria-busy="true" />}>
            <ContactForm />
          </Suspense>
        </div>
      </div>
    </Section>
  )
}
