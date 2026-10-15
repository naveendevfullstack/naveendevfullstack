import type { SectionId } from '@/types'
import { SidebarContent } from './SidebarContent'

export function Sidebar({ active }: { active: SectionId | null }) {
  return (
    <aside className="sticky top-0 hidden h-dvh border-r border-line bg-sidebar/80 backdrop-blur-xl lg:block">
      <SidebarContent active={active} layoutKey="sidebar" />
    </aside>
  )
}
