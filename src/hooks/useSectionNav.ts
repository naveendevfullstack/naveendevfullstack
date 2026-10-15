import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { SectionId } from '@/types'
import { prefersReducedMotion } from '@/lib/utils'

export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return false
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
  // Move focus for keyboard and screen-reader users without a second jump.
  el.focus({ preventScroll: true })
  return true
}

/** Navigates to a section, from the overview page or any other route. */
export function useSectionNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return useCallback(
    (id: SectionId) => {
      if (pathname === '/') {
        scrollToSection(id)
        navigate({ hash: id === 'overview' ? '' : id }, { replace: true, preventScrollReset: true })
      } else {
        navigate(id === 'overview' ? '/' : `/#${id}`)
      }
    },
    [navigate, pathname],
  )
}
