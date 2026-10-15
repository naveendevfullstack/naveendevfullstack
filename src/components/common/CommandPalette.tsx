import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Copy, CornerDownLeft, Download, FolderGit2, Moon, Search, Sun, Tag } from 'lucide-react'
import { navItems } from '@/data/navigation'
import { profile, socialLinks } from '@/data/profile'
import { projects } from '@/data/projects'
import { skillGroups } from '@/data/skills'
import { useSectionNav } from '@/hooks/useSectionNav'
import { useResume } from '@/hooks/useResume'
import { useTheme } from '@/hooks/useTheme'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { SocialIcon } from './BrandIcons'

interface Command {
  id: string
  group: 'Navigate' | 'Projects' | 'Skills' | 'Actions'
  label: string
  hint?: string
  keywords: string
  icon: ReactNode
  run: () => void
  /** Closes the palette first; used for commands that move focus elsewhere. */
  closes?: boolean
}

interface Props {
  open: boolean
  onClose: () => void
}

export function CommandPalette({ open, onClose }: Props) {
  useBodyScrollLock(open)
  return (
    <AnimatePresence>
      {open && <Palette onClose={onClose} />}
    </AnimatePresence>
  )
}

function Palette({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  // Commands that move focus elsewhere (sections, routes) must not have it pulled back on close.
  const skipFocusRestore = useRef(false)
  const listId = useId()
  const navigate = useNavigate()
  const goToSection = useSectionNav()
  const resume = useResume()
  const { theme, toggleTheme } = useTheme()

  const commands = useMemo<Command[]>(() => {
    const list: Command[] = [
      ...navItems.map((n) => ({
        id: `nav-${n.id}`,
        group: 'Navigate' as const,
        label: n.label,
        hint: 'Section',
        keywords: n.id,
        icon: <n.icon size={16} aria-hidden="true" />,
        run: () => goToSection(n.id),
        closes: true,
      })),
      ...projects.map((p) => ({
        id: `project-${p.slug}`,
        group: 'Projects' as const,
        label: p.name,
        hint: p.category,
        keywords: `${p.category} ${p.description} ${p.tech.join(' ')}`,
        icon: <FolderGit2 size={16} aria-hidden="true" />,
        run: () => navigate(`/projects/${p.slug}`),
        closes: true,
      })),
      ...skillGroups.flatMap((g) =>
        g.skills.map((s) => ({
          id: `skill-${g.title}-${s}`,
          group: 'Skills' as const,
          label: s,
          hint: g.title,
          keywords: g.title,
          icon: <Tag size={16} aria-hidden="true" />,
          run: () => goToSection('skills'),
        closes: true,
        })),
      ),
      {
        id: 'theme',
        group: 'Actions',
        label: `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`,
        keywords: 'theme dark light mode appearance',
        icon: theme === 'dark' ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />,
        run: () => toggleTheme(),
      },
    ]
    if (resume.status === 'available') {
      list.push({
        id: 'resume',
        group: 'Actions',
        label: 'Download resume',
        hint: 'PDF',
        keywords: 'cv resume download pdf',
        icon: <Download size={16} aria-hidden="true" />,
        run: () => {
          const a = document.createElement('a')
          a.href = resume.href
          a.download = resume.downloadName
          a.click()
        },
        closes: true,
      })
    }
    if (profile.email) {
      list.push({
        id: 'copy-email',
        group: 'Actions',
        label: 'Copy email address',
        hint: profile.email,
        keywords: 'email contact copy mail',
        icon: <Copy size={16} aria-hidden="true" />,
        run: () => {
          navigator.clipboard?.writeText(profile.email).then(
            () => setCopied(true),
            () => setCopied(false),
          )
        },
      })
    }
    socialLinks
      .filter((l) => l.kind !== 'email')
      .forEach((l) =>
        list.push({
          id: `social-${l.kind}`,
          group: 'Actions',
          label: `Open ${l.label}`,
          hint: l.display,
          keywords: `${l.kind} profile social`,
          icon: <SocialIcon kind={l.kind} size={16} />,
          run: () => window.open(l.href, '_blank', 'noopener,noreferrer'),
        closes: true,
        }),
      )
    return list
  }, [goToSection, navigate, resume, theme, toggleTheme])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands.filter((c) => c.group !== 'Skills')
    const terms = q.split(/\s+/)
    return commands
      .map((c) => {
        const label = c.label.toLowerCase()
        const hay = `${label} ${c.hint ?? ''} ${c.keywords}`.toLowerCase()
        if (!terms.every((t) => hay.includes(t))) return null
        const score = label.startsWith(q) ? 0 : label.includes(q) ? 1 : 2
        return { c, score }
      })
      .filter((r): r is { c: Command; score: number } => r !== null)
      .sort((a, b) => a.score - b.score)
      .map((r) => r.c)
  }, [commands, query])

  // Results are grouped visually; keep a flat order for keyboard navigation.
  const groups = useMemo(() => {
    const order: Command['group'][] = ['Navigate', 'Projects', 'Skills', 'Actions']
    return order.map((g) => ({ group: g, items: results.filter((r) => r.group === g) })).filter((g) => g.items.length)
  }, [results])
  const flat = useMemo(() => groups.flatMap((g) => g.items), [groups])
  const activeIndex = Math.min(active, Math.max(flat.length - 1, 0))

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    inputRef.current?.focus()
    return () => {
      if (!skipFocusRestore.current) previous?.focus?.({ preventScroll: true })
    }
  }, [])

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex])

  const onKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setActive((i) => (flat.length ? (Math.min(i, flat.length - 1) + 1) % flat.length : 0))
        break
      case 'ArrowUp':
        e.preventDefault()
        setActive((i) => (flat.length ? (Math.min(i, flat.length - 1) - 1 + flat.length) % flat.length : 0))
        break
      case 'Home':
        e.preventDefault()
        setActive(0)
        break
      case 'End':
        e.preventDefault()
        setActive(flat.length - 1)
        break
      case 'Enter':
        e.preventDefault()
        if (flat[activeIndex]) execute(flat[activeIndex])
        break
      case 'Escape':
        e.preventDefault()
        onClose()
        break
      case 'Tab':
        // The input is the only tabbable element; keep focus inside the dialog.
        e.preventDefault()
        break
    }
  }

  const execute = (c: Command) => {
    if (!c.closes) return c.run()
    skipFocusRestore.current = true
    onClose()
    // Let the dialog start closing before scrolling or navigating.
    requestAnimationFrame(c.run)
  }

  const optionId = (c: Command) => `${listId}-${c.id.replace(/\s+/g, '-')}`

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-3 pt-[12vh] sm:px-6" onKeyDown={onKeyDown}>
      <m.div
        className="absolute inset-0 bg-overlay backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        onClick={onClose}
        aria-hidden="true"
      />
      <m.div
        role="dialog"
        aria-modal="true"
        aria-label="Search portfolio"
        className="relative flex max-h-[70vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-line-strong bg-card shadow-[0_32px_80px_-24px_rgb(0_0_0/0.7)]"
        initial={{ opacity: 0, y: -8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -8, scale: 0.98 }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search size={18} className="shrink-0 text-subtle" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setActive(0)
              setCopied(false)
            }}
            placeholder="Search sections, projects, skills…"
            className="h-14 w-full bg-transparent text-[15px] text-fg outline-none placeholder:text-subtle"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={flat[activeIndex] ? optionId(flat[activeIndex]) : undefined}
            autoComplete="off"
            spellCheck={false}
          />
          <button type="button" onClick={onClose} className="kbd shrink-0 hover:text-fg" aria-label="Close search">
            Esc
          </button>
        </div>

        <ul ref={listRef} id={listId} role="listbox" aria-label="Results" className="flex-1 overflow-y-auto overscroll-contain p-2">
          {groups.map((g) => (
            <li key={g.group} role="presentation">
              <p className="px-3 pt-3 pb-1.5 font-mono text-[11px] tracking-wider text-subtle uppercase" aria-hidden="true">
                {g.group}
              </p>
              <ul role="group" aria-label={g.group}>
                {g.items.map((c) => {
                  const selected = flat[activeIndex] === c
                  return (
                    <li
                      key={c.id}
                      id={optionId(c)}
                      role="option"
                      aria-selected={selected}
                      onClick={() => execute(c)}
                      onMouseMove={() => setActive(flat.indexOf(c))}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${
                        selected ? 'bg-elevated text-fg' : 'text-muted'
                      }`}
                    >
                      <span className={selected ? 'text-primary' : 'text-subtle'}>{c.icon}</span>
                      <span className="min-w-0 flex-1 truncate">{c.label}</span>
                      {c.hint && <span className="hidden truncate text-[12px] text-subtle sm:block">{c.hint}</span>}
                      {selected && <ArrowRight size={14} aria-hidden="true" className="shrink-0 text-subtle" />}
                    </li>
                  )
                })}
              </ul>
            </li>
          ))}
          {flat.length === 0 && (
            <li role="presentation" className="px-3 py-10 text-center text-sm text-muted">
              No results for “{query}”
            </li>
          )}
        </ul>

        <div className="flex items-center justify-between gap-3 border-t border-line px-4 py-2.5 text-[12px] text-subtle">
          <span className="hidden items-center gap-3 sm:flex">
            <span className="inline-flex items-center gap-1">
              <span className="kbd">↑</span>
              <span className="kbd">↓</span> to move
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="kbd">
                <CornerDownLeft size={10} aria-hidden="true" />
              </span>
              to select
            </span>
          </span>
          <span role="status" aria-live="polite">
            {copied ? 'Email copied to clipboard' : `${flat.length} result${flat.length === 1 ? '' : 's'}`}
          </span>
        </div>
      </m.div>
    </div>
  )
}
