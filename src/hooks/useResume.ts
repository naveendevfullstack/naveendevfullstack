import { useEffect, useState } from 'react'
import { profile } from '@/data/profile'
import { asset } from '@/lib/utils'

export type ResumeStatus = 'checking' | 'available' | 'missing'

let cached: Promise<boolean> | null = null

/**
 * Confirms the configured resume really is a PDF before enabling downloads.
 * A plain existence check is not enough: SPA hosts and the Vite dev server
 * answer missing files with index.html and a 200 status.
 */
function checkResume() {
  cached ??= fetch(asset(profile.resume.path), { method: 'HEAD' })
    .then((res) => res.ok && (res.headers.get('content-type') ?? '').includes('pdf'))
    .catch(() => false)
  return cached
}

export function useResume() {
  const [status, setStatus] = useState<ResumeStatus>('checking')

  useEffect(() => {
    let active = true
    checkResume().then((ok) => active && setStatus(ok ? 'available' : 'missing'))
    return () => {
      active = false
    }
  }, [])

  return { status, href: asset(profile.resume.path), downloadName: profile.resume.downloadName }
}
