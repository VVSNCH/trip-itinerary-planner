import type { Place } from '@/types'
import { plural } from '@/utils/format'

const MINUTES_PER_HOUR = 60

export const formatDuration = (mins: number) => {
  const hours = Math.floor(mins / MINUTES_PER_HOUR)
  const rest = mins % MINUTES_PER_HOUR
  if (hours === 0) return `${rest}m`
  return rest === 0 ? `${hours}h` : `${hours}h ${rest}m`
}

const toMinutes = (time: string) => {
  const [hours = 0, minutes = 0] = time.split(':').map(Number)
  return hours * MINUTES_PER_HOUR + minutes
}

const toClock = (totalMins: number) => {
  const hours = Math.floor(totalMins / MINUTES_PER_HOUR) % 24
  const minutes = totalMins % MINUTES_PER_HOUR
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

// "09:30 · 1h 30m", or whichever half is known.
export const formatPlaceTiming = (place: Place) =>
  [place.time, place.durationMins ? formatDuration(place.durationMins) : null]
    .filter(Boolean)
    .join(' · ')

// "4 places · 5h planned · 09:30 – 16:00"
export const summarizeDay = (places: Place[]) => {
  const planned = places.reduce((sum, place) => sum + (place.durationMins ?? 0), 0)
  // Earliest start to latest finish, whatever order the stops are in.
  const timed = places.flatMap((place) =>
    place.time
      ? [
          {
            start: toMinutes(place.time),
            end: toMinutes(place.time) + (place.durationMins ?? 0),
          },
        ]
      : []
  )
  const earliest = Math.min(...timed.map((slot) => slot.start))
  const latest = Math.max(...timed.map((slot) => slot.end))
  const span = timed.length > 0 ? `${toClock(earliest)} – ${toClock(latest)}` : null

  return [
    plural(places.length, 'place'),
    planned > 0 ? `${formatDuration(planned)} planned` : null,
    span,
  ]
    .filter(Boolean)
    .join(' · ')
}
