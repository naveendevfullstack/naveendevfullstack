import { useEffect, useRef } from 'react'
import { AnimatePresence } from 'motion/react'
import * as m from 'motion/react-m'
import { X } from 'lucide-react'
import type { SectionId } from '@/types'
import { ResumeButton } from '@/components/common/ResumeButton'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { SidebarContent } from './SidebarContent'

interface Props {
  open: boolean
  onClose: () => void
  active: SectionId | null
}

export function MobileNavigation({ open, onClose, active }: Props) {
  useBodyScrollLock(open)
  return <AnimatePresence>{open && <Drawer onClose={onClose} active={active} />}</AnimatePresence>
}

function Drawer({ onClose, active }: Omit<Props, 'open'>) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    panelRef.current?.querySelector<HTMLElement>('button, a')?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key !== 'Tab' || !panelRef.current) return
      // Keep Tab focus inside the drawer.
      const focusable = panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      if (previous && document.contains(previous) && !document.activeElement?.closest('[data-section]')) {
        previous.focus({ preventScroll: true })
      }
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <m.div
        className="absolute inset-0 bg-overlay backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
      />
      <m.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        className="absolute inset-y-0 left-0 flex w-[min(300px,86vw)] flex-col border-r border-line bg-sidebar shadow-2xl"
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ type: 'spring', stiffness: 420, damping: 42 }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation"
          className="absolute top-5 right-4 z-10 grid size-10 place-items-center rounded-lg text-muted hover:bg-elevated hover:text-fg"
        >
          <X size={18} aria-hidden="true" />
        </button>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <SidebarContent active={active} onNavigate={onClose} layoutKey="drawer" />
        </div>
        <div className="border-t border-line p-4">
          <ResumeButton className="w-full" />
        </div>
      </m.div>
    </div>
  )
}
