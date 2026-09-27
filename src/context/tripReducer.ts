import type { Trip } from '@/types'
import { deriveDays, redateDays } from '@/features/trips/utils/days'
import { nextId } from '@/utils/nextId'
import type { TripAction } from './actions'

export interface TripState {
  trips: Trip[]
}

export const tripReducer = (state: TripState, action: TripAction): TripState => {
  switch (action.type) {
    case 'CREATE_TRIP': {
      const { name, startDate, endDate, now } = action.payload
      const trip: Trip = {
        id: nextId(state.trips),
        name,
        startDate,
        endDate,
        days: deriveDays(startDate, endDate),
        createdAt: now,
        updatedAt: now,
      }
      return { trips: [...state.trips, trip] }
    }

    case 'UPDATE_TRIP': {
      const { tripId, now, ...changes } = action.payload
      return {
        trips: state.trips.map((trip) => {
          if (trip.id !== tripId) return trip
          const startDate = changes.startDate ?? trip.startDate
          const endDate = changes.endDate ?? trip.endDate
          return {
            ...trip,
            name: changes.name ?? trip.name,
            startDate,
            endDate,
            days: redateDays(trip.days, startDate, endDate),
            updatedAt: now,
          }
        }),
      }
    }

    case 'IMPORT_TRIP': {
      const { trip, now } = action.payload
      const imported: Trip = {
        id: nextId(state.trips),
        name: trip.name,
        startDate: trip.startDate,
        endDate: trip.endDate,
        days: trip.days,
        createdAt: now,
        updatedAt: now,
      }
      return { trips: [...state.trips, imported] }
    }

    case 'DELETE_TRIP':
      return { trips: state.trips.filter((trip) => trip.id !== action.payload.tripId) }
  }
}
