import { useId, useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { skillGroups } from '@/data/skills'
import { Section } from '@/components/common/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { cn } from '@/lib/utils'

export function SkillsSection() {
  const [query, setQuery] = useState('')
  const inputId = useId()
  const q = query.trim().toLowerCase()

  const groups = useMemo(
    () =>
      skillGroups
        .map((g) => ({
          ...g,
          matches: q ? g.skills.filter((s) => s.toLowerCase().includes(q) || g.title.toLowerCase().includes(q)) : g.skills,
        }))
        .filter((g) => g.matches.length),
    [q],
  )
  const total = groups.reduce((n, g) => n + g.matches.length, 0)

  return (
    <Section id="skills">
      <SectionHeading
        id="skills"
        eyebrow="Skills"
        title="Technical toolkit"
        action={
          <div className="relative w-full sm:w-64">
            <label htmlFor={inputId} className="sr-only">
              Filter skills
            </label>
            <Search size={15} aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-subtle" />
            <input
              id={inputId}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter skills…"
              className="h-10 w-full rounded-xl border border-line bg-card pr-9 pl-9 text-sm text-fg outline-none placeholder:text-subtle focus:border-primary/60 [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear filter"
                className="absolute top-1/2 right-2 grid size-6 -translate-y-1/2 place-items-center rounded-md text-subtle hover:text-fg"
              >
                <X size={14} aria-hidden="true" />
              </button>
            )}
          </div>
        }
      />
      <p className="sr-only" role="status" aria-live="polite">
        {q ? `${total} skills match “${query}”` : ''}
      </p>

      {groups.length ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {groups.map((g) => (
            <div key={g.title} className={cn('card p-5 transition-colors hover:border-line-strong')}>
              <div className="mb-4 flex items-start gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-elevated text-primary">
                  <g.icon size={17} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-[15px] font-semibold text-fg">{g.title}</h3>
                  <p className="text-[12.5px] text-muted">{g.description}</p>
                </div>
              </div>
              <ul className="flex flex-wrap gap-2">
                {g.matches.map((s) => (
                  <li
                    key={s}
                    className="rounded-lg border border-line bg-elevated/60 px-2.5 py-1 text-[13px] text-fg transition-colors hover:border-primary/40"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="card px-6 py-10 text-center text-sm text-muted">No skills match “{query}”.</div>
      )}
    </Section>
  )
}
