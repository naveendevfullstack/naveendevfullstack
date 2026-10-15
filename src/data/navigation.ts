import { Briefcase, FolderGit2, GraduationCap, LayoutDashboard, Mail, UserRound, Wrench } from 'lucide-react'
import type { NavItem } from '@/types'
import { education } from './education'

const allNavItems: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'about', label: 'About', icon: UserRound },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'skills', label: 'Skills', icon: Wrench },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'contact', label: 'Contact', icon: Mail },
]

/** Education is hidden in production until real entries are added. */
export const showEducation = education.length > 0 || import.meta.env.DEV

export const navItems = allNavItems.filter((item) => item.id !== 'education' || showEducation)

