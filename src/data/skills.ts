import { Boxes, Server, Smartphone, Wrench, Globe } from 'lucide-react'
import type { SkillGroup } from '@/types'

// VERIFY: remove anything you would not be comfortable discussing in an interview.
export const skillGroups: SkillGroup[] = [
  {
    title: 'Mobile Development',
    description: 'Cross-platform apps for Android, iOS, and the web',
    icon: Smartphone,
    skills: ['Flutter', 'Dart', 'Responsive UI', 'State Management', 'Riverpod'],
  },
  {
    title: 'Frontend',
    description: 'Web interfaces and tooling',
    icon: Globe,
    skills: ['React', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'Tailwind CSS'],
  },
  {
    title: 'Backend & API Integration',
    description: 'Connecting apps to services and data',
    icon: Server,
    skills: ['REST APIs', 'Dio', 'Retrofit', 'JSON Serialization', 'Node.js'],
  },
  {
    title: 'Architecture & Engineering',
    description: 'Code that stays maintainable as products grow',
    icon: Boxes,
    skills: ['Clean Architecture', 'MVVM', 'Repository Pattern', 'Dependency Injection', 'Reusable Components', 'Error Handling'],
  },
  {
    title: 'Tools & Services',
    description: 'Day-to-day development workflow',
    icon: Wrench,
    skills: ['Git', 'GitHub', 'Firebase', 'Android Studio', 'VS Code', 'Xcode', 'Postman'],
  },
]
