import type { Trip } from '@/types'
import { formatRange } from '@/utils/dates'
import { plural } from '@/utils/format'

export const summarizeTrip = (trip: Trip) => {
  const placeCount = trip.days.reduce((count, day) => count + day.places.length, 0)
  return `${formatRange(trip.startDate, trip.endDate)} · ${plural(trip.days.length, 'day')} · ${plural(placeCount, 'place')}`
}
