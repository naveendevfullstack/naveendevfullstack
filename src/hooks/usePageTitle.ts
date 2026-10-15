import { useEffect } from 'react'
import { profile } from '@/data/profile'

const base = `${profile.name} — ${profile.title}`

export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${base}` : base
  }, [title])
}
