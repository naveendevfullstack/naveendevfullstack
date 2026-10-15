import { useState } from 'react'
import { ClipboardList, X } from 'lucide-react'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { experience } from '@/data/experience'
import { education } from '@/data/education'
import { useResume } from '@/hooks/useResume'

/**
 * Development-only reminder of content that still needs real values.
 * Never rendered in production builds.
 */
export function SetupChecklist() {
  const [open, setOpen] = useState(false)
  const resume = useResume()

  const missing = [
    !profile.email && 'Email address (src/data/profile.ts)',
    !profile.githubUrl && 'GitHub URL (src/data/profile.ts)',
    !profile.linkedinUrl && 'LinkedIn URL (src/data/profile.ts)',
    !profile.location && 'Location, optional (src/data/profile.ts)',
    !profile.profileImage && 'Profile photo, optional (src/data/profile.ts)',
    resume.status === 'missing' && 'Resume PDF (public/resume.pdf)',
    experience.some((e) => !e.company || !e.period) && 'Employer name and dates (src/data/experience.ts)',
    education.length === 0 && 'Education entries (src/data/education.ts)',
    projects.some((p) => !p.screenshots?.length) && 'Real project screenshots, optional (src/data/projects.ts)',
    !import.meta.env.VITE_CONTACT_ENDPOINT && 'Contact form endpoint, optional (VITE_CONTACT_ENDPOINT)',
  ].filter((x): x is string => Boolean(x))

  if (!missing.length) return null

  return (
    <div className="fixed right-4 bottom-4 z-50 max-w-[calc(100vw-2rem)]">
      {open ? (
        <div className="w-80 max-w-full rounded-2xl border border-amber-400/40 bg-card p-4 text-sm shadow-2xl">
          <div className="mb-2 flex items-center justify-between">
            <p className="font-semibold text-fg">Setup checklist (dev only)</p>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close checklist" className="rounded-md p-1 text-muted hover:text-fg">
              <X size={16} aria-hidden="true" />
            </button>
          </div>
          <p className="mb-3 text-[12.5px] text-muted">These are hidden or disabled until you add real values. This panel never appears in production.</p>
          <ul className="space-y-1.5 text-[12.5px] text-muted">
            {missing.map((m) => (
              <li key={m} className="flex gap-2">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber-400" aria-hidden="true" />
                {m}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-card px-3.5 py-2 text-[12.5px] font-medium text-amber-600 shadow-lg dark:text-amber-300"
        >
          <ClipboardList size={15} aria-hidden="true" />
          {missing.length} setup items
        </button>
      )}
    </div>
  )
}
