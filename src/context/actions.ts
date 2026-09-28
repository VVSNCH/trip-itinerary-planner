import type { Trip } from '@/types'

export type TripDraft = Pick<Trip, 'name' | 'startDate' | 'endDate' | 'days'>

export interface TripInput {
  name: string
  startDate: string
  endDate: string
}

export type TripAction =
  | { type: 'CREATE_TRIP'; payload: TripInput & { now: string } }
  | {
      type: 'UPDATE_TRIP'
      payload: Partial<TripInput> & { tripId: number; now: string }
    }
  | { type: 'DELETE_TRIP'; payload: { tripId: number } }
  | { type: 'IMPORT_TRIP'; payload: { trip: TripDraft; now: string } }

const now = () => new Date().toISOString()

export const createTrip = (input: TripInput): TripAction => ({
  type: 'CREATE_TRIP',
  payload: { ...input, now: now() },
})

export const updateTrip = (tripId: number, changes: Partial<TripInput>): TripAction => ({
  type: 'UPDATE_TRIP',
  payload: { ...changes, tripId, now: now() },
})

export const deleteTrip = (tripId: number): TripAction => ({
  type: 'DELETE_TRIP',
  payload: { tripId },
})

export const importTrip = (trip: TripDraft): TripAction => ({
  type: 'IMPORT_TRIP',
  payload: { trip, now: now() },
})
