import { BREAKPOINTS } from '@/constants'

type Breakpoint = keyof typeof BREAKPOINTS

export const up = (bp: Breakpoint) => `@media (min-width: ${BREAKPOINTS[bp]}px)`

export const down = (bp: Breakpoint) => `@media (max-width: ${BREAKPOINTS[bp] - 0.02}px)`
