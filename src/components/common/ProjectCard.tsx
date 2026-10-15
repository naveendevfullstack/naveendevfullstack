import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Project } from '@/types'
import { ProjectMedia } from '@/components/projects/ProjectMedia'
import { GithubIcon } from './BrandIcons'
import { Badge } from './Badge'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card group relative flex h-full flex-col overflow-hidden transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_24px_48px_-24px_rgb(0_0_0/0.55)]">
      <ProjectMedia project={project} className="border-b border-line" />
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2">
          <span className="size-2 rounded-full" style={{ background: project.accent }} aria-hidden="true" />
          <p className="font-mono text-[11.5px] tracking-wide text-subtle uppercase">{project.category}</p>
        </div>
        <h3 className="text-lg font-semibold tracking-tight text-fg">{project.name}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{project.description}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.tech.map((t) => (
            <li key={t}>
              <Badge>{t}</Badge>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between gap-2 pt-5">
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 rounded-lg text-sm font-medium text-fg transition-colors after:absolute after:inset-0 after:content-[''] hover:text-primary"
          >
            View Details
            <span className="sr-only"> for {project.name}</span>
            <ArrowUpRight size={16} aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <div className="relative z-10 flex gap-1">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} source code on GitHub`}
                className="grid size-9 place-items-center rounded-lg text-muted hover:bg-elevated hover:text-fg"
              >
                <GithubIcon size={16} />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} live demo`}
                className="grid size-9 place-items-center rounded-lg text-muted hover:bg-elevated hover:text-fg"
              >
                <ExternalLink size={16} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
