export const NOTE_MAX_LENGTH = 280

export const MAX_DURATION_MINS = 24 * 60

// About 4.8 km/h, a relaxed sightseeing pace.
export const WALK_METERS_PER_MINUTE = 80

// Past this, the gap from one day's last stop to the next day's first isn't a walk.
export const MAX_WALK_METERS = 3000

// On touch screens a card is picked up by a long press, so a swipe still scrolls.
// Near the top or bottom edge the page scrolls by up to STEP pixels a frame.
export const TOUCH_DRAG = {
  DELAY_MS: 250,
  VIBRATE_MS: 10,
  SCROLL_EDGE: 100,
  SCROLL_STEP: 14,
} as const

// How often the timeline's "now" marker moves.
export const NOW_TICK_MS = 60_000

// The timeline flags any day planned past this.
export const BUSY_DAY_MINS = 7 * 60

export const SHARE = {
  VERSION: 'v1',
  // Some chat and mail apps start cutting links around this length.
  WARN_LENGTH: 4000,
} as const
