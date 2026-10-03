import { useLayoutEffect, useRef, type RefObject } from 'react'
import { DURATION, EASING } from '@/constants'
import { tokens } from '@/theme'

// When the order changes, each item starts where it was and glides to its new slot,
// so a reorder reads as movement rather than a jump. Items are matched by data-flip-key.
export const useListFlip = (listRef: RefObject<HTMLElement>, order: string) => {
  const positions = useRef(new Map<string, number>())

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return
    const next = new Map<string, number>()

    Array.from(list.children).forEach((child) => {
      if (!(child instanceof HTMLElement) || !child.dataset.flipKey) return
      // offsetTop ignores transforms, so a move mid-animation still measures cleanly.
      const top = child.offsetTop
      const previous = positions.current.get(child.dataset.flipKey)
      next.set(child.dataset.flipKey, top)

      if (tokens.motion.reduced || previous === undefined || previous === top) return
      child.animate?.(
        [{ transform: `translateY(${previous - top}px)` }, { transform: 'none' }],
        { duration: DURATION.BASE, easing: EASING.STANDARD }
      )
    })

    positions.current = next
  }, [listRef, order])
}
