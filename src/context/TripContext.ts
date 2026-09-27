import { createContext, type Dispatch } from 'react'
import type { Trip } from '@/types'
import type { TripAction } from './actions'

export interface TripContextValue {
  trips: Trip[]
  dispatch: Dispatch<TripAction>
  storageWasReset: boolean
}

export const TripContext = createContext<TripContextValue | null>(null)
