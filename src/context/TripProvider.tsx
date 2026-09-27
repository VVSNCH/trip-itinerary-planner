import { useMemo, useReducer, useState, type ReactNode } from 'react'
import { loadTrips } from '@/services/storage'
import { TripContext } from './TripContext'
import { tripReducer } from './tripReducer'
import { usePersistTrips } from './usePersistTrips'

export const TripProvider = ({ children }: { children: ReactNode }) => {
  const [stored] = useState(loadTrips)
  const [state, dispatch] = useReducer(tripReducer, { trips: stored.trips })

  usePersistTrips(state.trips)

  const value = useMemo(
    () => ({ trips: state.trips, dispatch, storageWasReset: stored.wasReset }),
    [state.trips, stored.wasReset]
  )

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>
}
