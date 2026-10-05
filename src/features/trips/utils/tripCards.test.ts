import type { Trip } from '@/types'
import { THUMBNAIL, thumbnailMap } from './thumbnail'
import { duplicateTrip, tripStatus } from './tripStatus'

const trip = (startDate: string, endDate: string, dayCount = 3): Trip => ({
  id: 1,
  name: 'Temples',
  startDate,
  endDate,
  createdAt: '',
  updatedAt: '',
  days: Array.from({ length: dayCount }, (_, index) => ({
    id: index + 1,
    date: startDate,
    places: [
      {
        id: index + 1,
        name: 'Stop',
        address: '',
        category: '',
        lat: 12.84,
        lng: 79.7,
        time: null,
        note: null,
        durationMins: null,
        visited: true,
      },
    ],
  })),
})

describe('tripStatus', () => {
  it('counts down to the start, follows the days during, and settles on past', () => {
    expect(tripStatus(trip('2026-10-11', '2026-10-13'), '2026-10-04')).toEqual({
      kind: 'upcoming',
      daysAway: 7,
    })
    expect(tripStatus(trip('2026-10-11', '2026-10-13'), '2026-10-12')).toEqual({
      kind: 'ongoing',
      day: 2,
      dayCount: 3,
    })
    expect(tripStatus(trip('2026-10-01', '2026-10-03'), '2026-10-04')).toEqual({
      kind: 'past',
    })
  })
})

describe('duplicateTrip', () => {
  it('copies the plan under a new name with nothing ticked off', () => {
    const copy = duplicateTrip(trip('2026-10-11', '2026-10-13'), 'Temples (copy)')
    expect(copy.name).toBe('Temples (copy)')
    expect(copy.days).toHaveLength(3)
    expect(
      copy.days.flatMap((day) => day.places).some((place) => 'visited' in place)
    ).toBe(false)
  })
})

describe('thumbnailMap', () => {
  it('centres the stops on tiles that cover the whole card', () => {
    const { tiles, points } = thumbnailMap([
      { lat: 12.8475, lng: 79.6997 },
      { lat: 12.8191, lng: 79.7246 },
    ])
    const [first, second] = points
    expect(first && second).toBeTruthy()
    // The two stops sit symmetrically about the middle of the card.
    expect(((first?.[0] ?? 0) + (second?.[0] ?? 0)) / 2).toBeCloseTo(THUMBNAIL.width / 2)
    expect(tiles.length).toBeGreaterThan(0)
    expect(tiles.every((tile) => /\/\d+\/\d+\/\d+\.png$/.test(tile.href))).toBe(true)
    expect(Math.min(...tiles.map((tile) => tile.x))).toBeLessThanOrEqual(0)
    expect(
      Math.max(...tiles.map((tile) => tile.x + THUMBNAIL.tileSize))
    ).toBeGreaterThanOrEqual(THUMBNAIL.width)
  })

  it('has nothing to draw for a trip without places', () => {
    expect(thumbnailMap([])).toEqual({ tiles: [], points: [] })
  })
})
