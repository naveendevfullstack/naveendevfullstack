export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

/** Resolves a /public asset against the deploy base path (GitHub Pages safe). */
export function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}

export const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad|iPod/i.test(navigator.userAgent)

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
