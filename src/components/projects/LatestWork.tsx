import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { latestWork } from '@/data/projects'

/** GitHub-style compact list. Dates appear only when set in the data. */
export function LatestWork() {
  return (
    <ul className="divide-y divide-line">
      {latestWork.map((p) => (
        <li key={p.slug}>
          <Link
            to={`/projects/${p.slug}`}
            className="group flex items-center gap-3 rounded-lg px-1 py-3 transition-colors hover:bg-elevated/60"
          >
            <span
              className="grid size-9 shrink-0 place-items-center rounded-lg border border-line text-[13px] font-semibold"
              style={{ background: `color-mix(in srgb, ${p.accent} 16%, transparent)`, color: p.accent }}
              aria-hidden="true"
            >
              {p.name[0]}
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex min-w-0 items-baseline gap-2">
                <span className="shrink-0 text-sm font-medium text-fg">{p.name}</span>
                <span className="min-w-0 truncate font-mono text-[11px] text-subtle">{p.date ?? p.category}</span>
              </span>
              <span className="block truncate text-[12.5px] text-muted">{p.description}</span>
            </span>
            <ChevronRight size={16} aria-hidden="true" className="shrink-0 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-fg" />
          </Link>
        </li>
      ))}
    </ul>
  )
}
