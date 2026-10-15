import { Code2, Layers, MonitorSmartphone, Sparkles } from 'lucide-react'
import type { Profile, SocialLink, Stat } from '@/types'
import { projects } from './projects'

/**
 * ───────────────────────────────────────────────────────────────
 *  Single source of truth for personal details.
 *  Fields marked TODO were not provided. Empty strings are hidden
 *  in production and listed in the dev-only setup checklist.
 * ───────────────────────────────────────────────────────────────
 */
export const profile: Profile = {
  name: 'Naveen M.',
  initials: 'NM',
  title: 'Flutter Developer',
  tagline: "Let's build something meaningful.",
  headline: 'Flutter Developer | Mobile & Web Applications',
  intro:
    'I build beautiful, scalable, and high-performance mobile and web applications with Flutter, Dart, and modern backend technologies. I enjoy transforming ideas into reliable products through clean architecture, thoughtful UI, and maintainable code.',
  summary: [
    'I am a Flutter developer with 3+ years of experience building mobile and cross-platform applications. My work includes food delivery, trading, travel assistance, doorstep services, astrology, and transportation applications.',
    'I focus on building maintainable applications using clean architecture, reusable components, effective state management, API integration, and responsive UI design. I enjoy solving practical engineering problems and collaborating with backend and product teams to deliver reliable features.',
  ],
  yearsOfExperience: '3+',

  email: '', // TODO: e.g. 'naveen@example.com'
  githubUrl: '', // TODO: e.g. 'https://github.com/your-username'
  linkedinUrl: '', // TODO: e.g. 'https://www.linkedin.com/in/your-handle'
  location: '', // TODO (optional): e.g. 'Chennai, India'
  profileImage: '', // TODO (optional): e.g. '/images/profile.jpg'

  // Set open: false to hide the availability indicator.
  availability: { open: true, label: 'Open to opportunities' },

  // Drop the real file at public/resume.pdf. The button stays disabled until it exists.
  resume: { path: 'resume.pdf', downloadName: 'Naveen-M-Flutter-Developer-Resume.pdf' },
}

export const socialLinks: SocialLink[] = [
  { kind: 'github' as const, label: 'GitHub', href: profile.githubUrl, display: stripProtocol(profile.githubUrl) },
  { kind: 'linkedin' as const, label: 'LinkedIn', href: profile.linkedinUrl, display: stripProtocol(profile.linkedinUrl) },
  { kind: 'email' as const, label: 'Email', href: profile.email ? `mailto:${profile.email}` : '', display: profile.email },
].filter((link) => link.href)

export const stats: Stat[] = [
  { value: `${profile.yearsOfExperience} Years`, label: 'Professional experience', icon: Sparkles },
  { value: String(projects.length), label: 'Featured projects', icon: Layers },
  { value: 'Flutter & Dart', label: 'Primary technologies', icon: Code2 },
  { value: 'Mobile · Tablet · Web', label: 'Development', icon: MonitorSmartphone },
]

function stripProtocol(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
}

/** About section cards. Phrased from the summary above; edit freely. */
export const about = {
  philosophy: [
    { title: 'Architecture first', text: 'Clear layers and boundaries keep features easy to change long after launch.' },
    { title: 'Reusable by default', text: 'Shared widgets and components keep the UI consistent and the codebase lean.' },
    { title: 'Built with the team', text: 'Close work with backend and product teams so features ship reliably.' },
  ],
  strengths: [
    'Clean architecture',
    'Reusable components',
    'State management',
    'API integration',
    'Responsive UI design',
    'Practical problem solving',
  ],
  interests: ['Cross-platform product development', 'Scalable app architecture', 'Thoughtful, responsive UI', 'Solving practical engineering problems'],
}
