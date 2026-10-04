import { SCHEDULE } from '@/constants'
import type { Place } from '@/types'
import { toClock, toMinutes } from './timing'
import { walkMinutes } from './walking'

const MINUTES_PER_DAY = 24 * 60

const roundUp = (mins: number) =>
  Math.ceil(mins / SCHEDULE.ROUND_TO_MINS) * SCHEDULE.ROUND_TO_MINS

// Times for a day in its current order: each stop starts once the previous one
// is done and the walk is made. Stops that would start after midnight keep theirs.
export const planTimes = (places: Place[], start: string): Record<number, string> => {
  const times: Record<number, string> = {}
  let clock = toMinutes(start)

  places.forEach((place, index) => {
    if (clock >= MINUTES_PER_DAY) return
    times[place.id] = toClock(clock)
    const next = places[index + 1]
    const stay = place.durationMins ?? SCHEDULE.DEFAULT_STOP_MINS
    clock += stay + (next ? roundUp(walkMinutes(place, next)) : 0)
  })

  return times
}
