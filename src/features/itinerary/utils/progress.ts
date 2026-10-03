import type { Day, Place } from '@/types'
import { toMinutes } from './timing'

export type DayProgress = 'past' | 'today' | 'upcoming'

const MINUTES_PER_HOUR = 60

// ISO dates compare correctly as plain strings.
export const dayProgress = (date: string, today: string): DayProgress =>
  date < today ? 'past' : date === today ? 'today' : 'upcoming'

export const minutesOfDay = (now: Date) =>
  now.getHours() * MINUTES_PER_HOUR + now.getMinutes()

// Over once its day has gone, or, today, once its planned finish has passed.
export const isPlaceOver = (place: Place, progress: DayProgress, nowMinutes: number) =>
  progress === 'past' ||
  (progress === 'today' &&
    place.time !== null &&
    toMinutes(place.time) + (place.durationMins ?? 0) <= nowMinutes)

export const isDayComplete = (day: Day, progress: DayProgress) =>
  progress === 'past' ||
  (day.places.length > 0 && day.places.every((place) => place.visited))

// Where "now" sits in today's list: before the first stop that hasn't started.
export const nowIndex = (places: Place[], nowMinutes: number) => {
  const next = places.findIndex(
    (place) => place.time !== null && toMinutes(place.time) > nowMinutes
  )
  return next === -1 ? places.length : next
}
