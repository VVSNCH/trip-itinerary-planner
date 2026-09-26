import { SCHEMA_VERSION, STORAGE_KEYS } from '@/constants'
import type { Trip } from '@/types'
import { loadTrips, saveTrips } from './storage'

const trip: Trip = {
  id: 1,
  name: 'Lisbon',
  startDate: '2026-10-09',
  endDate: '2026-10-09',
  days: [{ id: 1, date: '2026-10-09', places: [] }],
  createdAt: '2026-09-26T10:00:00.000Z',
  updatedAt: '2026-09-26T10:00:00.000Z',
}

const writeRaw = (trips: string, version = String(SCHEMA_VERSION)) => {
  localStorage.setItem(STORAGE_KEYS.SCHEMA_VERSION, version)
  localStorage.setItem(STORAGE_KEYS.TRIPS, trips)
}

beforeEach(() => localStorage.clear())
afterEach(() => vi.restoreAllMocks())

describe('loadTrips', () => {
  it('returns no trips on a first visit', () => {
    expect(loadTrips()).toEqual({ trips: [], wasReset: false })
  })

  it('reads back what saveTrips wrote', () => {
    expect(saveTrips([trip])).toBe(true)
    expect(loadTrips()).toEqual({ trips: [trip], wasReset: false })
  })

  it('reports a reset when the JSON is corrupt', () => {
    writeRaw('[{"id": 1, "name": "Lis')
    expect(loadTrips()).toEqual({ trips: [], wasReset: true })
  })

  it('reports a reset when the data has the wrong shape', () => {
    writeRaw(JSON.stringify([{ ...trip, days: 'none' }]))
    expect(loadTrips()).toEqual({ trips: [], wasReset: true })
  })

  it('reports a reset for data from an unknown schema version', () => {
    writeRaw(JSON.stringify([trip]), '99')
    expect(loadTrips()).toEqual({ trips: [], wasReset: true })
  })

  it('does not throw when storage is blocked', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('SecurityError')
    })
    expect(loadTrips()).toEqual({ trips: [], wasReset: false })
  })
})

describe('saveTrips', () => {
  it('returns false instead of throwing when storage is full', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('QuotaExceededError')
    })
    expect(saveTrips([trip])).toBe(false)
  })
})
