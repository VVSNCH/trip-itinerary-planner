import { useContext } from 'react'
import { TripContext } from './TripContext'

export const useTrips = () => {
  const context = useContext(TripContext)
  if (!context) throw new Error('useTrips must be used inside TripProvider')
  return context
}
