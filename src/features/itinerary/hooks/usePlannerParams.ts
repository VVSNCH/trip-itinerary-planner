import { useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PARAMS } from '@/constants'
import type { Trip } from '@/types'

const SEARCH_PANEL = 'search'
const MAP_VIEW = 'map'

export type PlannerView = 'list' | 'map'

// Selection lives in the URL so any view survives a refresh and the back button.
export const usePlannerParams = (trip: Trip) => {
  const [params, setParams] = useSearchParams()

  const requestedDay = Number(params.get(PARAMS.DAY))
  const day = trip.days.find((candidate) => candidate.id === requestedDay) ?? trip.days[0]
  const placeParam = params.get(PARAMS.PLACE)
  const selectedPlaceId = placeParam ? Number(placeParam) : null
  const isSearchOpen = params.get(PARAMS.PANEL) === SEARCH_PANEL
  const view: PlannerView = params.get(PARAMS.VIEW) === MAP_VIEW ? 'map' : 'list'

  const update = useCallback(
    (changes: Record<string, string | null>, replace = false) =>
      setParams(
        (current) => {
          const next = new URLSearchParams(current)
          Object.entries(changes).forEach(([key, value]) =>
            value === null ? next.delete(key) : next.set(key, value)
          )
          return next
        },
        { replace }
      ),
    [setParams]
  )

  // Stable across renders, so the memoised map doesn't redraw for list-only changes.
  const selectPlace = useCallback(
    (placeId: number | null) =>
      update({ [PARAMS.PLACE]: placeId === null ? null : String(placeId) }, true),
    [update]
  )

  return {
    day,
    selectedPlaceId,
    isSearchOpen,
    view,
    selectPlace,
    selectDay: (dayId: number) =>
      update({ [PARAMS.DAY]: String(dayId), [PARAMS.PLACE]: null }),
    openSearch: () => update({ [PARAMS.PANEL]: SEARCH_PANEL }),
    closeSearch: () => update({ [PARAMS.PANEL]: null }),
    setView: (next: PlannerView) =>
      update({ [PARAMS.VIEW]: next === 'map' ? MAP_VIEW : null }, true),
  }
}
