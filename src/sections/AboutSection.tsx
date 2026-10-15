import { Compass, Lightbulb, Target } from 'lucide-react'
import { about, profile } from '@/data/profile'
import { Section } from '@/components/common/Section'
import { SectionHeading } from '@/components/common/SectionHeading'

export function AboutSection() {
  return (
    <Section id="about">
      <SectionHeading id="about" eyebrow="About" title="Engineering reliable products, one clean layer at a time." />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
        <div className="card p-6 sm:p-7 lg:col-span-3">
          <div className="space-y-4 text-[15px] leading-relaxed text-muted">
            {profile.summary.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
        </div>

        <div className="card p-6 lg:col-span-2">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-fg">
            <Target size={16} className="text-primary" aria-hidden="true" />
            Core strengths
          </h3>
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2">
            {about.strengths.map((s) => (
              <li key={s} className="flex items-center gap-2.5 rounded-lg border border-line bg-elevated/50 px-3 py-2 text-[13.5px] text-fg">
                <span className="size-1.5 shrink-0 rounded-full bg-[linear-gradient(var(--primary),var(--accent))]" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="card p-6">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-fg">
            <Compass size={16} className="text-primary" aria-hidden="true" />
            Development philosophy
          </h3>
          <ol className="space-y-4">
            {about.philosophy.map((p, i) => (
              <li key={p.title} className="flex gap-3">
                <span className="mt-0.5 font-mono text-[12px] text-subtle" aria-hidden="true">
                  0{i + 1}
                </span>
                <div>
                  <p className="text-sm font-medium text-fg">{p.title}</p>
                  <p className="mt-0.5 text-[13.5px] leading-relaxed text-muted">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="card p-6">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-fg">
            <Lightbulb size={16} className="text-primary" aria-hidden="true" />
            Areas of interest
          </h3>
          <ul className="space-y-2.5">
            {about.interests.map((i) => (
              <li key={i} className="flex items-center justify-between gap-3 border-b border-line pb-2.5 text-[13.5px] text-muted last:border-0 last:pb-0">
                {i}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
