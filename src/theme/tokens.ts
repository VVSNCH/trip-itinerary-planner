import { BREAKPOINTS, DURATION, EASING, REDUCED_MOTION_QUERY } from '@/constants'
import { colors } from './colors'
import { fontFamily, fontWeight, textStyles } from './typography'
import { SPACING_UNIT, space } from './spacing'
import { radii } from './radii'
import { shadows } from './shadows'
import { zIndex } from './zIndex'
import { sizes } from './sizes'

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia(REDUCED_MOTION_QUERY).matches

const transition = (
  properties: string | string[],
  duration: keyof typeof DURATION = 'BASE',
  easing: keyof typeof EASING = 'STANDARD'
) => {
  if (prefersReducedMotion) return 'none'
  const list = Array.isArray(properties) ? properties : [properties]
  return list
    .map((prop) => `${prop} ${DURATION[duration]}ms ${EASING[easing]}`)
    .join(', ')
}

export const tokens = {
  colors,
  fontFamily,
  fontWeight,
  textStyles,
  spacingUnit: SPACING_UNIT,
  space,
  radii,
  shadows,
  sizes,
  zIndex,
  breakpoints: BREAKPOINTS,
  motion: {
    duration: DURATION,
    easing: EASING,
    reduced: prefersReducedMotion,
    transition,
  },
} as const

export type Tokens = typeof tokens
