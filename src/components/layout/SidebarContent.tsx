import { Link } from 'react-router-dom'
import { navItems } from '@/data/navigation'
import { profile, socialLinks } from '@/data/profile'
import { useSectionNav } from '@/hooks/useSectionNav'
import type { SectionId } from '@/types'
import { cn } from '@/lib/utils'
import { SocialIcon } from '@/components/common/BrandIcons'
import { Logo } from '@/components/common/Logo'
import * as m from 'motion/react-m'

interface Props {
  active: SectionId | null
  onNavigate?: () => void
  /** Distinguishes the shared active-pill animation between sidebar and drawer. */
  layoutKey: string
}

export function SidebarContent({ active, onNavigate, layoutKey }: Props) {
  const goTo = useSectionNav()

  return (
    <div className="flex h-full flex-col">
      <div className="px-5 pt-6 pb-5">
        <Link to="/" onClick={onNavigate} className="flex items-center gap-3 rounded-xl" aria-label={`${profile.name}, home`}>
          <Logo />
          <span className="min-w-0">
            <span className="block truncate font-semibold tracking-tight text-fg">{profile.name}</span>
            <span className="block truncate text-[13px] text-muted">{profile.title}</span>
          </span>
        </Link>
        {profile.availability.open && (
          <p className="mt-4 inline-flex items-center gap-2 rounded-lg border border-success/25 bg-success/10 px-2.5 py-1 text-[12px] font-medium text-success">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            {profile.availability.label}
          </p>
        )}
      </div>

      <nav aria-label="Sections" className="flex-1 px-3">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const isActive = active === item.id
            const Icon = item.icon
            return (
              <li key={item.id}>
                <Link
                  to={{ pathname: '/', hash: item.id === 'overview' ? '' : item.id }}
                  onClick={(e) => {
                    e.preventDefault()
                    if (onNavigate) {
                      // Close the drawer first so its scroll lock is released before scrolling.
                      onNavigate()
                      requestAnimationFrame(() => goTo(item.id))
                    } else {
                      goTo(item.id)
                    }
                  }}
                  aria-current={isActive ? 'location' : undefined}
                  className={cn(
                    'relative flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors',
                    isActive ? 'text-fg' : 'text-muted hover:bg-elevated/60 hover:text-fg',
                  )}
                >
                  {isActive && (
                    <m.span
                      layoutId={`nav-active-${layoutKey}`}
                      className="absolute inset-0 rounded-lg border border-line bg-elevated"
                      transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                    >
                      <span className="absolute top-2 bottom-2 left-0 w-[3px] rounded-r-full bg-[linear-gradient(var(--primary),var(--accent))]" />
                    </m.span>
                  )}
                  <Icon size={17} aria-hidden="true" className={cn('relative', isActive && 'text-primary')} />
                  <span className="relative">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="border-t border-line px-5 py-5">
        {socialLinks.length > 0 && (
          <ul className="mb-4 flex gap-1" aria-label="Social links">
            {socialLinks.map((l) => (
              <li key={l.kind}>
                <a
                  href={l.href}
                  {...(l.kind !== 'email' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  aria-label={l.label}
                  title={l.label}
                  className="grid size-10 place-items-center rounded-lg text-muted transition-colors hover:bg-elevated hover:text-fg"
                >
                  <SocialIcon kind={l.kind} size={17} />
                </a>
              </li>
            ))}
          </ul>
        )}
        <p className="text-[13px] leading-snug text-subtle">{profile.tagline}</p>
      </div>
    </div>
  )
}
