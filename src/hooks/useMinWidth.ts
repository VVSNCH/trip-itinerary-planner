import { useSyncExternalStore } from 'react'
import { BREAKPOINTS } from '@/constants'

export const useMinWidth = (breakpoint: keyof typeof BREAKPOINTS) => {
  const query = `(min-width: ${BREAKPOINTS[breakpoint]}px)`
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(query)
      media.addEventListener('change', onChange)
      return () => media.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches
  )
}
