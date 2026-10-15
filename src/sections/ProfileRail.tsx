import { Briefcase, Code2, MapPin, MonitorSmartphone } from 'lucide-react'
import { profile, socialLinks } from '@/data/profile'
import { useSectionNav } from '@/hooks/useSectionNav'
import { Avatar } from '@/components/common/Logo'
import { Button } from '@/components/common/Button'
import { ResumeButton } from '@/components/common/ResumeButton'
import { SocialIcon } from '@/components/common/BrandIcons'
import { LatestWork } from '@/components/projects/LatestWork'

/** Right-hand rail on wide screens; stacked cards on smaller screens. */
export function ProfileRail({ headingLevel = 'h2' }: { headingLevel?: 'h2' | 'h3' }) {
  const goTo = useSectionNav()
  const H = headingLevel

  const facts = [
    { icon: Briefcase, label: `${profile.yearsOfExperience} years of experience` },
    { icon: Code2, label: 'Flutter & Dart' },
    { icon: MonitorSmartphone, label: 'Mobile, tablet & web' },
    ...(profile.location ? [{ icon: MapPin, label: profile.location }] : []),
  ]

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-1">
      <div className="card p-5">
        <div className="flex items-center gap-4">
          <Avatar />
          <div className="min-w-0">
            <H className="truncate text-lg font-semibold tracking-tight text-fg">{profile.name}</H>
            <p className="text-sm text-muted">{profile.title}</p>
          </div>
        </div>
        <ul className="mt-5 space-y-2.5">
          {facts.map((f) => (
            <li key={f.label} className="flex items-center gap-2.5 text-[13.5px] text-muted">
              <f.icon size={15} aria-hidden="true" className="shrink-0 text-subtle" />
              {f.label}
            </li>
          ))}
        </ul>
        {socialLinks.length > 0 && (
          <ul className="mt-5 space-y-1 border-t border-line pt-4" aria-label="Profiles">
            {socialLinks.map((l) => (
              <li key={l.kind}>
                <a
                  href={l.href}
                  {...(l.kind !== 'email' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-center gap-2.5 rounded-md py-1 text-[13px] text-muted transition-colors hover:text-primary"
                >
                  <SocialIcon kind={l.kind} size={15} />
                  <span className="truncate">{l.display}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-5 grid grid-cols-1 gap-2">
          <Button onClick={() => goTo('contact')}>Get In Touch</Button>
          <ResumeButton variant="secondary" showView />
        </div>
      </div>

      <div className="card p-5">
        <div className="mb-2 flex items-center justify-between">
          <H className="text-sm font-semibold text-fg">Latest work</H>
          <button type="button" onClick={() => goTo('projects')} className="rounded text-[12.5px] text-muted hover:text-primary">
            View all
          </button>
        </div>
        <LatestWork />
      </div>
    </div>
  )
}
