import { COPY, LABELS } from '@/constants'
import { Text } from '@/components/common'
import { formatDuration, plannedMinutes } from '@/features/itinerary/utils/timing'
import type { Trip } from '@/types'
import { plural } from '@/utils/format'
import { DayColumn } from '../DayColumn/DayColumn'
import { Columns, Heading, Legend, LegendItem, Page, Swatch } from './TimelineView.styles'

export interface TimelineViewProps {
  trip: Trip
  onOpenDay: (dayId: number) => void
}

export const TimelineView = ({ trip, onOpenDay }: TimelineViewProps) => {
  const places = trip.days.flatMap((day) => day.places)
  const planned = plannedMinutes(places)
  const perDay = trip.days.length > 0 ? Math.round(planned / trip.days.length) : 0
  const summary = [
    plural(places.length, 'place'),
    planned > 0 && `${formatDuration(planned)} planned`,
    perDay > 0 && COPY.perDay(formatDuration(perDay)),
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <Page>
      <Heading>
        <div>
          <Text variant="title" as="h2">
            {COPY.allDays(trip.days.length)}
          </Text>
          <Text tone="secondary">{summary}</Text>
        </div>
        <Legend>
          <LegendItem>
            <Swatch $tone="neutral" aria-hidden="true" />
            {LABELS.PLANNED_LEGEND}
          </LegendItem>
          <LegendItem>
            <Swatch $tone="accent" aria-hidden="true" />
            {LABELS.BUSY_LEGEND}
          </LegendItem>
        </Legend>
      </Heading>
      <Columns>
        {trip.days.map((day, index) => (
          <DayColumn
            key={day.id}
            day={day}
            dayNumber={index + 1}
            onOpen={() => onOpenDay(day.id)}
          />
        ))}
      </Columns>
    </Page>
  )
}
