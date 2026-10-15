import { projects } from '@/data/projects'
import { Section } from '@/components/common/Section'
import { SectionHeading } from '@/components/common/SectionHeading'
import { ProjectGrid } from '@/components/projects/ProjectGrid'
import { CapabilityMatrix } from '@/components/projects/CapabilityMatrix'

export function ProjectsSection() {
  return (
    <Section id="projects">
      <SectionHeading
        id="projects"
        eyebrow="Featured projects"
        title="Products across six domains"
        description="Food delivery, trading, travel, doorstep services, astrology and transportation, each built with Flutter."
      />
      <ProjectGrid projects={projects} />
      <div className="mt-8">
        <CapabilityMatrix />
      </div>
    </Section>
  )
}
