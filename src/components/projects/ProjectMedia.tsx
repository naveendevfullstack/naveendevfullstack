import type { Project } from '@/types'
import { asset, cn } from '@/lib/utils'
import { ProjectArt } from './ProjectArt'

/** Real screenshot when configured, otherwise the labelled illustrative mockup. */
export function ProjectMedia({ project, className, eager }: { project: Project; className?: string; eager?: boolean }) {
  const shot = project.screenshots?.[0]
  return (
    <div className={cn('relative aspect-[16/10] overflow-hidden bg-[#080D19]', className)}>
      {shot ? (
        <img
          src={asset(shot.src)}
          alt={shot.alt}
          width={1280}
          height={800}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      ) : (
        <>
          <ProjectArt project={project} className="size-full transition-transform duration-500 group-hover:scale-[1.03]" />
          <span className="absolute top-3 left-3 rounded-md border border-white/10 bg-black/45 px-2 py-0.5 font-mono text-[11px] tracking-wide text-white/75 backdrop-blur-sm">
            Illustrative mockup
          </span>
        </>
      )}
    </div>
  )
}
