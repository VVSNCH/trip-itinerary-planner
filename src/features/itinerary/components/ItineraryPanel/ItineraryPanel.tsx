import { useState } from 'react'
import { COPY, MESSAGES, LABELS } from '@/constants'
import { AddIcon, Button, SearchIcon, Text } from '@/components/common'
import { EmptyState } from '@/components/feedback'
import { removePlace, updatePlace, useTrips, type PlaceChanges } from '@/context'
import type { Day, Place, Trip } from '@/types'
import { describeWalk } from '../../utils/walking'
import { DayHeader } from '../DayHeader/DayHeader'
import { PlaceCard } from '../PlaceCard/PlaceCard'
import { PlaceTimeDialog } from '../PlaceTimeDialog/PlaceTimeDialog'
import { Connector, List, Panel } from './ItineraryPanel.styles'

export interface ItineraryPanelProps {
  trip: Trip
  day: Day
  dayNumber: number
  selectedPlaceId: number | null
  onSelectPlace: (placeId: number | null) => void
  onAddPlace: () => void
}

export const ItineraryPanel = ({
  trip,
  day,
  dayNumber,
  selectedPlaceId,
  onSelectPlace,
  onAddPlace,
}: ItineraryPanelProps) => {
  const { dispatch } = useTrips()
  const [timingPlace, setTimingPlace] = useState<Place | null>(null)

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

  return (
    <Panel>
      <DayHeader day={day} dayNumber={dayNumber} onAddPlace={onAddPlace} />

      {day.places.length === 0 ? (
        <EmptyState
          dashed
          title={COPY.nothingPlanned(dayNumber)}
          description={MESSAGES.DAY_EMPTY}
          action={
            <Button variant="secondary" startIcon={<SearchIcon />} onClick={onAddPlace}>
              {LABELS.ADD_PLACE}
            </Button>
          }
        />
      ) : (
        <>
          <List>
            {day.places.map((place, index) => {
              const previous = day.places[index - 1]
              const isSelected = place.id === selectedPlaceId
              return (
                <li key={place.id}>
                  {previous && (
                    <Connector>
                      <Text variant="caption" tone="secondary">
                        {describeWalk(previous, place)}
                      </Text>
                    </Connector>
                  )}
                  <PlaceCard
                    place={place}
                    stopNumber={index + 1}
                    isSelected={isSelected}
                    onSelect={() => onSelectPlace(isSelected ? null : place.id)}
                    onEditTime={() => setTimingPlace(place)}
                    onSaveNote={(note) => handleUpdate(place.id, { note })}
                    onRemove={() => handleRemove(place.id)}
                  />
                </li>
              )
            })}
          </List>
          <Button variant="dashed" fullWidth startIcon={<AddIcon />} onClick={onAddPlace}>
            {COPY.addPlaceToDay(dayNumber)}
          </Button>
        </>
      )}

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
