export const DURATION = {
  INSTANT: 90,
  FAST: 150,
  BASE: 220,
  SLOW: 320,
  MAP_EASE: 600,
} as const

export const EASING = {
  STANDARD: 'cubic-bezier(0.2, 0, 0, 1)',
  DECELERATE: 'cubic-bezier(0, 0, 0, 1)',
  SPRING: 'cubic-bezier(0.34, 1.4, 0.64, 1)',
} as const

export const STAGGER_MS = 40

export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

export const TOAST_AUTO_HIDE_MS = 4000
