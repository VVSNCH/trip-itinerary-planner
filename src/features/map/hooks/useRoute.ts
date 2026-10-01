import { useEffect, useState } from 'react'
import { OSRM } from '@/constants'
import { getRoute, toRouteKey } from '@/services/osrm'
import type { Coordinates } from '@/types'

type RouteStatus = 'loading' | 'ready' | 'fallback'

interface RouteResult {
  key: string
  path: Coordinates[] | null
}

// Road geometry for the stops in order. Until it arrives, or if routing fails,
// the stops are joined by straight lines so the day is always drawn.
export const useRoute = (stops: Coordinates[]) => {
  const key = toRouteKey(stops)
  const [result, setResult] = useState<RouteResult | null>(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (key.split(';').length < 2) return
    const controller = new AbortController()
    const timer = setTimeout(() => {
      getRoute(key, controller.signal)
        .then((path) => setResult({ key, path }))
        .catch(() => {
          if (!controller.signal.aborted) setResult({ key, path: null })
        })
    }, OSRM.DEBOUNCE_MS)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [key, attempt])

  const current = result?.key === key ? result : null
  const status: RouteStatus = !current ? 'loading' : current.path ? 'ready' : 'fallback'

  return {
    path: current?.path ?? stops,
    status,
    retry: () => setAttempt((count) => count + 1),
  }
}
