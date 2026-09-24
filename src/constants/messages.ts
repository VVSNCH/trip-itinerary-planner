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
  TRIPS_EMPTY: 'No trips yet. Create one to start planning.',
  DAY_EMPTY: 'Nothing planned. Search for a place or drag one here.',
  GENERIC_ERROR: 'Something went wrong. Try again.',
} as const

export const CONFIRM = {
  DELETE_TRIP: 'Delete this trip? This cannot be undone.',
  SHRINK_DATES: 'Shortening the trip removes days that have places on them. Continue?',
} as const
