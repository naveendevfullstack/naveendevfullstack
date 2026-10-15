import { Briefcase, CheckCircle2 } from 'lucide-react'
import { experience } from '@/data/experience'
import { Section } from '@/components/common/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Badge } from '@/components/common/Badge'

export function ExperienceSection() {
  return (
    <Section id="experience">
      <SectionHeading id="experience" eyebrow="Experience" title="Professional experience" />

      <ol className="relative space-y-6 border-l border-line pl-6 sm:pl-8">
        {experience.map((job) => (
          <li key={`${job.role}-${job.company}-${job.period}`} className="relative">
            <span
              className="absolute top-5 -left-[41px] grid size-8 place-items-center rounded-full border border-line-strong bg-card text-primary sm:-left-[49px]"
              aria-hidden="true"
            >
              <Briefcase size={15} />
            </span>
            <article className="card p-5 sm:p-7">
              <header className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-fg">{job.role}</h3>
                  {(job.company || job.location) && (
                    <p className="mt-0.5 text-sm text-muted">{[job.company, job.location].filter(Boolean).join(' · ')}</p>
                  )}
                </div>
                <p className="shrink-0 font-mono text-[12.5px] text-subtle">{job.period || job.duration}</p>
              </header>
              <p className="mt-4 text-[14.5px] leading-relaxed text-muted">{job.summary}</p>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-[1.4fr_1fr]">
                <div>
                  <h4 className="mb-3 text-[13px] font-semibold text-fg">Responsibilities</h4>
                  <ul className="space-y-2">
                    {job.responsibilities.map((r) => (
                      <li key={r} className="flex gap-2.5 text-[13.5px] leading-relaxed text-muted">
                        <CheckCircle2 size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-success" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-3 text-[13px] font-semibold text-fg">Engineering practices</h4>
                  <ul className="flex flex-wrap gap-1.5">
                    {job.practices.map((p) => (
                      <li key={p}>
                        <Badge>{p}</Badge>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </Section>
  )
}
