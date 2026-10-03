import { css, keyframes } from 'styled-components'
import { DURATION, EASING, STAGGER_MS } from '@/constants'
import { space } from './spacing'
import { tokens } from './tokens'

// Cards past this many all share the last delay, so a long list doesn't trickle in.
const MAX_STAGGER_STEPS = 6

const riseIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(${space(2)});
  }
`

const dropIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-${space(4)});
  }
`

const staggerDelay = (order: number) => Math.min(order, MAX_STAGGER_STEPS) * STAGGER_MS

// Fades a card up into place when it mounts; `order` staggers a list of them.
export const enterAnimation = (order = 0) =>
  tokens.motion.reduced
    ? css``
    : css`
        animation: ${riseIn} ${DURATION.SLOW}ms ${EASING.DECELERATE} both;
        animation-delay: ${staggerDelay(order)}ms;
      `

export const markerDrop = tokens.motion.reduced
  ? css``
  : css`
      animation: ${dropIn} ${DURATION.SLOW}ms ${EASING.SPRING} both;
    `

export const markerDropDelay = (order: number) => `${staggerDelay(order)}ms`
