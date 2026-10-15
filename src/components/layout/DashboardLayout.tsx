import { useCallback, useEffect, useMemo, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { navItems } from '@/data/navigation'
import { useActiveSection } from '@/hooks/useActiveSection'
import { PaletteContext } from '@/hooks/useCommandPalette'
import { CommandPalette } from '@/components/common/CommandPalette'
import { SetupChecklist } from '@/components/common/SetupChecklist'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'
import { MobileNavigation } from './MobileNavigation'
import { Footer } from './Footer'

const sectionIds = navItems.map((n) => n.id)

export function DashboardLayout() {
  const { pathname } = useLocation()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isHome = pathname === '/'
  const visibleSection = useActiveSection(sectionIds, isHome)
  const active = isHome ? visibleSection : pathname.startsWith('/projects') ? 'projects' : null

  const openPalette = useCallback(() => {
    setMenuOpen(false)
    setPaletteOpen(true)
  }, [])
  const closePalette = useCallback(() => setPaletteOpen(false), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const paletteContext = useMemo(() => ({ open: openPalette }), [openPalette])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const typing = target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setMenuOpen(false)
        setPaletteOpen((o) => !o)
      } else if (e.key === '/' && !typing) {
        e.preventDefault()
        openPalette()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openPalette])

  return (
    <PaletteContext.Provider value={paletteContext}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[70] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-fg"
      >
        Skip to content
      </a>

      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        <div className="ambient absolute inset-0" />
        <div className="bg-grid absolute inset-x-0 top-0 h-[520px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      </div>

      <div className="min-h-dvh lg:grid lg:grid-cols-[248px_minmax(0,1fr)]">
        <Sidebar active={active} />
        <div className="flex min-w-0 flex-col">
          <Topbar onOpenMenu={() => setMenuOpen(true)} menuOpen={menuOpen} />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>

      <MobileNavigation open={menuOpen} onClose={closeMenu} active={active} />
      <CommandPalette open={paletteOpen} onClose={closePalette} />
      {import.meta.env.DEV && <SetupChecklist />}
    </PaletteContext.Provider>
  )
}
