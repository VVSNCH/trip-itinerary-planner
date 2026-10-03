import { BUSY_DAY_MINS, COPY, PLANNED_DAY_MINS } from '@/constants'
import { Card, Chip, ClockIcon, ProgressBar, Text } from '@/components/common'
import {
  daySpan,
  formatDuration,
  plannedMinutes,
} from '@/features/itinerary/utils/timing'
import type { Day } from '@/types'
import { formatLongDay, formatShortDay } from '@/utils/dates'
import { plural } from '@/utils/format'
import { Header, Meter, OpenButton, Row, Rows, Time } from './DayColumn.styles'

export interface DayColumnProps {
  day: Day
  dayNumber: number
  onOpen: () => void
}

const MINUTES_PER_HOUR = 60

export const DayColumn = ({ day, dayNumber, onOpen }: DayColumnProps) => {
  const planned = plannedMinutes(day.places)
  const span = daySpan(day.places)
  const isBusy = planned > BUSY_DAY_MINS
  const summary = [
    plural(day.places.length, 'place'),
    planned > 0 && formatDuration(planned),
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <Card selected={isBusy}>
      <Header>
        <Text variant="overline">
          {COPY.day(dayNumber)} · {formatShortDay(day.date)}
        </Text>
        <OpenButton type="button" onClick={onOpen}>
          {formatLongDay(day.date)}
        </OpenButton>
        <Text tone="secondary">{summary}</Text>
        <Meter>
          <ProgressBar
            label={COPY.day(dayNumber)}
            value={(planned / PLANNED_DAY_MINS) * 100}
            tone={isBusy ? 'accent' : 'neutral'}
          />
        </Meter>
        {isBusy && span && (
          <Chip
            tone="accent"
            icon={<ClockIcon />}
            label={COPY.hoursOut(span.label, Math.round(span.minutes / MINUTES_PER_HOUR))}
          />
        )}
      </Header>
      <Rows>
        {day.places.map((place) => (
          <Row key={place.id}>
            <Time>{place.time ?? '—'}</Time>
            <div>
              <Text variant="bodyStrong">{place.name}</Text>
              <Text variant="overline">
                {[
                  place.category,
                  place.durationMins && formatDuration(place.durationMins),
                ]
                  .filter(Boolean)
                  .join(' · ')}
              </Text>
            </div>
          </Row>
        ))}
      </Rows>
    </Card>
  )
}
