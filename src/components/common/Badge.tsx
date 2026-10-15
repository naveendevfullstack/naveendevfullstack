import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-line bg-elevated/70 px-2 py-0.5 font-mono text-[11.5px] leading-5 text-muted',
        className,
      )}
    >
      {children}
    </span>
  )
}
