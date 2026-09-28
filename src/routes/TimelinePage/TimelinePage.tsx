import { EMPTY_STATES } from '@/constants'
import { StatusPage } from '@/components/layout'
import { useTrip } from '@/features/trips/hooks/useTrip'
import { summarizeTrip } from '@/features/trips/utils/summary'

export const TimelinePage = () => {
  const trip = useTrip()

  if (!trip) {
    return (
      <StatusPage
        title={EMPTY_STATES.TRIP_NOT_FOUND.title}
        description={EMPTY_STATES.TRIP_NOT_FOUND.description}
      />
    )
  }

  return <StatusPage title={trip.name} description={summarizeTrip(trip)} />
}
