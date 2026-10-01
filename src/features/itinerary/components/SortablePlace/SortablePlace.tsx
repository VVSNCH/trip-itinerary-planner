import type { ReactNode } from 'react'
import type { Place } from '@/types'
import type { PlaceDragItem, PlaceDropResult } from '../../dnd/types'
import { useKeyboardMove } from '../../dnd/useKeyboardMove'
import { usePlaceDrag } from '../../dnd/usePlaceDrag'
import { usePlaceDrop } from '../../dnd/usePlaceDrop'
import { PlaceCard, type PlaceCardProps } from '../PlaceCard/PlaceCard'

type CardActions = Omit<
  PlaceCardProps,
  'place' | 'stopNumber' | 'isDragging' | 'handleRef' | 'cardRef' | 'onKeyDown'
>

export interface SortablePlaceProps extends CardActions {
  place: Place
  dayId: number
  index: number
  connector?: ReactNode
  onHover: (from: number, to: number) => void
  onDragEnd: (item: PlaceDragItem, result: PlaceDropResult | null) => void
  onMoveBy: (delta: -1 | 1) => void
  onMoveToDay: (delta: -1 | 1) => void
}

export const SortablePlace = ({
  place,
  dayId,
  index,
  connector,
  onHover,
  onDragEnd,
  onMoveBy,
  onMoveToDay,
  ...cardActions
}: SortablePlaceProps) => {
  const dropRef = usePlaceDrop(index, onHover)
  const { isDragging, dragRef, previewRef } = usePlaceDrag(
    { placeId: place.id, name: place.name, dayId, index },
    onDragEnd
  )
  const handleKeyDown = useKeyboardMove({ onMoveBy, onMoveToDay })

  return (
    <li ref={dropRef}>
      {connector}
      <PlaceCard
        {...cardActions}
        place={place}
        stopNumber={index + 1}
        isDragging={isDragging}
        handleRef={(node) => {
          dragRef(node)
        }}
        cardRef={(node) => {
          previewRef(node)
        }}
        onKeyDown={handleKeyDown}
      />
    </li>
  )
}
