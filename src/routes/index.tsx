import { lazy, Suspense, type ReactNode } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { ROUTES } from '@/constants'
import { PageSkeleton } from '@/components/layout'
import NotFoundPage from './NotFoundPage'
import RouteErrorPage from './RouteErrorPage'
import TripsPage from './TripsPage'

// The planner pulls in drag and drop and the map, so it loads only when opened.
const PlannerPage = lazy(() => import('./PlannerPage'))
const TimelinePage = lazy(() => import('./TimelinePage'))
const SharedTripPage = lazy(() => import('./SharedTripPage'))

const page = (element: ReactNode) => (
  <Suspense fallback={<PageSkeleton />}>{element}</Suspense>
)

export const router = createBrowserRouter(
  [
    { path: ROUTES.TRIPS, element: <TripsPage /> },
    { path: ROUTES.PLANNER, element: page(<PlannerPage />) },
    { path: ROUTES.TIMELINE, element: page(<TimelinePage />) },
    { path: ROUTES.SHARED, element: page(<SharedTripPage />) },
    { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> },
  ].map((route) => ({ ...route, errorElement: <RouteErrorPage /> }))
)
