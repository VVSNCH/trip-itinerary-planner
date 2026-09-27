import { useEffect, useRef } from 'react'
import { STORAGE_WRITE_DEBOUNCE_MS } from '@/constants'
import { saveTrips } from '@/services/storage'
import type { Trip } from '@/types'

export const usePersistTrips = (trips: Trip[]) => {
  const latest = useRef(trips)

  useEffect(() => {
    latest.current = trips
    const timer = window.setTimeout(() => saveTrips(trips), STORAGE_WRITE_DEBOUNCE_MS)
    return () => window.clearTimeout(timer)
  }, [trips])

  // Closing the tab inside the debounce window would otherwise lose the last edit.
  useEffect(() => {
    const flush = () => saveTrips(latest.current)
    window.addEventListener('pagehide', flush)
    return () => window.removeEventListener('pagehide', flush)
  }, [])
}
