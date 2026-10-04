import type { Place, PlaceCandidate, Trip } from '@/types'

export interface PlaceMove {
  fromDayId: number
  toDayId: number
  fromIndex: number
  toIndex: number
}

export type PlaceChanges = Partial<
  Pick<Place, 'time' | 'durationMins' | 'note' | 'visited'>
>

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
  | {
      type: 'ADD_PLACE'
      payload: { tripId: number; dayId: number; place: PlaceCandidate; now: string }
    }
  | {
      type: 'UPDATE_PLACE'
      payload: { tripId: number; placeId: number; changes: PlaceChanges; now: string }
    }
  | { type: 'REMOVE_PLACE'; payload: { tripId: number; placeId: number; now: string } }
  | { type: 'MOVE_PLACE'; payload: PlaceMove & { tripId: number; now: string } }
  | {
      type: 'SCHEDULE_DAY'
      payload: {
        tripId: number
        dayId: number
        times: Record<number, string>
        now: string
      }
    }

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

export const addPlace = (
  tripId: number,
  dayId: number,
  place: PlaceCandidate
): TripAction => ({
  type: 'ADD_PLACE',
  payload: { tripId, dayId, place, now: now() },
})

export const updatePlace = (
  tripId: number,
  placeId: number,
  changes: PlaceChanges
): TripAction => ({
  type: 'UPDATE_PLACE',
  payload: { tripId, placeId, changes, now: now() },
})

export const removePlace = (tripId: number, placeId: number): TripAction => ({
  type: 'REMOVE_PLACE',
  payload: { tripId, placeId, now: now() },
})

export const movePlace = (tripId: number, move: PlaceMove): TripAction => ({
  type: 'MOVE_PLACE',
  payload: { ...move, tripId, now: now() },
})

export const scheduleDay = (
  tripId: number,
  dayId: number,
  times: Record<number, string>
): TripAction => ({
  type: 'SCHEDULE_DAY',
  payload: { tripId, dayId, times, now: now() },
})
