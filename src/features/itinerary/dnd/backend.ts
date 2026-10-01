import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { TOUCH_DRAG_DELAY_MS } from '@/constants'

export const isTouchDevice =
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0)

// Chosen once at startup. Touch devices get the touch backend with mouse events
// on, so a laptop with a touchscreen can still drag with its trackpad.
export const dndBackend = isTouchDevice ? TouchBackend : HTML5Backend

export const dndOptions = isTouchDevice
  ? { enableMouseEvents: true, delayTouchStart: TOUCH_DRAG_DELAY_MS }
  : undefined
