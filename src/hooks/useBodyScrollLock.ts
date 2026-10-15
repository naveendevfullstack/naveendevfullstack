import { useEffect } from 'react'

/**
 * Locks page scroll while an overlay is open. Tied to the open flag (not to
 * mount) so scrolling is released the moment the overlay starts closing;
 * resetting overflow later would cancel any smooth scroll already started.
 */
export function useBodyScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = overflow
    }
  }, [active])
}
