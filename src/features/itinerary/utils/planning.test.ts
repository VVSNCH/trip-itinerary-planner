import type { Place } from '@/types'
import { findClashes } from './clashes'
import { directionsUrl, placeUrl } from './directions'
import { planTimes } from './schedule'

const place = (overrides: Partial<Place>): Place => ({
  id: 1,
  name: 'Stop',
  address: '',
  category: '',
  lat: 12.8475,
  lng: 79.6997,
  time: null,
  note: null,
  durationMins: null,
  ...overrides,
})

// About 920 m apart in Kanchipuram, so roughly a 12 minute walk.
const ekambareswarar = place({ id: 1, name: 'Ekambareswarar Temple', durationMins: 90 })
const kamakshi = place({
  id: 2,
  name: 'Kamakshi Amman Temple',
  lat: 12.8402,
  lng: 79.7036,
})

describe('planTimes', () => {
  it('starts each stop after the last one and the walk, rounded to five minutes', () => {
    expect(planTimes([ekambareswarar, kamakshi], '07:00')).toEqual({
      1: '07:00',
      2: '08:45',
    })
  })

  it('gives a stop without a duration an hour', () => {
    // Even next door there's a minute's walk, which rounds up to five.
    const nextDoor = place({ id: 3, lat: 12.8402, lng: 79.7036 })
    expect(planTimes([kamakshi, nextDoor], '09:00')).toEqual({ 2: '09:00', 3: '10:05' })
  })

  it('leaves stops that would start after midnight alone', () => {
    const late = place({ id: 3, lat: 12.8402, lng: 79.7036 })
    expect(planTimes([ekambareswarar, late], '23:00')).toEqual({ 1: '23:00' })
  })
})

describe('findClashes', () => {
  it('flags a stop that starts before the one before it finishes', () => {
    const clashes = findClashes([
      { ...ekambareswarar, time: '07:00' },
      { ...kamakshi, time: '08:00' },
    ])
    expect(clashes.get(2)).toBe('Starts before Ekambareswarar Temple finishes')
  })

  it('flags a stop that leaves too little time for the walk', () => {
    const clashes = findClashes([
      { ...ekambareswarar, time: '07:00' },
      { ...kamakshi, time: '08:35' },
    ])
    expect(clashes.get(2)).toMatch(/^Not enough time for the walk from Ekambareswarar/)
  })

  it('accepts a plan with room for the walk, and ignores untimed stops', () => {
    expect(
      findClashes([
        { ...ekambareswarar, time: '07:00' },
        place({ id: 9 }),
        { ...kamakshi, time: '09:00' },
      ]).size
    ).toBe(0)
  })
})

describe('Google Maps links', () => {
  it('builds walking directions between two stops', () => {
    expect(directionsUrl(ekambareswarar, kamakshi, 'walking')).toBe(
      'https://www.google.com/maps/dir/?api=1&origin=12.8475%2C79.6997&destination=12.8402%2C79.7036&travelmode=walking'
    )
  })

  it('links a single place by its coordinates', () => {
    expect(placeUrl(kamakshi)).toBe(
      'https://www.google.com/maps/search/?api=1&query=12.8402%2C79.7036'
    )
  })
})
