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
