import type { Trip } from '@/types'

export const isPastTrip = (trip: Trip, today: string) => trip.endDate < today

// Upcoming trips soonest first, then past trips most recent first.
export const sortTrips = (trips: Trip[], today: string) => {
  const upcoming = trips.filter((trip) => !isPastTrip(trip, today))
  const past = trips.filter((trip) => isPastTrip(trip, today))
  return [
    ...upcoming.sort((a, b) => a.startDate.localeCompare(b.startDate)),
    ...past.sort((a, b) => b.startDate.localeCompare(a.startDate)),
  ]
}
