import { useEffect, useState } from 'react'
import type { SectionId } from '@/types'

/**
 * Tracks which section is in view: the last section whose top has passed
 * 40% of the viewport, or the final section once the page bottom is reached
 * (short closing sections can never scroll up to the top).
 */
export function useActiveSection(ids: SectionId[], enabled: boolean) {
  const [active, setActive] = useState<SectionId>(ids[0])

  useEffect(() => {
    if (!enabled) return
    let frame = 0

    const update = () => {
      frame = 0
      const doc = document.documentElement
      if (window.innerHeight + window.scrollY >= doc.scrollHeight - 4) {
        setActive(ids[ids.length - 1])
        return
      }
      const line = window.innerHeight * 0.4
      let current = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      setActive(current)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [ids, enabled])

  return active
}
