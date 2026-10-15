import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

/** Last-resort error screen; keeps a crash from leaving a blank page. */
export function RouteError() {
  const error = useRouteError()
  const message = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : 'Something went wrong.'
  return (
    <div className="grid min-h-dvh place-items-center bg-bg px-4 text-center text-fg">
      <div>
        <h1 className="text-2xl font-semibold">{message}</h1>
        <p className="mt-2 text-muted">Please reload the page.</p>
        <a href={import.meta.env.BASE_URL} className="mt-6 inline-block rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-fg">
          Go to homepage
        </a>
      </div>
    </div>
  )
}
