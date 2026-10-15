import type { Project } from '@/types'

/**
 * Featured projects. Content is limited to what has been confirmed.
 * Before publishing, check every `tech` entry (marked VERIFY where the
 * brief said "where applicable"), and add only confirmed:
 *   responsibilities, challenges, screenshots, repoUrl, liveUrl, date.
 * Fields left empty are hidden.
 */
export const projects: Project[] = [
  {
    slug: 'eatcircle',
    name: 'EatCircle',
    category: 'Food Delivery',
    description:
      'A food delivery application focused on browsing food options, managing orders, and providing a smooth customer experience.',
    overview:
      'EatCircle is a food delivery application built around three things customers care about: finding something to eat quickly, placing an order with confidence, and keeping track of it afterwards.',
    problem:
      'Ordering food should take a few taps. When browsing is cluttered or order status is unclear, customers lose confidence and drop off.',
    features: ['Browse food options', 'Order management', 'Customer-focused ordering experience'],
    tech: ['Flutter', 'Dart', 'Node.js', 'REST APIs'],
    art: 'food',
    accent: '#F97316',
  },
  {
    slug: 'tita-center',
    name: 'Tita Center',
    category: 'Trading',
    description:
      'A trading-focused application designed around financial information, portfolio-related workflows, and a responsive user experience.',
    overview:
      'Tita Center is a trading-focused application that presents financial information and portfolio-related workflows in an interface that stays responsive and easy to read.',
    problem:
      'Financial information is dense. The interface has to keep it readable and the workflows predictable without overwhelming the user.',
    features: ['Financial information views', 'Portfolio-related workflows', 'Responsive user experience'],
    tech: ['Flutter', 'Dart', 'REST APIs', 'State Management'],
    art: 'trading',
    accent: '#22C55E',
  },
  {
    slug: 'snerdl',
    name: 'Snerdl',
    category: 'Travel Assistance',
    description:
      'A travel assistance application supporting reminders, booking-related workflows, location-aware assistance, and travel coordination.',
    overview:
      'Snerdl helps travellers stay on top of their plans, with reminders, booking-related workflows, location-aware assistance, and tools for coordinating a trip.',
    problem:
      'Trips involve many moving parts: bookings, times, and places. Travellers need timely reminders and context-aware help in one place.',
    features: ['Reminders', 'Booking-related workflows', 'Location-aware assistance', 'Travel coordination'],
    tech: ['Flutter', 'Dart', 'REST APIs', 'Notifications'],
    art: 'travel',
    accent: '#06B6D4',
  },
  {
    slug: 'decode',
    name: 'Decode',
    category: 'Doorstep Car Wash',
    description:
      'A doorstep car-wash platform supporting vehicle management, one-time bookings, subscription wash plans, service scheduling, and booking updates.',
    overview:
      'Decode brings car washing to the customer’s doorstep. Customers manage their vehicles and choose between one-time bookings and subscription wash plans, and service agents handle scheduled jobs.',
    problem:
      'Doorstep services depend on coordination. Customers need a simple way to book and track washes, and the service side needs a clear view of scheduled work.',
    features: [
      'Vehicle management',
      'One-time bookings',
      'Subscription wash plans',
      'Service scheduling',
      'Booking updates',
    ],
    workflows: [
      {
        title: 'Customer',
        steps: ['Add and manage vehicles', 'Book a one-time wash or choose a subscription plan', 'Pick a service slot', 'Receive booking updates'],
      },
      {
        title: 'Service agent',
        steps: ['View scheduled services', 'Carry out doorstep washes', 'Update booking status'],
      },
    ],
    tech: ['Flutter', 'Dart', 'REST APIs', 'Push Notifications'], // VERIFY: Firebase / push notifications
    art: 'carwash',
    accent: '#3B82F6',
  },
  {
    slug: 'pkg-astro-talk',
    name: 'PKG Astro Talk',
    category: 'Astrology & Consultation',
    description:
      'An astrology-focused application featuring consultation workflows, astrology-related content, AI-powered insights, and interactive communication experiences.',
    overview:
      'PKG Astro Talk is an astrology-focused application that combines consultation workflows and astrology-related content with AI-powered insights and interactive communication.',
    problem:
      'Users want guidance that feels personal and immediate, which means pairing content with real conversations in a single app.',
    features: [
      'Consultation workflows',
      'Astrology-related content',
      'AI-powered insights',
      'Interactive communication experiences',
    ],
    tech: ['Flutter', 'Dart', 'REST APIs', 'Audio Integration'],
    art: 'astrology',
    accent: '#A855F7',
  },
  {
    slug: 'y-ride',
    name: 'Y Ride',
    category: 'Taxi & Transportation',
    description: 'A transportation application focused on ride-related workflows and an intuitive mobile experience.',
    overview: 'Y Ride is a transportation application centred on ride-related workflows, designed to feel intuitive on mobile.',
    problem: 'Getting a ride should be quick and predictable. Every step of the flow needs to be clear on a small screen.',
    features: ['Ride-related workflows', 'Intuitive mobile experience'],
    tech: ['Flutter', 'Dart', 'REST APIs', 'Maps'], // VERIFY: maps integration
    art: 'ride',
    accent: '#EAB308',
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)

/** Subset (and order) shown in the "Latest work" list. */
export const latestWork = projects
