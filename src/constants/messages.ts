export const MESSAGES = {
  SEARCH_EMPTY: 'No places matched that search.',
  SEARCH_TOO_SHORT: 'Type at least three characters.',
  SEARCH_RATE_LIMITED: 'Search is busy. Wait a moment and try again.',
  SEARCH_FAILED: 'Place search is unavailable right now.',
  ROUTE_FALLBACK: 'Showing direct lines. Road routing is unavailable.',
  OFFLINE: 'You are offline. Saved trips still work.',
  STORAGE_CORRUPT: 'Saved trips could not be read and have been reset.',
  SHARE_TOO_LONG: 'This trip is large. The link may not survive some apps.',
  SHARE_INVALID: 'This share link is incomplete or damaged.',
  DAY_EMPTY: 'Nothing planned. Search for a place or drag one here.',
  GENERIC_ERROR: 'Something went wrong. Try again.',
} as const

export const CONFIRM = {
  DELETE_TRIP: 'Delete this trip? This cannot be undone.',
  SHRINK_DATES: 'Shortening the trip removes days that have places on them. Continue?',
} as const

export const LABELS = {
  APP_NAME: 'Itinerary Planner',
  TRIPS: 'Trips',
  NEW_TRIP: 'New trip',
  BACK_TO_TRIPS: 'Back to trips',
} as const

export const EMPTY_STATES = {
  TRIPS: {
    title: 'No trips yet',
    description:
      'Create a trip with a date range, then add places to each day. Everything is saved in this browser.',
  },
  TRIP_NOT_FOUND: {
    title: 'Trip not found',
    description: 'It may have been deleted, or it was saved in a different browser.',
  },
  SHARE_INVALID: {
    title: 'This link can’t be opened',
    description:
      'The share link is incomplete or damaged. Ask for the link to be sent again.',
  },
  PAGE_NOT_FOUND: {
    title: 'Page not found',
    description: 'The address may be mistyped, or the page no longer exists.',
  },
} as const
