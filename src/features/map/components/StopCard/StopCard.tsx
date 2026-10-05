import { COPY, LABELS } from '@/constants'
import {
  Button,
  ChevronLeftIcon,
  ChevronRightIcon,
  Chip,
  ClockIcon,
  StopBadge,
  Text,
  Thumbnail,
} from '@/components/common'
import { formatPlaceTiming } from '@/features/itinerary/utils/timing'
import { walkMinutes } from '@/features/itinerary/utils/walking'
import { useWikiSummaries } from '@/features/places/hooks/useWikiSummaries'
import type { Place } from '@/types'
import { Actions, Card, Details, Meta, Title } from './StopCard.styles'

export interface StopCardProps {
  places: Place[]
  selectedPlaceId: number | null
  onSelectPlace: (placeId: number) => void
}

// The mobile map's bottom card: the chosen stop, and a way to step through the day.
export const StopCard = ({ places, selectedPlaceId, onSelectPlace }: StopCardProps) => {
  const summaryFor = useWikiSummaries(places)
  const selectedIndex = places.findIndex((place) => place.id === selectedPlaceId)
  const index = Math.max(selectedIndex, 0)
  const place = places[index]
  if (!place) return null

  const previous = places[index - 1]
  const next = places[index + 1]
  const timing = formatPlaceTiming(place)
  const thumbnail = summaryFor(place)?.thumbnail
  const position = [
    COPY.stopPosition(index + 1, places.length),
    previous ? COPY.walkFrom(walkMinutes(previous, place), previous.name) : null,
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <Card aria-live="polite">
      <Title>
        <StopBadge number={index + 1} size="md" />
        <Details>
          <Text variant="heading" as="h2" truncate>
            {place.name}
          </Text>
          <Text tone="secondary" truncate>
            {place.address}
          </Text>
        </Details>
        {thumbnail && <Thumbnail src={thumbnail} size="md" />}
      </Title>
      <Meta>
        {timing && <Chip tone="outline" icon={<ClockIcon />} label={timing} />}
        {place.category && <Text variant="overline">{place.category}</Text>}
      </Meta>
      <Text variant="caption" tone="secondary">
        {position}
      </Text>
      <Actions>
        <Button
          variant="secondary"
          fullWidth
          startIcon={<ChevronLeftIcon />}
          disabled={!previous}
          onClick={() => previous && onSelectPlace(previous.id)}
        >
          {LABELS.PREVIOUS_STOP}
        </Button>
        <Button
          variant="secondary"
          fullWidth
          endIcon={<ChevronRightIcon />}
          disabled={!next}
          onClick={() => next && onSelectPlace(next.id)}
        >
          {LABELS.NEXT_STOP}
        </Button>
      </Actions>
    </Card>
  )
}
