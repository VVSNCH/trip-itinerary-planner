import { useEffect, useRef } from 'react'
import { useDragLayer } from 'react-dnd'
import { DND_TYPES, TOUCH_DRAG } from '@/constants'
import { Card, Text } from '@/components/common'
import type { PlaceDragItem } from '../../dnd/types'
import { Floating } from './DragPreview.styles'

// The touch backend has no drag image, so this draws the card under the finger.
export const DragPreview = () => {
  const { item, offset } = useDragLayer((monitor) => ({
    item:
      monitor.isDragging() && monitor.getItemType() === DND_TYPES.PLACE
        ? monitor.getItem<PlaceDragItem>()
        : null,
    offset: monitor.getClientOffset(),
  }))
  const isDragging = item !== null
  const latestOffset = useRef(offset)
  latestOffset.current = offset

  // Without this the page scrolls under the finger instead of the card moving.
  useEffect(() => {
    if (!isDragging) return
    const block = (event: TouchEvent) => event.preventDefault()
    document.addEventListener('touchmove', block, { passive: false })
    return () => document.removeEventListener('touchmove', block)
  }, [isDragging])

  // Holding the card near the top or bottom edge scrolls the page, faster the closer it gets.
  useEffect(() => {
    if (!isDragging) return
    const { SCROLL_EDGE, SCROLL_STEP } = TOUCH_DRAG
    let frame = 0
    const step = () => {
      const y = latestOffset.current?.y
      if (y !== undefined) {
        const fromBottom = window.innerHeight - y
        if (y < SCROLL_EDGE) window.scrollBy(0, -SCROLL_STEP * (1 - y / SCROLL_EDGE))
        else if (fromBottom < SCROLL_EDGE)
          window.scrollBy(0, SCROLL_STEP * (1 - fromBottom / SCROLL_EDGE))
      }
      frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [isDragging])

  if (!item || !offset) return null

  return (
    <Floating style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}>
      <Card padding="sm" lifted>
        <Text variant="bodyStrong" truncate>
          {item.name}
        </Text>
      </Card>
    </Floating>
  )
}
