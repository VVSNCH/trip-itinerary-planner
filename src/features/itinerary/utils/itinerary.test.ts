import type { Place } from '@/types'
import { formatDuration, formatPlaceTiming, summarizeDay } from './timing'
import { describeWalk } from './walking'

const place = (overrides: Partial<Place>): Place => ({
  id: 1,
  name: 'Stop',
  address: '',
  category: 'museum',
  lat: 38.7,
  lng: -9.2,
  time: null,
  note: null,
  durationMins: null,
  ...overrides,
})

describe('formatDuration', () => {
  it('drops the empty half', () => {
    expect(formatDuration(30)).toBe('30m')
    expect(formatDuration(120)).toBe('2h')
    expect(formatDuration(90)).toBe('1h 30m')
  })
})

describe('formatPlaceTiming', () => {
  it('shows whichever of time and duration is set', () => {
    expect(formatPlaceTiming(place({ time: '09:30', durationMins: 90 }))).toBe(
      '09:30 · 1h 30m'
    )
    expect(formatPlaceTiming(place({ time: '09:30' }))).toBe('09:30')
    expect(formatPlaceTiming(place({}))).toBe('')
  })
})

describe('summarizeDay', () => {
  it('counts places, planned time, and the span to the last stop’s end', () => {
    const day = [
      place({ time: '09:30', durationMins: 90 }),
      place({ time: '11:15', durationMins: 30 }),
      place({ time: '12:15', durationMins: 60 }),
      place({ time: '14:00', durationMins: 120 }),
    ]
    expect(summarizeDay(day)).toBe('4 places · 5h planned · 09:30 – 16:00')
  })

  it('leaves out what is not known yet', () => {
    expect(summarizeDay([place({})])).toBe('1 place')
    expect(summarizeDay([])).toBe('0 places')
  })
})

describe('describeWalk', () => {
  it('estimates a short walk in metres', () => {
    const jeronimos = { lat: 38.6979, lng: -9.2068 }
    const pasteis = { lat: 38.6975, lng: -9.2032 }
    expect(describeWalk(jeronimos, pasteis)).toBe('4 min walk · 320 m')
  })

  it('switches to kilometres for longer walks', () => {
    expect(
      describeWalk({ lat: 38.6916, lng: -9.216 }, { lat: 38.6958, lng: -9.1945 })
    ).toBe('24 min walk · 1.9 km')
  })
})
