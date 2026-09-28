import { useParams } from 'react-router-dom'
import { useTrips } from '@/context'

export const useTrip = () => {
  const { tripId } = useParams()
  const { trips } = useTrips()
  return trips.find((trip) => trip.id === Number(tripId))
}
