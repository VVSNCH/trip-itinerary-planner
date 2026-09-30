import { EMPTY_STATES } from '@/constants'
import { StatusPage } from '@/components/layout'
import PlannerView from '@/features/itinerary/components/PlannerView'
import { useTrip } from '@/features/trips/hooks/useTrip'

export const PlannerPage = () => {
  const trip = useTrip()

  if (!trip) {
    return (
      <StatusPage
        title={EMPTY_STATES.TRIP_NOT_FOUND.title}
        description={EMPTY_STATES.TRIP_NOT_FOUND.description}
      />
    )
  }

  return <PlannerView trip={trip} />
}
