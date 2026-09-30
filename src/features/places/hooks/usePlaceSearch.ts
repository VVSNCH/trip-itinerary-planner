import { useEffect, useState } from 'react'
import { NOMINATIM } from '@/constants'
import { RequestError, type RequestErrorKind } from '@/services/http'
import { searchPlaces } from '@/services/nominatim'
import type { PlaceSearchResult } from '@/types'

export type PlaceSearchState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'done'; results: PlaceSearchResult[] }
  | { status: 'error'; kind: RequestErrorKind }

export const usePlaceSearch = (query: string, viewbox: string | null) => {
  const [state, setState] = useState<PlaceSearchState>({ status: 'idle' })
  const [attempt, setAttempt] = useState(0)
  const trimmed = query.trim()

  useEffect(() => {
    if (trimmed.length < NOMINATIM.MIN_QUERY_LENGTH) {
      setState({ status: 'idle' })
      return
    }

    // Each keystroke cancels the pending timer and any request already in flight.
    const controller = new AbortController()
    setState({ status: 'loading' })
    const timer = setTimeout(() => {
      searchPlaces(trimmed, viewbox, controller.signal)
        .then((results) => setState({ status: 'done', results }))
        .catch((error: unknown) => {
          if (controller.signal.aborted) return
          setState({
            status: 'error',
            kind: error instanceof RequestError ? error.kind : 'failed',
          })
        })
    }, NOMINATIM.SEARCH_DEBOUNCE_MS)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [trimmed, viewbox, attempt])

  const retry = () => setAttempt((count) => count + 1)
  const isTooShort = trimmed.length > 0 && trimmed.length < NOMINATIM.MIN_QUERY_LENGTH

  return { state, isTooShort, retry }
}
