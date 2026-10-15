import { profile } from '@/data/profile'
import { asset, cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative grid size-10 shrink-0 place-items-center rounded-xl border border-line-strong bg-card font-mono text-sm font-semibold tracking-tight',
        className,
      )}
    >
      <span className="absolute inset-0 rounded-xl bg-[linear-gradient(135deg,var(--primary),var(--accent))] opacity-15" />
      <span className="relative text-fg">
        {profile.initials[0]}
        <span className="text-gradient">{profile.initials.slice(1)}</span>
      </span>
    </span>
  )
}

export function Avatar({ size = 'lg' }: { size?: 'md' | 'lg' }) {
  const dims = size === 'lg' ? 'size-20 text-2xl' : 'size-12 text-base'
  return (
    <div className={cn('relative shrink-0 rounded-2xl bg-[linear-gradient(135deg,var(--primary),var(--accent))] p-px', dims)}>
      {profile.profileImage ? (
        <img
          src={asset(profile.profileImage)}
          alt={`Portrait of ${profile.name}`}
          width={160}
          height={160}
          className="size-full rounded-[15px] object-cover"
        />
      ) : (
        <div aria-hidden="true" className="grid size-full place-items-center rounded-[15px] bg-card font-semibold tracking-tight">
          <span className="text-gradient">{profile.initials}</span>
        </div>
      )}
    </div>
  )
}
