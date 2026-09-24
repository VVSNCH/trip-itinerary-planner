export const ROUTES = {
  TRIPS: '/',
  PLANNER: '/trips/:tripId',
  TIMELINE: '/trips/:tripId/timeline',
  SHARED: '/shared',
  NOT_FOUND: '*',
} as const

export const buildPlannerPath = (tripId: number) => `/trips/${tripId}`
export const buildTimelinePath = (tripId: number) => `/trips/${tripId}/timeline`

export const PARAMS = {
  DAY: 'day',
  PLACE: 'place',
  PANEL: 'panel',
} as const
