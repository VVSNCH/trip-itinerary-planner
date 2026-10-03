import { useCallback } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { PARAMS, PARAM_VALUES } from '@/constants'
import type { Trip } from '@/types'

export type PlannerView = 'list' | 'map'

// Selection lives in the URL so any view survives a refresh and the back button.
export const usePlannerParams = (trip: Trip) => {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const { hash } = useLocation()

  const requestedDay = Number(params.get(PARAMS.DAY))
  const day = trip.days.find((candidate) => candidate.id === requestedDay) ?? trip.days[0]
  const placeParam = params.get(PARAMS.PLACE)
  const selectedPlaceId = placeParam ? Number(placeParam) : null
  const isSearchOpen = params.get(PARAMS.PANEL) === PARAM_VALUES.SEARCH_PANEL
  const view: PlannerView =
    params.get(PARAMS.VIEW) === PARAM_VALUES.MAP_VIEW ? 'map' : 'list'

  // navigate rather than setSearchParams, which would drop the #fragment a shared trip lives in.
  const update = useCallback(
    (changes: Record<string, string | null>, replace = false) => {
      const next = new URLSearchParams(params)
      Object.entries(changes).forEach(([key, value]) =>
        value === null ? next.delete(key) : next.set(key, value)
      )
      navigate({ search: next.toString(), hash }, { replace })
    },
    [params, navigate, hash]
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
    openSearch: () => update({ [PARAMS.PANEL]: PARAM_VALUES.SEARCH_PANEL }),
    closeSearch: () => update({ [PARAMS.PANEL]: null }),
    setView: (next: PlannerView) =>
      update({ [PARAMS.VIEW]: next === 'map' ? PARAM_VALUES.MAP_VIEW : null }, true),
  }
}
