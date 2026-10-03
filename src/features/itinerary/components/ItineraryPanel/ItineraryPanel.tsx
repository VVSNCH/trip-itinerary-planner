import { useId, useRef, useState } from 'react'
import { useDragLayer, useDrop } from 'react-dnd'
import { COPY, DND_TYPES, LABELS, MESSAGES } from '@/constants'
import { AddIcon, Button, SearchIcon, Text, VisuallyHidden } from '@/components/common'
import { EmptyState } from '@/components/feedback'
import {
  movePlace,
  removePlace,
  updatePlace,
  useTrips,
  type PlaceChanges,
} from '@/context'
import type { Day, Place, Trip } from '@/types'
import { isTouchDevice } from '../../dnd/backend'
import type { PlaceDragItem, PlaceDropResult } from '../../dnd/types'
import { useListFlip } from '../../hooks/useListFlip'
import { describeTransfer, describeWalk } from '../../utils/walking'
import { DayHeader } from '../DayHeader/DayHeader'
import { PlaceCard } from '../PlaceCard/PlaceCard'
import { PlaceTimeDialog } from '../PlaceTimeDialog/PlaceTimeDialog'
import { SortablePlace } from '../SortablePlace/SortablePlace'
import { Connector, Item, List, Panel, Status, Transfer } from './ItineraryPanel.styles'

export interface ItineraryPanelProps {
  trip: Trip
  day: Day
  dayNumber: number
  selectedPlaceId: number | null
  hoverDayId: number | null
  onSelectPlace: (placeId: number | null) => void
  onAddPlace: () => void
  readOnly?: boolean
}

export const ItineraryPanel = ({
  trip,
  day,
  dayNumber,
  selectedPlaceId,
  hoverDayId,
  onSelectPlace,
  onAddPlace,
  readOnly = false,
}: ItineraryPanelProps) => {
  const { dispatch } = useTrips()
  const hintId = useId()
  const [timingPlace, setTimingPlace] = useState<Place | null>(null)
  const [announcement, setAnnouncement] = useState('')
  // The order shown while dragging; the reducer only hears about it on drop.
  const [dragOrder, setDragOrder] = useState<Place[] | null>(null)
  const places = dragOrder ?? day.places
  const listRef = useRef<HTMLOListElement>(null)
  useListFlip(listRef, places.map((place) => place.id).join())

  const dragged = useDragLayer((monitor) =>
    monitor.isDragging() ? monitor.getItem<PlaceDragItem>() : null
  )

  const [, dropRef] = useDrop<PlaceDragItem, PlaceDropResult>({
    accept: DND_TYPES.PLACE,
    drop: (_item, monitor) => (monitor.didDrop() ? undefined : { kind: 'list' }),
  })

  const move = (name: string, fromIndex: number, toDay: Day, toIndex: number) => {
    const moving = day.places[fromIndex]
    if (moving && moving.id === selectedPlaceId && toDay.id !== day.id)
      onSelectPlace(null)
    dispatch(
      movePlace(trip.id, { fromDayId: day.id, toDayId: toDay.id, fromIndex, toIndex })
    )
    setAnnouncement(
      toDay.id === day.id
        ? COPY.movedToStop(name, toIndex + 1)
        : COPY.movedToDay(name, trip.days.indexOf(toDay) + 1)
    )
  }

  const handleHover = (from: number, to: number) =>
    setDragOrder((current) => {
      const next = [...(current ?? day.places)]
      const [moving] = next.splice(from, 1)
      if (moving) next.splice(to, 0, moving)
      return next
    })

  const handleDragEnd = (item: PlaceDragItem, result: PlaceDropResult | null) => {
    setDragOrder(null)
    if (!result) return
    if (result.kind === 'day') {
      const target = trip.days.find((candidate) => candidate.id === result.dayId)
      if (target && target.id !== day.id) {
        move(item.name, item.originIndex, target, target.places.length)
      }
      return
    }
    if (item.index !== item.originIndex)
      move(item.name, item.originIndex, day, item.index)
  }

  const handleMoveBy = (place: Place, index: number, delta: -1 | 1) => {
    const to = index + delta
    if (to >= 0 && to < day.places.length) move(place.name, index, day, to)
  }

  const handleMoveToDay = (place: Place, index: number, delta: -1 | 1) => {
    const target = trip.days[dayNumber - 1 + delta]
    if (target) move(place.name, index, target, target.places.length)
  }

  const handleUpdate = (placeId: number, changes: PlaceChanges) =>
    dispatch(updatePlace(trip.id, placeId, changes))

  const handleRemove = (placeId: number) => {
    if (selectedPlaceId === placeId) onSelectPlace(null)
    dispatch(removePlace(trip.id, placeId))
  }

  const handleSaveTiming = (changes: PlaceChanges) => {
    if (timingPlace) handleUpdate(timingPlace.id, changes)
    setTimingPlace(null)
  }

  // The nearest earlier day with places, since a rest day in between has no last stop.
  const previousDayIndex = trip.days
    .slice(0, dayNumber - 1)
    .reduce(
      (found, candidate, index) => (candidate.places.length > 0 ? index : found),
      -1
    )
  const previousStop = trip.days[previousDayIndex]?.places.at(-1)
  const firstStop = places[0]

  const hoverDayIndex = trip.days.findIndex((candidate) => candidate.id === hoverDayId)
  const dragStatus = !dragged
    ? null
    : hoverDayIndex >= 0 && hoverDayId !== day.id
      ? COPY.movingToDay(dragged.name, dayNumber, hoverDayIndex + 1)
      : COPY.movingToStop(dragged.name, dragged.originIndex + 1, dragged.index + 1)
  // Touch drags have no Esc key to cancel with.
  const cancelHint = isTouchDevice ? '' : ` ${MESSAGES.CANCEL_DRAG_HINT}`
  const status = dragStatus ? `${dragStatus}${cancelHint}` : announcement

  return (
    <Panel
      ref={(node) => {
        dropRef(node)
      }}
    >
      <DayHeader
        day={day}
        dayNumber={dayNumber}
        onAddPlace={readOnly ? undefined : onAddPlace}
      />
      {!readOnly && <VisuallyHidden id={hintId}>{MESSAGES.MOVE_HINT}</VisuallyHidden>}

      {places.length === 0 ? (
        <EmptyState
          dashed
          title={COPY.nothingPlanned(dayNumber)}
          description={readOnly ? undefined : MESSAGES.DAY_EMPTY}
          action={
            !readOnly && (
              <Button variant="secondary" startIcon={<SearchIcon />} onClick={onAddPlace}>
                {LABELS.ADD_PLACE}
              </Button>
            )
          }
        />
      ) : (
        <>
          {previousStop && firstStop && (
            <Transfer>
              <Text variant="caption" tone="secondary">
                {COPY.fromPreviousDay(previousStop.name, previousDayIndex + 1)}
              </Text>
              <Text variant="caption" tone="secondary">
                {describeTransfer(previousStop, firstStop)}
              </Text>
            </Transfer>
          )}
          <List ref={listRef}>
            {places.map((place, index) => {
              const previous = places[index - 1]
              const isSelected = place.id === selectedPlaceId
              const connector = previous && (
                <Connector>
                  <Text variant="caption" tone="secondary">
                    {describeWalk(previous, place)}
                  </Text>
                </Connector>
              )
              const select = () => onSelectPlace(isSelected ? null : place.id)

              if (readOnly) {
                return (
                  <Item key={place.id} $order={index} data-flip-key={place.id}>
                    {connector}
                    <PlaceCard
                      place={place}
                      stopNumber={index + 1}
                      isSelected={isSelected}
                      onSelect={select}
                      onEditTime={() => {}}
                      onSaveNote={() => {}}
                      onRemove={() => {}}
                      onToggleVisited={() => {}}
                      readOnly
                    />
                  </Item>
                )
              }

              return (
                <SortablePlace
                  key={place.id}
                  place={place}
                  dayId={day.id}
                  index={index}
                  isSelected={isSelected}
                  describedBy={hintId}
                  connector={connector}
                  onHover={handleHover}
                  onDragEnd={handleDragEnd}
                  onMoveBy={(delta) => handleMoveBy(place, index, delta)}
                  onMoveToDay={(delta) => handleMoveToDay(place, index, delta)}
                  onSelect={select}
                  onEditTime={() => setTimingPlace(place)}
                  onSaveNote={(note) => handleUpdate(place.id, { note })}
                  onRemove={() => handleRemove(place.id)}
                  onToggleVisited={() =>
                    handleUpdate(place.id, { visited: !place.visited })
                  }
                />
              )
            })}
          </List>
          {!readOnly && (
            <Button
              variant="dashed"
              fullWidth
              startIcon={<AddIcon />}
              onClick={onAddPlace}
            >
              {COPY.addPlaceToDay(dayNumber)}
            </Button>
          )}
        </>
      )}

      <Status aria-live="polite">{status}</Status>

      {timingPlace && (
        <PlaceTimeDialog
          place={timingPlace}
          onSave={handleSaveTiming}
          onClose={() => setTimingPlace(null)}
        />
      )}
    </Panel>
  )
}
