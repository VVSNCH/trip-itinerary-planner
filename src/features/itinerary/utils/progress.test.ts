import type { Day, Place } from '@/types'
import { dayProgress, isDayComplete, isPlaceOver, nowIndex } from './progress'

const place = (overrides: Partial<Place>): Place => ({
  id: 1,
  name: 'Stop',
  address: '',
  category: '',
  lat: 0,
  lng: 0,
  time: null,
  note: null,
  durationMins: null,
  ...overrides,
})

const TEN_AM = 10 * 60

describe('dayProgress', () => {
  it('places a day before, on or after today', () => {
    expect(dayProgress('2026-10-08', '2026-10-09')).toBe('past')
    expect(dayProgress('2026-10-09', '2026-10-09')).toBe('today')
    expect(dayProgress('2026-10-10', '2026-10-09')).toBe('upcoming')
  })
})

describe('isPlaceOver', () => {
  it('counts a stop as over once its planned finish has passed today', () => {
    expect(isPlaceOver(place({ time: '08:30', durationMins: 60 }), 'today', TEN_AM)).toBe(
      true
    )
    expect(isPlaceOver(place({ time: '09:30', durationMins: 60 }), 'today', TEN_AM)).toBe(
      false
    )
  })

  it('treats every stop on a past day as over and none on a future one', () => {
    expect(isPlaceOver(place({}), 'past', TEN_AM)).toBe(true)
    expect(isPlaceOver(place({ time: '06:00' }), 'upcoming', TEN_AM)).toBe(false)
  })
})

describe('isDayComplete', () => {
  const day = (places: Place[]): Day => ({ id: 1, date: '2026-10-09', places })

  it('is complete once every stop is ticked off, or the day has passed', () => {
    expect(isDayComplete(day([place({ visited: true })]), 'today')).toBe(true)
    expect(isDayComplete(day([place({ visited: true }), place({})]), 'today')).toBe(false)
    expect(isDayComplete(day([]), 'past')).toBe(true)
    expect(isDayComplete(day([]), 'upcoming')).toBe(false)
  })
})

describe('nowIndex', () => {
  it('sits before the first stop that has not started', () => {
    const stops = [
      place({ time: '09:00' }),
      place({ time: '11:00' }),
      place({ time: '15:00' }),
    ]
    expect(nowIndex(stops, TEN_AM)).toBe(1)
    expect(nowIndex(stops, 16 * 60)).toBe(3)
  })
})
