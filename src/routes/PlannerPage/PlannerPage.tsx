import { useState } from 'react'
import { COPY, EMPTY_STATES, LABELS } from '@/constants'
import { Card, Tabs, Text } from '@/components/common'
import { AppLayout, StatusPage } from '@/components/layout'
import SearchPanel from '@/features/places/components/SearchPanel'
import { useTrip } from '@/features/trips/hooks/useTrip'
import { summarizeTrip } from '@/features/trips/utils/summary'
import { formatShortDay } from '@/utils/dates'
import { Column, Heading } from './PlannerPage.styles'

export const PlannerPage = () => {
  const trip = useTrip()
  const [dayId, setDayId] = useState<number | null>(null)

  if (!trip) {
    return (
      <StatusPage
        title={EMPTY_STATES.TRIP_NOT_FOUND.title}
        description={EMPTY_STATES.TRIP_NOT_FOUND.description}
      />
    )
  }

  const activeDay = trip.days.find((day) => day.id === dayId) ?? trip.days[0]

  return (
    <AppLayout>
      <Heading>
        <Text variant="display" as="h1">
          {trip.name}
        </Text>
        <Text tone="secondary">{summarizeTrip(trip)}</Text>
      </Heading>
      <Column>
        <Tabs
          label={LABELS.DAYS}
          appearance="tiles"
          value={activeDay?.id ?? 0}
          onChange={setDayId}
          items={trip.days.map((day, index) => ({
            value: day.id,
            label: COPY.day(index + 1),
            sublabel: formatShortDay(day.date),
          }))}
        />
        {activeDay && (
          <Card>
            <SearchPanel trip={trip} dayId={activeDay.id} />
          </Card>
        )}
      </Column>
    </AppLayout>
  )
}
