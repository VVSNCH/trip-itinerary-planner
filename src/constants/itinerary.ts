export const NOTE_MAX_LENGTH = 280

export const MAX_DURATION_MINS = 24 * 60

// About 4.8 km/h, a relaxed sightseeing pace.
export const WALK_METERS_PER_MINUTE = 80

// Touch drags start after a short hold, so a plain swipe still scrolls the list.
export const TOUCH_DRAG_DELAY_MS = 150

// The timeline measures each day against this, and flags anything past the busy mark.
export const PLANNED_DAY_MINS = 8 * 60
export const BUSY_DAY_MINS = 7 * 60

export const SHARE = {
  VERSION: 'v1',
  // Some chat and mail apps start cutting links around this length.
  WARN_LENGTH: 4000,
} as const
