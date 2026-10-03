import { useDrag } from 'react-dnd'
import { DND_TYPES, TOUCH_DRAG } from '@/constants'
import { isTouchDevice } from './backend'
import type { PlaceDragItem, PlaceDropResult } from './types'

export const usePlaceDrag = (
  source: Omit<PlaceDragItem, 'originIndex'>,
  onEnd: (item: PlaceDragItem, result: PlaceDropResult | null) => void
) => {
  const [{ isDragging }, dragRef, previewRef] = useDrag({
    type: DND_TYPES.PLACE,
    item: (): PlaceDragItem => {
      // A short buzz confirms the long press picked the card up.
      if (isTouchDevice) navigator.vibrate?.(TOUCH_DRAG.VIBRATE_MS)
      return { ...source, originIndex: source.index }
    },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    end: (item, monitor) => onEnd(item, monitor.getDropResult<PlaceDropResult>()),
  })

  return { isDragging, dragRef, previewRef }
}
