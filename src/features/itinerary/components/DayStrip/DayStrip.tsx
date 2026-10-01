import { useEffect, useRef } from 'react'
import { useDrop, type DropTargetMonitor } from 'react-dnd'
import { COPY, DND_TYPES, LABELS } from '@/constants'
import { Tabs } from '@/components/common'
import type { Trip } from '@/types'
import { formatShortDay } from '@/utils/dates'
import type { PlaceDragItem, PlaceDropResult } from '../../dnd/types'

export interface DayStripProps {
  trip: Trip
  activeDayId: number
  hoverDayId: number | null
  onSelectDay: (dayId: number) => void
  onHoverDay: (dayId: number | null) => void
}

const MOVED_BADGE = '+1'

// One drop target for the whole strip; the tile under the pointer is the day.
export const DayStrip = ({
  trip,
  activeDayId,
  hoverDayId,
  onSelectDay,
  onHoverDay,
}: DayStripProps) => {
  const stripRef = useRef<HTMLDivElement | null>(null)

  const dayUnderPointer = (monitor: DropTargetMonitor<PlaceDragItem>) => {
    const pointer = monitor.getClientOffset()
    const tiles = stripRef.current?.querySelectorAll('[role="tab"]') ?? []
    if (!pointer) return null
    const index = Array.from(tiles).findIndex((tile) => {
      const { left, right, top, bottom } = tile.getBoundingClientRect()
      return (
        pointer.x >= left && pointer.x <= right && pointer.y >= top && pointer.y <= bottom
      )
    })
    return trip.days[index] ?? null
  }

  const [{ isOver }, dropRef] = useDrop<
    PlaceDragItem,
    PlaceDropResult | undefined,
    { isOver: boolean }
  >({
    accept: DND_TYPES.PLACE,
    hover: (_item, monitor) => onHoverDay(dayUnderPointer(monitor)?.id ?? null),
    drop: (_item, monitor) => {
      const day = dayUnderPointer(monitor)
      onHoverDay(null)
      return day ? { kind: 'day', dayId: day.id } : undefined
    },
    collect: (monitor) => ({ isOver: monitor.isOver() }),
  })
  dropRef(stripRef)

  useEffect(() => {
    if (!isOver) onHoverDay(null)
  }, [isOver, onHoverDay])

  return (
    <div ref={stripRef}>
      <Tabs
        label={LABELS.DAYS}
        appearance="tiles"
        value={activeDayId}
        onChange={onSelectDay}
        items={trip.days.map((day, index) => {
          const isDropTarget = day.id === hoverDayId && day.id !== activeDayId
          return {
            value: day.id,
            label: COPY.day(index + 1),
            sublabel: formatShortDay(day.date),
            highlighted: isDropTarget,
            badge: isDropTarget ? MOVED_BADGE : undefined,
          }
        })}
      />
    </div>
  )
}
