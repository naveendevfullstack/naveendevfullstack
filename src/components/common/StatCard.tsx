import type { Stat } from '@/types'

export function StatCard({ stat }: { stat: Stat }) {
  const Icon = stat.icon
  return (
    <div className="card group relative h-full overflow-hidden p-4 transition-colors duration-300 hover:border-line-strong sm:p-5">
      <div className="pointer-events-none absolute -top-12 -right-12 size-28 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
      <span className="mb-4 grid size-9 place-items-center rounded-lg border border-line bg-elevated text-primary">
        <Icon size={17} aria-hidden="true" />
      </span>
      <p className="text-[clamp(1.05rem,0.95rem+0.5vw,1.35rem)] leading-tight font-semibold tracking-tight text-fg">{stat.value}</p>
      <p className="mt-1 text-[13px] text-muted">{stat.label}</p>
    </div>
  )
}
