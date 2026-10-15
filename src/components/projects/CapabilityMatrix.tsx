import { projects } from '@/data/projects'
import { cn } from '@/lib/utils'

/**
 * A contribution-graph style view built only from the project data in
 * src/data/projects.ts. It is not GitHub activity, and the UI says so.
 */
const columns = Array.from(new Set(projects.flatMap((p) => p.tech)))

export function CapabilityMatrix() {
  return (
    <figure className="card overflow-hidden">
      <figcaption className="flex flex-col gap-1 border-b border-line px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-sm font-semibold text-fg">Technology coverage across featured projects</span>
        <span className="font-mono text-[11.5px] text-subtle">Derived from project data · not GitHub activity</span>
      </figcaption>
      <div className="relative overflow-x-auto px-5 py-4 [scrollbar-width:thin]">
        <table className="w-full border-separate border-spacing-[5px] text-left">
          <caption className="sr-only">Which technologies each featured project uses</caption>
          <thead>
            <tr>
              <th scope="col" className="sr-only">
                Project
              </th>
              {columns.map((c) => (
                <th key={c} scope="col" className="h-24 w-7 min-w-7 align-bottom">
                  <span className="mx-auto block w-4 rotate-180 font-mono text-[11px] font-normal whitespace-nowrap text-subtle [writing-mode:vertical-rl]">
                    {c}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.slug}>
                <th scope="row" className="pr-3 text-[13px] font-medium whitespace-nowrap text-muted">
                  {p.name}
                </th>
                {columns.map((c) => {
                  const used = p.tech.includes(c)
                  return (
                    <td key={c} className="p-0">
                      <span
                        className={cn('block size-7 rounded-md border', used ? 'border-transparent' : 'border-line bg-elevated/50')}
                        style={used ? { background: `color-mix(in srgb, var(--primary) ${c === 'Flutter' || c === 'Dart' ? 85 : 55}%, var(--accent))` } : undefined}
                      >
                        <span className="sr-only">{used ? 'Uses' : 'Does not use'} {c}</span>
                      </span>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center gap-4 border-t border-line px-5 py-3 text-[12px] text-subtle">
        <span className="inline-flex items-center gap-1.5">
          <span className="size-3 rounded-[3px] bg-[color-mix(in_srgb,var(--primary)_55%,var(--accent))]" aria-hidden="true" /> Used
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="size-3 rounded-[3px] border border-line bg-elevated/50" aria-hidden="true" /> Not used
        </span>
      </div>
    </figure>
  )
}
