import * as m from 'motion/react-m'
import type { Project } from '@/types'
import { ProjectCard } from '@/components/common/ProjectCard'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <m.ul
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-3"
    >
      {projects.map((p) => (
        <m.li key={p.slug} variants={item}>
          <ProjectCard project={p} />
        </m.li>
      ))}
    </m.ul>
  )
}
