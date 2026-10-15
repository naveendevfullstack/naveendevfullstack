import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToSection } from '@/hooks/useSectionNav'
import { usePageTitle } from '@/hooks/usePageTitle'
import { HeroSection } from '@/sections/HeroSection'
import { StatsSection } from '@/sections/StatsSection'
import { ProfileRail } from '@/sections/ProfileRail'
import { AboutSection } from '@/sections/AboutSection'
import { ExperienceSection } from '@/sections/ExperienceSection'
import { ProjectsSection } from '@/sections/ProjectsSection'
import { SkillsSection } from '@/sections/SkillsSection'
import { EducationSection } from '@/sections/EducationSection'
import { ContactSection } from '@/sections/ContactSection'

export default function HomePage() {
  const { hash } = useLocation()
  usePageTitle()

  // Arriving from another route with a hash (e.g. /#contact): scroll once on mount.
  useEffect(() => {
    if (!hash) return
    const id = decodeURIComponent(hash.slice(1))
    requestAnimationFrame(() => scrollToSection(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="mx-auto w-full max-w-[1480px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <section id="overview" data-section aria-label="Overview" tabIndex={-1} className="space-y-4 outline-none">
        <HeroSection />
        <StatsSection />
      </section>

      <div className="mt-10 grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_300px] xl:gap-8">
        <div className="min-w-0 space-y-20 sm:space-y-24">
          {/* On smaller screens the rail becomes stacked cards after the overview. */}
          <div className="xl:hidden">
            <ProfileRail />
          </div>
          <AboutSection />
          <ExperienceSection />
          <ProjectsSection />
          <SkillsSection />
          <EducationSection />
          <ContactSection />
        </div>
        <aside aria-label="Profile summary" className="hidden xl:block">
          <div className="sticky top-24">
            <ProfileRail />
          </div>
        </aside>
      </div>
    </div>
  )
}
