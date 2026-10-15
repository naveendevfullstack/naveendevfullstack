import type { ReactNode } from 'react'

interface Props {
  id: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
}

export function SectionHeading({ id, eyebrow, title, description, action }: Props) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="mb-2 font-mono text-xs font-medium tracking-[0.18em] text-primary uppercase">{eyebrow}</p>
        <h2 id={`${id}-title`} className="text-[clamp(1.6rem,1.2rem+1.4vw,2.25rem)] leading-tight font-semibold tracking-tight text-fg">
          {title}
        </h2>
        {description && <p className="mt-3 text-[15px] leading-relaxed text-muted">{description}</p>}
      </div>
      {action}
    </div>
  )
}
