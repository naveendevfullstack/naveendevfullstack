import { ArrowLeft } from 'lucide-react'
import { ButtonLink } from '@/components/common/Button'
import { usePageTitle } from '@/hooks/usePageTitle'

export default function NotFoundPage() {
  usePageTitle('Page not found')
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
      <p className="font-mono text-sm text-primary">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">This page doesn’t exist</h1>
      <p className="mt-3 text-muted">The link may be outdated, or the page has moved.</p>
      <ButtonLink to="/" className="mt-8">
        <ArrowLeft size={16} aria-hidden="true" /> Back to overview
      </ButtonLink>
    </div>
  )
}
