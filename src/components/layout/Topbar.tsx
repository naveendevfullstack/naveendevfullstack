import { Menu, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { profile } from '@/data/profile'
import { useCommandPalette } from '@/hooks/useCommandPalette'
import { isMac } from '@/lib/utils'
import { Logo } from '@/components/common/Logo'
import { ResumeButton } from '@/components/common/ResumeButton'
import { ThemeToggle } from '@/components/common/ThemeToggle'

export function Topbar({ onOpenMenu, menuOpen }: { onOpenMenu: () => void; menuOpen: boolean }) {
  const palette = useCommandPalette()

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/75 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-2 px-4 sm:gap-3 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onOpenMenu}
          aria-label="Open navigation"
          aria-expanded={menuOpen}
          aria-haspopup="dialog"
          className="grid size-10 shrink-0 place-items-center rounded-xl border border-line text-muted hover:bg-elevated hover:text-fg lg:hidden"
        >
          <Menu size={18} aria-hidden="true" />
        </button>
        <Link to="/" className="flex items-center gap-2.5 rounded-xl lg:hidden" aria-label={`${profile.name}, home`}>
          <Logo className="size-9" />
          <span className="hidden font-semibold tracking-tight sm:block">{profile.name}</span>
        </Link>

        <button
          type="button"
          onClick={palette.open}
          aria-haspopup="dialog"
          aria-keyshortcuts={isMac ? 'Meta+K' : 'Control+K'}
          className="group ml-auto hidden h-10 w-full max-w-sm items-center gap-2.5 rounded-xl border border-line bg-card/70 px-3 text-left text-sm text-subtle transition-colors hover:border-line-strong md:flex lg:ml-0"
        >
          <Search size={16} aria-hidden="true" className="group-hover:text-muted" />
          <span className="flex-1 truncate">Search my portfolio...</span>
          <kbd className="kbd">{isMac ? '⌘ K' : 'Ctrl K'}</kbd>
        </button>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={palette.open}
            aria-label="Search my portfolio"
            aria-haspopup="dialog"
            className="grid size-10 place-items-center rounded-xl border border-line text-muted hover:bg-elevated hover:text-fg md:hidden"
          >
            <Search size={18} aria-hidden="true" />
          </button>
          <ThemeToggle />
          <span className="hidden sm:block">
            <ResumeButton size="sm" className="h-10" />
          </span>
        </div>
      </div>
    </header>
  )
}
