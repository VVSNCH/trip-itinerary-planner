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

export const LABELS = {
  APP_NAME: 'Itinerary Planner',
  TRIPS: 'Trips',
  NEW_TRIP: 'New trip',
  BACK_TO_TRIPS: 'Back to trips',
  SAMPLE_TRIP: 'Try a sample trip',
  TRIP_NAME: 'Trip name',
  START: 'Start',
  END: 'End',
  CREATE: 'Create',
  SAVE: 'Save',
  CANCEL: 'Cancel',
  RENAME: 'Rename',
  CHANGE_DATES: 'Change dates',
  DELETE: 'Delete',
  TRIP_ACTIONS: 'Trip actions',
  UPCOMING: 'Upcoming',
  PAST: 'Past',
  PREVIOUS_MONTH: 'Previous month',
  NEXT_MONTH: 'Next month',
  NOT_SET: 'Not set',
} as const

export const DIALOGS = {
  NEW_TRIP: 'New trip',
  RENAME_TRIP: 'Rename trip',
  CHANGE_DATES: 'Change dates',
  SHRINK_TITLE: 'Shorten this trip?',
  SHRINK_CONFIRM: 'Remove and continue',
  DELETE_TITLE: 'Delete this trip?',
  DELETE_CONFIRM: 'Delete trip',
} as const

export const VALIDATION = {
  NAME_REQUIRED: 'Give the trip a name',
  DATES_REQUIRED: 'Pick a start and an end date',
} as const

export const TRIP_NAME_MAX_LENGTH = 60

export const COPY = {
  tripsSaved: (tripCount: string) => `${tripCount}, saved in this browser`,
  removedPlaces: (dayLabel: string, placeCount: string, verb: 'has' | 'have') =>
    `${dayLabel} ${verb} ${placeCount}. Shortening the trip will remove them.`,
  deleteTrip: (name: string) =>
    `“${name}” and all of its places will be removed. This can’t be undone.`,
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
