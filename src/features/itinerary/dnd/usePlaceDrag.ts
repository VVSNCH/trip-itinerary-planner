import { useDrag } from 'react-dnd'
import { DND_TYPES } from '@/constants'
import type { PlaceDragItem, PlaceDropResult } from './types'

export const usePlaceDrag = (
  source: Omit<PlaceDragItem, 'originIndex'>,
  onEnd: (item: PlaceDragItem, result: PlaceDropResult | null) => void
) => {
  const [{ isDragging }, dragRef, previewRef] = useDrag({
    type: DND_TYPES.PLACE,
    item: (): PlaceDragItem => ({ ...source, originIndex: source.index }),
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
    end: (item, monitor) => onEnd(item, monitor.getDropResult<PlaceDropResult>()),
  })

  return { isDragging, dragRef, previewRef }
}
