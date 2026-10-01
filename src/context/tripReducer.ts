import type { Day, Place, Trip } from '@/types'
import { deriveDays, redateDays } from '@/features/trips/utils/days'
import { nextId } from '@/utils/nextId'
import type { TripAction } from './actions'

export interface TripState {
  trips: Trip[]
}

const updateDays = (
  state: TripState,
  tripId: number,
  now: string,
  update: (days: Day[]) => Day[]
): TripState => ({
  trips: state.trips.map((trip) =>
    trip.id === tripId ? { ...trip, days: update(trip.days), updatedAt: now } : trip
  ),
})

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

    case 'ADD_PLACE': {
      const { tripId, dayId, place, now } = action.payload
      return updateDays(state, tripId, now, (days) => {
        const added: Place = {
          id: nextId(days.flatMap((day) => day.places)),
          name: place.name,
          address: place.address,
          category: place.category,
          lat: place.lat,
          lng: place.lng,
          time: null,
          note: null,
          durationMins: null,
        }
        return days.map((day) =>
          day.id === dayId ? { ...day, places: [...day.places, added] } : day
        )
      })
    }

    case 'UPDATE_PLACE': {
      const { tripId, placeId, changes, now } = action.payload
      return updateDays(state, tripId, now, (days) =>
        days.map((day) => ({
          ...day,
          places: day.places.map((place) =>
            place.id === placeId ? { ...place, ...changes } : place
          ),
        }))
      )
    }

    case 'REMOVE_PLACE': {
      const { tripId, placeId, now } = action.payload
      return updateDays(state, tripId, now, (days) =>
        days.map((day) => ({
          ...day,
          places: day.places.filter((place) => place.id !== placeId),
        }))
      )
    }

    case 'MOVE_PLACE': {
      const { tripId, fromDayId, toDayId, fromIndex, toIndex, now } = action.payload
      return updateDays(state, tripId, now, (days) => {
        const moving = days.find((day) => day.id === fromDayId)?.places[fromIndex]
        if (!moving || !days.some((day) => day.id === toDayId)) return days

        // Within one day and across days are the same operation: take it out, put it in.
        const withoutMoving = days.map((day) =>
          day.id === fromDayId
            ? { ...day, places: day.places.filter((_, index) => index !== fromIndex) }
            : day
        )
        return withoutMoving.map((day) => {
          if (day.id !== toDayId) return day
          const places = [...day.places]
          places.splice(Math.min(Math.max(toIndex, 0), places.length), 0, moving)
          return { ...day, places }
        })
      })
    }

    case 'DELETE_TRIP':
      return { trips: state.trips.filter((trip) => trip.id !== action.payload.tripId) }
  }
}
