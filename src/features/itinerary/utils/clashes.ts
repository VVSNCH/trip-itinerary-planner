import { COPY, MAX_WALK_METERS } from '@/constants'
import type { Place } from '@/types'
import { toMinutes } from './timing'
import { distanceMeters, walkMinutes } from './walking'

// For each stop whose time doesn't work after the timed stop before it: it starts
// before that one finishes, or too soon to walk over. Keyed by place id.
export const findClashes = (places: Place[]) => {
  const clashes = new Map<number, string>()
  let previous: Place | null = null

  places.forEach((place) => {
    if (!place.time) return
    if (previous?.time) {
      const previousEnd = toMinutes(previous.time) + (previous.durationMins ?? 0)
      const start = toMinutes(place.time)
      const isWalkable = distanceMeters(previous, place) <= MAX_WALK_METERS
      const walk = walkMinutes(previous, place)

      if (start < previousEnd) clashes.set(place.id, COPY.clashOverlap(previous.name))
      else if (isWalkable && start - previousEnd < walk)
        clashes.set(place.id, COPY.clashTight(previous.name, walk))
    }
    previous = place
  })

  return clashes
}
