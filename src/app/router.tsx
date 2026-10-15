import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import HomePage from '@/pages/HomePage'
import NotFoundPage from '@/pages/NotFoundPage'
import { RouteError } from './RouteError'

const ProjectPage = lazy(() => import('@/pages/ProjectPage'))

function PageFallback() {
  return (
    <div className="grid min-h-[50vh] place-items-center" role="status">
      <span className="size-6 animate-spin rounded-full border-2 border-line-strong border-t-primary" />
      <span className="sr-only">Loading…</span>
    </div>
  )
}

export const router = createBrowserRouter(
  [
    {
      element: <DashboardLayout />,
      errorElement: <RouteError />,
      children: [
        { path: '/', element: <HomePage /> },
        {
          path: '/projects/:slug',
          element: (
            <Suspense fallback={<PageFallback />}>
              <ProjectPage />
            </Suspense>
          ),
        },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL.replace(/\/$/, '') || '/' },
)
