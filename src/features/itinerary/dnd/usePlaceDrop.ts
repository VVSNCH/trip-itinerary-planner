import { useRef } from 'react'
import { useDrop } from 'react-dnd'
import { DND_TYPES } from '@/constants'
import type { PlaceDragItem } from './types'

// Hovering a card moves the dragged one into its slot, but only once the pointer
// crosses the card's midpoint, so neighbours don't flicker back and forth.
export const usePlaceDrop = (
  index: number,
  onHover: (from: number, to: number) => void
) => {
  const ref = useRef<HTMLLIElement | null>(null)

  const [, dropRef] = useDrop<PlaceDragItem>({
    accept: DND_TYPES.PLACE,
    hover: (item, monitor) => {
      const node = ref.current
      const pointer = monitor.getClientOffset()
      if (!node || !pointer || item.index === index) return

      const { top, height } = node.getBoundingClientRect()
      const middle = top + height / 2
      const isMovingDown = item.index < index
      if (isMovingDown && pointer.y < middle) return
      if (!isMovingDown && pointer.y > middle) return

      onHover(item.index, index)
      item.index = index
    },
  })

  dropRef(ref)
  return ref
}
