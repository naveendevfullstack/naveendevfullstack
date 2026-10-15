import { GraduationCap } from 'lucide-react'
import { education } from '@/data/education'
import { showEducation } from '@/data/navigation'
import { Section } from '@/components/common/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Badge } from '@/components/common/Badge'

export function EducationSection() {
  if (!showEducation) return null

  return (
    <Section id="education">
      <SectionHeading id="education" eyebrow="Education" title="Education" />
      {education.length ? (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {education.map((e) => (
            <li key={`${e.qualification}-${e.year}`} className="card flex gap-4 p-5">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-elevated text-primary">
                <GraduationCap size={18} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h3 className="font-semibold text-fg">{e.qualification}</h3>
                <p className="mt-0.5 text-sm text-muted">{e.institution}</p>
                <p className="mt-1 font-mono text-[12px] text-subtle">{e.year}</p>
                {e.coursework?.length ? (
                  <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Relevant coursework">
                    {e.coursework.map((c) => (
                      <li key={c}>
                        <Badge>{c}</Badge>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        // Dev-only state: production hides this section until data exists.
        <div className="card border-dashed border-amber-400/40 p-6 text-sm text-muted">
          <p className="font-medium text-fg">Education details not added yet</p>
          <p className="mt-1">
            Add entries in <code className="font-mono text-[12.5px] text-fg">src/data/education.ts</code>. This placeholder only appears
            during development; the section is hidden in production until real data exists.
          </p>
        </div>
      )}
    </Section>
  )
}
