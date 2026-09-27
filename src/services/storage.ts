import { SCHEMA_VERSION, STORAGE_KEYS } from '@/constants'
import type { Trip } from '@/types'
import { isTripList } from '@/utils/tripGuards'

export interface StoredTrips {
  trips: Trip[]
  wasReset: boolean
}

// localStorage throws in some private-browsing modes, so every access is guarded.
const read = (key: string) => {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

const parse = (raw: string): unknown => {
  try {
    return JSON.parse(raw)
  } catch {
    return undefined
  }
}

// Unreadable data is reported, not deleted here; the next save overwrites it.
export const loadTrips = (): StoredTrips => {
  const raw = read(STORAGE_KEYS.TRIPS)
  if (raw === null) return { trips: [], wasReset: false }

  const data = parse(raw)
  const isCurrentVersion = read(STORAGE_KEYS.SCHEMA_VERSION) === String(SCHEMA_VERSION)
  if (isCurrentVersion && isTripList(data)) return { trips: data, wasReset: false }

  return { trips: [], wasReset: true }
}

export const saveTrips = (trips: Trip[]): boolean => {
  try {
    localStorage.setItem(STORAGE_KEYS.SCHEMA_VERSION, String(SCHEMA_VERSION))
    localStorage.setItem(STORAGE_KEYS.TRIPS, JSON.stringify(trips))
    return true
  } catch {
    return false
  }
}
