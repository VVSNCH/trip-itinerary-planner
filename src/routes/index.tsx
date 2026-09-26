import { createBrowserRouter } from 'react-router-dom'
import { ROUTES } from '@/constants'
import NotFoundPage from './NotFoundPage'
import PlannerPage from './PlannerPage'
import SharedTripPage from './SharedTripPage'
import TimelinePage from './TimelinePage'
import TripsPage from './TripsPage'

export const router = createBrowserRouter([
  { path: ROUTES.TRIPS, element: <TripsPage /> },
  { path: ROUTES.PLANNER, element: <PlannerPage /> },
  { path: ROUTES.TIMELINE, element: <TimelinePage /> },
  { path: ROUTES.SHARED, element: <SharedTripPage /> },
  { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> },
])
