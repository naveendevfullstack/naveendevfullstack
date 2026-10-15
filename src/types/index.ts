import type { LucideIcon } from 'lucide-react'

export type SectionId = 'overview' | 'about' | 'experience' | 'projects' | 'skills' | 'education' | 'contact'

export interface NavItem {
  id: SectionId
  label: string
  icon: LucideIcon
}

export interface Profile {
  name: string
  initials: string
  title: string
  tagline: string
  headline: string
  intro: string
  summary: string[]
  yearsOfExperience: string
  /** Leave empty to hide. */
  email: string
  githubUrl: string
  linkedinUrl: string
  location: string
  /** Leave empty to show the initials avatar instead. */
  profileImage: string
  availability: { open: boolean; label: string }
  resume: { path: string; downloadName: string }
}

export type SocialKind = 'github' | 'linkedin' | 'email'

export interface SocialLink {
  kind: SocialKind
  label: string
  href: string
  display: string
}

export interface Stat {
  value: string
  label: string
  icon: LucideIcon
}

/** Drives the generated illustrative mockup when no real screenshot exists. */
export type ProjectArtKind = 'food' | 'trading' | 'travel' | 'carwash' | 'astrology' | 'ride'

export interface ProjectWorkflow {
  title: string
  steps: string[]
}

export interface Project {
  slug: string
  name: string
  category: string
  description: string
  overview: string
  problem: string
  features: string[]
  workflows?: ProjectWorkflow[]
  tech: string[]
  /** Only add what is confirmed. Hidden when empty. */
  responsibilities?: string[]
  challenges?: string[]
  /** Real screenshots in /public/images/projects. Mockups are used otherwise. */
  screenshots?: { src: string; alt: string }[]
  repoUrl?: string
  liveUrl?: string
  /** Optional, only if accurate, e.g. "2024". */
  date?: string
  art: ProjectArtKind
  accent: string
}

export interface SkillGroup {
  title: string
  description: string
  icon: LucideIcon
  skills: string[]
}

export interface ExperienceEntry {
  role: string
  /** Leave empty until confirmed; the UI hides it. */
  company?: string
  period?: string
  location?: string
  duration: string
  summary: string
  responsibilities: string[]
  practices: string[]
}

export interface EducationEntry {
  qualification: string
  institution: string
  year: string
  coursework?: string[]
}
