import { COPY } from '@/constants'
import { Text } from '@/components/common'
import { minutesOfDay } from '@/features/itinerary/utils/progress'
import { formatDuration, plannedMinutes } from '@/features/itinerary/utils/timing'
import { useWikiSummaries } from '@/features/places/hooks/useWikiSummaries'
import { useNow } from '@/hooks/useNow'
import type { Place, Trip } from '@/types'
import { formatClock, toISODate } from '@/utils/dates'
import { plural } from '@/utils/format'
import { TimelineDay, type TimelineDayProps } from '../TimelineDay/TimelineDay'
import { Heading, Page, Timeline } from './TimelineView.styles'

export interface TimelineViewProps {
  trip: Trip
  onOpenDay: (dayId: number) => void
  onToggleVisited?: (place: Place) => void
}

export const TimelineView = ({ trip, onOpenDay, onToggleVisited }: TimelineViewProps) => {
  const clock = useNow()
  const now = { minutes: minutesOfDay(clock), label: formatClock(clock) }
  const places = trip.days.flatMap((day) => day.places)
  const planned = plannedMinutes(places)
  const summaryFor = useWikiSummaries(places)
  const perDay = trip.days.length > 0 ? Math.round(planned / trip.days.length) : 0
  const summary = [
    plural(places.length, 'place'),
    planned > 0 && `${formatDuration(planned)} planned`,
    perDay > 0 && COPY.perDay(formatDuration(perDay)),
  ]
    .filter(Boolean)
    .join(' · ')

  // Each day is reached from the last stop of the latest earlier day that has one.
  let lastStop: TimelineDayProps['arrivingFrom'] = null
  const days = trip.days.map((day, index) => {
    const arrivingFrom = lastStop
    const last: Place | undefined = day.places.at(-1)
    if (last) lastStop = { place: last, dayNumber: index + 1 }
    return { day, dayNumber: index + 1, arrivingFrom }
  })

  return (
    <Page>
      <Heading>
        <Text variant="title" as="h2">
          {COPY.allDays(trip.days.length)}
        </Text>
        <Text tone="secondary">{summary}</Text>
      </Heading>
      <Timeline>
        {days.map(({ day, dayNumber, arrivingFrom }) => (
          <TimelineDay
            key={day.id}
            day={day}
            dayNumber={dayNumber}
            arrivingFrom={arrivingFrom}
            isLast={dayNumber === trip.days.length}
            today={toISODate(clock)}
            now={now}
            onOpen={() => onOpenDay(day.id)}
            onToggleVisited={onToggleVisited}
            summaryFor={summaryFor}
          />
        ))}
      </Timeline>
    </Page>
  )
}
