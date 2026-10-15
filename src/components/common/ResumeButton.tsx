import { Download, Eye } from 'lucide-react'
import { useResume } from '@/hooks/useResume'
import { buttonClass } from './buttonStyles'
import { cn } from '@/lib/utils'

interface Props {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md'
  compact?: boolean
  showView?: boolean
  className?: string
}

/** Enabled only once a real PDF is confirmed at the configured path. */
export function ResumeButton({ variant = 'primary', size = 'md', compact, showView, className }: Props) {
  const { status, href, downloadName } = useResume()
  const label = compact ? 'Resume' : 'Download Resume'

  if (status !== 'available') {
    const hint =
      status === 'checking' ? 'Checking for resume…' : 'Resume not available yet. Add the PDF at public/resume.pdf to enable downloads.'
    return (
      <button type="button" disabled aria-disabled="true" title={hint} className={buttonClass(variant, size, className)}>
        <Download size={16} aria-hidden="true" />
        <span>{label}</span>
        <span className="sr-only"> ({status === 'checking' ? 'checking' : 'not available yet'})</span>
      </button>
    )
  }

  return (
    <span className={cn('inline-flex gap-2', className)}>
      <a href={href} download={downloadName} className={buttonClass(variant, size, 'w-full')}>
        <Download size={16} aria-hidden="true" />
        {label}
      </a>
      {showView && (
        <a href={href} target="_blank" rel="noopener noreferrer" className={buttonClass('secondary', size)} aria-label="View resume in a new tab">
          <Eye size={16} aria-hidden="true" />
        </a>
      )}
    </span>
  )
}
