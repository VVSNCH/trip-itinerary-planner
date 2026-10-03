import { useEffect, useState } from 'react'
import { NOW_TICK_MS } from '@/constants'

// The current time, refreshed every minute.
export const useNow = () => {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), NOW_TICK_MS)
    return () => clearInterval(timer)
  }, [])

  return now
}
