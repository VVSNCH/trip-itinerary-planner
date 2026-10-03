import { useEffect } from 'react'
import { useDragLayer } from 'react-dnd'
import { DND_TYPES } from '@/constants'
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

  // Without this the page scrolls under the finger instead of the card moving.
  useEffect(() => {
    if (!isDragging) return
    const block = (event: TouchEvent) => event.preventDefault()
    document.addEventListener('touchmove', block, { passive: false })
    return () => document.removeEventListener('touchmove', block)
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
