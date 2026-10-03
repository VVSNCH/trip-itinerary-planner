export const MESSAGES = {
  SEARCH_EMPTY_HINT:
    'Check the spelling, or try a category and neighbourhood, like “viewpoint Graça”.',
  SEARCH_RATE_LIMITED: 'Search is busy. Wait a moment and try again.',
  SEARCH_FAILED: 'Place search is unavailable right now.',
  ROUTE_FALLBACK: 'Route unavailable — showing direct lines between stops.',
  MAP_FAILED: 'The map could not load. Your itinerary still works.',
  OFFLINE: 'You are offline. Saved trips still work.',
  STORAGE_CORRUPT: 'Saved trips could not be read and have been reset.',
  SHARE_TOO_LONG: 'This trip is large. The link may be cut short by some messaging apps.',
  SHARE_EXPLAINER: 'The whole itinerary travels inside the link. Nothing is uploaded.',
  SHARE_READ_ONLY: 'People with the link can view it but not edit.',
  SHARED_BANNER: 'View only — changes aren’t possible on this link.',
  LINK_COPIED: 'Link copied',
  COPY_FAILED: 'Couldn’t copy automatically. Select the link and copy it.',
  TRIP_SAVED: 'Saved to your trips',
  SHARE_INVALID: 'This share link is incomplete or damaged.',
  DAY_EMPTY: 'Search for a place, or drag one here from another day.',
  NOTE_HINT: 'Shows on shared links too',
  CANCEL_DRAG_HINT: 'Press Esc to cancel.',
  MOVE_HINT:
    'To move a place, hold Ctrl and press the arrow keys: up and down reorder the day, left and right move it to the previous or next day.',
  DURATION_INVALID: 'Use whole minutes, up to 24 hours',
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
  DAYS: 'Days',
  SEARCH_PLACES: 'Search places',
  CLEAR_SEARCH: 'Clear search',
  CLOSE: 'Close',
  PLANNER: 'Planner',
  SHARE: 'Share',
  SHARE_LINK: 'Share link · read-only',
  COPY_LINK: 'Copy link',
  DONE: 'Done',
  SAVE_COPY: 'Save a copy',
  SHARED_ITINERARY: 'Shared itinerary',
  LIST: 'List',
  MAP: 'Map',
  PREVIOUS_STOP: 'Previous stop',
  NEXT_STOP: 'Next stop',
  TIMELINE: 'Timeline',
  VIEW: 'View',
  ADD: 'Add',
  ADD_PLACE: 'Add place',
  PLACE_ACTIONS: 'Place actions',
  EDIT_TIME: 'Edit time',
  MARK_VISITED: 'Mark as visited',
  MARK_NOT_VISITED: 'Mark as not visited',
  COMPLETED: 'Completed',
  TODAY: 'Today',
  NOW: 'Now',
  ADD_NOTE: 'Add note',
  EDIT_NOTE: 'Edit note',
  REMOVE: 'Remove',
  NOTE: 'Note',
  TIME: 'Time',
  DURATION: 'Duration (minutes)',
} as const

export const DIALOGS = {
  NEW_TRIP: 'New trip',
  RENAME_TRIP: 'Rename trip',
  CHANGE_DATES: 'Change dates',
  SHRINK_TITLE: 'Shorten this trip?',
  SHRINK_CONFIRM: 'Remove and continue',
  DELETE_TITLE: 'Delete this trip?',
  DELETE_CONFIRM: 'Delete trip',
  EDIT_TIME: 'Time and duration',
  SHARE: 'Share itinerary',
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
  day: (dayNumber: number) => `Day ${dayNumber}`,
  toggleVisited: (placeName: string, isVisited: boolean) =>
    isVisited ? `Mark ${placeName} as not visited` : `Mark ${placeName} as visited`,
  fromPreviousDay: (placeName: string, dayNumber: number) =>
    `From ${placeName}, end of Day ${dayNumber}`,
  planTransport: (distance: string) => `${distance} away · plan transport`,
  addingTo: (dayNumber: number, date: string) => `Adding to Day ${dayNumber} · ${date}`,
  addToDay: (placeName: string, dayNumber: number) =>
    `Add ${placeName} to Day ${dayNumber}`,
  addPlaceToDay: (dayNumber: number) => `Add a place to Day ${dayNumber}`,
  nothingPlanned: (dayNumber: number) => `Nothing planned for Day ${dayNumber}`,
  movingToStop: (name: string, from: number, to: number) =>
    `Moving ${name} from stop ${from} to stop ${to}.`,
  movingToDay: (name: string, fromDay: number, toDay: number) =>
    `Moving ${name} from Day ${fromDay} to Day ${toDay}.`,
  movedToStop: (name: string, stop: number) => `${name} moved to stop ${stop}.`,
  movedToDay: (name: string, dayNumber: number) => `${name} moved to Day ${dayNumber}.`,
  stopPosition: (stop: number, total: number) => `Stop ${stop} of ${total}`,
  walkFrom: (minutes: number, name: string) => `${minutes} min walk from ${name}`,
  allDays: (count: number) => `All ${count} days`,
  characters: (count: number) => `${count.toLocaleString('en')} characters`,
  hoursOut: (span: string, hours: number) => `${span} · ${hours} hours out`,
  perDay: (duration: string) => `about ${duration} a day`,
  onDay: (dayNumber: number) => `On Day ${dayNumber}`,
  searchTooShort: (minLength: number) => `Type at least ${minLength} characters.`,
  searchNoMatch: (query: string) => `No places match “${query}”`,
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
  PAGE_ERROR: {
    title: 'Something went wrong',
    description:
      'This page hit an unexpected error. Your trips are still saved in this browser.',
  },
  PAGE_NOT_FOUND: {
    title: 'Page not found',
    description: 'The address may be mistyped, or the page no longer exists.',
  },
} as const
