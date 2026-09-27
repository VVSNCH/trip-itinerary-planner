import type { Place, Trip } from '@/types'
import { tripReducer, type TripState } from './tripReducer'

const NOW = '2026-09-26T10:00:00.000Z'
const LATER = '2026-09-27T10:00:00.000Z'

const place = (id: number, name: string): Place => ({
  id,
  name,
  address: '',
  category: 'museum',
  lat: 38.7,
  lng: -9.2,
  time: null,
  note: null,
  durationMins: null,
})

const create = (state: TripState, name: string, startDate: string, endDate: string) =>
  tripReducer(state, {
    type: 'CREATE_TRIP',
    payload: { name, startDate, endDate, now: NOW },
  })

const empty: TripState = { trips: [] }

const lisbon = (): Trip => {
  const [trip] = create(empty, 'Lisbon', '2026-10-09', '2026-10-13').trips
  if (!trip) throw new Error('trip was not created')
  return {
    ...trip,
    days: trip.days.map((day, index) => ({
      ...day,
      places: [place(index + 1, `P${index}`)],
    })),
  }
}

describe('CREATE_TRIP', () => {
  it('derives one day per date, inclusive of both ends', () => {
    const { trips } = create(empty, 'Lisbon', '2026-10-09', '2026-10-13')

    expect(trips).toHaveLength(1)
    expect(trips[0]?.days.map((day) => day.date)).toEqual([
      '2026-10-09',
      '2026-10-10',
      '2026-10-11',
      '2026-10-12',
      '2026-10-13',
    ])
    expect(trips[0]?.days.map((day) => day.id)).toEqual([1, 2, 3, 4, 5])
    expect(trips[0]).toMatchObject({ id: 1, createdAt: NOW, updatedAt: NOW })
  })

  it('never reuses an id after a delete', () => {
    let state = create(empty, 'A', '2026-10-01', '2026-10-01')
    state = create(state, 'B', '2026-10-01', '2026-10-01')
    state = create(state, 'C', '2026-10-01', '2026-10-01')
    state = tripReducer(state, { type: 'DELETE_TRIP', payload: { tripId: 2 } })
    state = create(state, 'D', '2026-10-01', '2026-10-01')

    expect(state.trips.map((trip) => trip.id)).toEqual([1, 3, 4])
  })

  it('gives a trip no days when the end is before the start', () => {
    const { trips } = create(empty, 'Backwards', '2026-10-13', '2026-10-09')
    expect(trips[0]?.days).toEqual([])
  })
})

describe('UPDATE_TRIP', () => {
  const update = (trip: Trip, changes: Partial<Trip>) =>
    tripReducer(
      { trips: [trip] },
      { type: 'UPDATE_TRIP', payload: { ...changes, tripId: trip.id, now: LATER } }
    ).trips[0]

  it('renames without touching the days', () => {
    const trip = lisbon()
    const updated = update(trip, { name: 'Lisbon, five days' })

    expect(updated?.name).toBe('Lisbon, five days')
    expect(updated?.days).toEqual(trip.days)
    expect(updated?.updatedAt).toBe(LATER)
    expect(updated?.createdAt).toBe(NOW)
  })

  it('keeps each day’s places when the trip moves to new dates', () => {
    const updated = update(lisbon(), { startDate: '2026-11-02', endDate: '2026-11-06' })

    expect(updated?.days.map((day) => day.date)[0]).toBe('2026-11-02')
    expect(updated?.days.map((day) => day.places[0]?.name)).toEqual([
      'P0',
      'P1',
      'P2',
      'P3',
      'P4',
    ])
  })

  it('drops the last days when the trip is shortened', () => {
    const updated = update(lisbon(), { endDate: '2026-10-11' })

    expect(updated?.days.map((day) => day.id)).toEqual([1, 2, 3])
    expect(updated?.days.flatMap((day) => day.places)).toHaveLength(3)
  })

  it('adds empty days with fresh ids when the trip is extended', () => {
    const updated = update(lisbon(), { endDate: '2026-10-15' })

    expect(updated?.days.map((day) => day.id)).toEqual([1, 2, 3, 4, 5, 6, 7])
    expect(updated?.days[6]).toEqual({ id: 7, date: '2026-10-15', places: [] })
  })

  it('leaves other trips alone', () => {
    const state = create(
      create(empty, 'A', '2026-10-01', '2026-10-02'),
      'B',
      '2026-10-01',
      '2026-10-02'
    )
    const next = tripReducer(state, {
      type: 'UPDATE_TRIP',
      payload: { tripId: 1, name: 'Renamed', now: LATER },
    })

    expect(next.trips[1]).toBe(state.trips[1])
  })
})

describe('DELETE_TRIP', () => {
  it('removes only the matching trip', () => {
    const state = create(
      create(empty, 'A', '2026-10-01', '2026-10-01'),
      'B',
      '2026-10-01',
      '2026-10-01'
    )
    const next = tripReducer(state, { type: 'DELETE_TRIP', payload: { tripId: 1 } })

    expect(next.trips.map((trip) => trip.name)).toEqual(['B'])
  })

  it('does nothing for an unknown id', () => {
    const state = create(empty, 'A', '2026-10-01', '2026-10-01')
    const next = tripReducer(state, { type: 'DELETE_TRIP', payload: { tripId: 99 } })

    expect(next.trips).toEqual(state.trips)
  })
})
