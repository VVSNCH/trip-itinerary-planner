import { differenceInCalendarDays, parseISO } from 'date-fns'
import type { TripDraft } from '@/context'
import type { Trip } from '@/types'

export type TripStatus =
  | { kind: 'upcoming'; daysAway: number }
  | { kind: 'ongoing'; day: number; dayCount: number }
  | { kind: 'past' }

// ISO dates compare correctly as plain strings.
export const tripStatus = (trip: Trip, today: string): TripStatus => {
  if (trip.endDate < today) return { kind: 'past' }
  if (trip.startDate > today)
    return {
      kind: 'upcoming',
      daysAway: differenceInCalendarDays(parseISO(trip.startDate), parseISO(today)),
    }
  return {
    kind: 'ongoing',
    day: differenceInCalendarDays(parseISO(today), parseISO(trip.startDate)) + 1,
    dayCount: trip.days.length,
  }
}

// A fresh copy to plan from: same days and places, nothing ticked off yet.
export const duplicateTrip = (trip: Trip, name: string): TripDraft => ({
  name,
  startDate: trip.startDate,
  endDate: trip.endDate,
  days: trip.days.map((day) => ({
    ...day,
    places: day.places.map(({ visited: _visited, ...place }) => place),
  })),
})
