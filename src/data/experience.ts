import type { ExperienceEntry } from '@/types'

/**
 * Employment history.
 * TODO: add `company`, `period` (e.g. 'Jan 2022 – Present') and `location`
 * for each role. They are optional and hidden until filled in.
 * Add more entries (newest first) for additional roles.
 */
export const experience: ExperienceEntry[] = [
  {
    role: 'Flutter Developer',
    company: '',
    period: '',
    duration: '3+ years',
    summary:
      'Building and shipping cross-platform mobile applications across food delivery, trading, travel, doorstep services, astrology, and transportation.',
    responsibilities: [
      'Cross-platform app development with Flutter and Dart',
      'UI implementation from designs into responsive, reusable widgets',
      'REST API integration and data handling',
      'State management across complex app flows',
      'Debugging and performance improvements',
      'Release support',
    ],
    practices: ['Clean architecture', 'Reusable widgets', 'Maintainable code', 'Responsive design', 'Collaboration with backend teams'],
  },
]
