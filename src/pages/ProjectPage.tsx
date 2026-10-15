import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import * as m from 'motion/react-m'
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, Layers, Lightbulb, Target, Users, Wrench } from 'lucide-react'
import { getProject, projects } from '@/data/projects'
import { usePageTitle } from '@/hooks/usePageTitle'
import { asset } from '@/lib/utils'
import { Badge } from '@/components/common/Badge'
import { ButtonAnchor, ButtonLink } from '@/components/common/Button'
import { GithubIcon } from '@/components/common/BrandIcons'
import { ProjectArt } from '@/components/projects/ProjectArt'
import { ProjectMedia } from '@/components/projects/ProjectMedia'
import NotFoundPage from './NotFoundPage'
import type { ReactNode } from 'react'

export default function ProjectPage() {
  const { slug = '' } = useParams()
  const project = getProject(slug)
  usePageTitle(project?.name ?? 'Project not found')

  useEffect(() => {
    window.scrollTo({ top: 0 })
    document.getElementById('project-title')?.focus({ preventScroll: true })
  }, [slug])

  if (!project) return <NotFoundPage />

  const index = projects.indexOf(project)
  const next = projects[(index + 1) % projects.length]
  const prev = projects[(index - 1 + projects.length) % projects.length]

  return (
    <m.article
      key={project.slug}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-[1180px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8"
    >
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-muted">
          <li>
            <Link to="/#projects" className="inline-flex items-center gap-1.5 rounded hover:text-fg">
              <ArrowLeft size={15} aria-hidden="true" /> Projects
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="truncate text-fg">
            {project.name}
          </li>
        </ol>
      </nav>

      <header className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
        <div>
          <div className="mb-3 flex items-center gap-2">
            <span className="size-2 rounded-full" style={{ background: project.accent }} aria-hidden="true" />
            <p className="font-mono text-xs tracking-[0.16em] text-subtle uppercase">{project.category}</p>
          </div>
          <h1 id="project-title" tabIndex={-1} className="text-[clamp(2.2rem,1.5rem+3vw,3.5rem)] leading-none font-bold tracking-tight outline-none">
            {project.name}
          </h1>
          <p className="mt-5 text-[15.5px] leading-relaxed text-muted">{project.overview}</p>
          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
            {project.tech.map((t) => (
              <li key={t}>
                <Badge>{t}</Badge>
              </li>
            ))}
          </ul>
          {(project.repoUrl || project.liveUrl) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {project.liveUrl && (
                <ButtonAnchor href={project.liveUrl}>
                  <ExternalLink size={16} aria-hidden="true" /> Live demo
                </ButtonAnchor>
              )}
              {project.repoUrl && (
                <ButtonAnchor href={project.repoUrl} variant="secondary">
                  <GithubIcon size={16} /> Source code
                </ButtonAnchor>
              )}
            </div>
          )}
        </div>
        <div className="card overflow-hidden">
          <ProjectMedia project={project} eager />
        </div>
      </header>

      <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
        <DetailCard icon={<Target size={16} />} title="The problem">
          <p className="text-[14.5px] leading-relaxed text-muted">{project.problem}</p>
        </DetailCard>
        <DetailCard icon={<Layers size={16} />} title="Features">
          <List items={project.features} />
        </DetailCard>
      </div>

      {project.workflows?.length ? (
        <section className="mt-4 card p-6" aria-labelledby="workflows-title">
          <h2 id="workflows-title" className="mb-5 flex items-center gap-2 text-sm font-semibold text-fg">
            <Users size={16} className="text-primary" aria-hidden="true" /> Workflows
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {project.workflows.map((w) => (
              <div key={w.title}>
                <h3 className="mb-3 text-[13px] font-semibold tracking-wide text-muted uppercase">{w.title}</h3>
                <ol className="space-y-3">
                  {w.steps.map((s, i) => (
                    <li key={s} className="flex gap-3 text-[14px] text-fg">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full border border-line-strong font-mono text-[11px] text-muted">
                        {i + 1}
                      </span>
                      <span className="pt-0.5">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <DetailCard icon={<Wrench size={16} />} title="Technology stack">
          <ul className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <li key={t} className="rounded-lg border border-line bg-elevated/60 px-2.5 py-1 text-[13px] text-fg">
                {t}
              </li>
            ))}
          </ul>
        </DetailCard>
        {project.responsibilities?.length ? (
          <DetailCard icon={<CheckCircle2 size={16} />} title="My responsibilities">
            <List items={project.responsibilities} />
          </DetailCard>
        ) : null}
        {project.challenges?.length ? (
          <DetailCard icon={<Lightbulb size={16} />} title="Challenges & decisions">
            <List items={project.challenges} />
          </DetailCard>
        ) : null}
      </div>

      <section className="mt-12" aria-labelledby="gallery-title">
        <h2 id="gallery-title" className="mb-4 text-lg font-semibold tracking-tight">
          {project.screenshots?.length ? 'Screenshots' : 'Illustrative mockup'}
        </h2>
        {project.screenshots?.length ? (
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {project.screenshots.map((s) => (
              <li key={s.src} className="card overflow-hidden">
                <img src={asset(s.src)} alt={s.alt} loading="lazy" decoding="async" className="w-full object-cover" />
              </li>
            ))}
          </ul>
        ) : (
          <figure className="card overflow-hidden">
            <ProjectArt project={project} className="aspect-[16/10] w-full" />
            <figcaption className="border-t border-line px-5 py-3 text-[13px] text-subtle">
              An original illustration of the product category, not a screenshot of the {project.name} app.
            </figcaption>
          </figure>
        )}
      </section>

      <nav aria-label="More projects" className="mt-12 grid grid-cols-1 gap-3 border-t border-line pt-8 sm:grid-cols-2">
        <ButtonLink to={`/projects/${prev.slug}`} variant="secondary" size="lg" className="justify-between">
          <ArrowLeft size={16} aria-hidden="true" />
          <span className="truncate">
            <span className="sr-only">Previous project: </span>
            {prev.name}
          </span>
        </ButtonLink>
        <ButtonLink to={`/projects/${next.slug}`} variant="secondary" size="lg" className="justify-between">
          <span className="truncate">
            <span className="sr-only">Next project: </span>
            {next.name}
          </span>
          <ArrowRight size={16} aria-hidden="true" />
        </ButtonLink>
      </nav>
    </m.article>
  )
}

function DetailCard({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <section className="card p-6">
      <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-fg">
        <span className="text-primary" aria-hidden="true">
          {icon}
        </span>
        {title}
      </h2>
      {children}
    </section>
  )
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((i) => (
        <li key={i} className="flex gap-2.5 text-[14px] text-muted">
          <CheckCircle2 size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-success" />
          {i}
        </li>
      ))}
    </ul>
  )
}
