import type { ReactNode } from 'react'
import type { SectionId } from '@/types'
import { cn } from '@/lib/utils'
import { Reveal } from './Reveal'

/** Anchorable page section. tabIndex=-1 lets navigation move focus here. */
export function Section({ id, children, className }: { id: SectionId; children: ReactNode; className?: string }) {
  return (
    <section id={id} data-section aria-labelledby={`${id}-title`} tabIndex={-1} className={cn('outline-none', className)}>
      <Reveal>{children}</Reveal>
    </section>
  )
}
