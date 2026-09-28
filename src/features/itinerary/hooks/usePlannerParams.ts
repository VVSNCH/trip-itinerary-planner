import { useSearchParams } from 'react-router-dom'
import { PARAMS } from '@/constants'
import type { Trip } from '@/types'

const SEARCH_PANEL = 'search'

// Selection lives in the URL so any view survives a refresh and the back button.
export const usePlannerParams = (trip: Trip) => {
  const [params, setParams] = useSearchParams()

  const requestedDay = Number(params.get(PARAMS.DAY))
  const day = trip.days.find((candidate) => candidate.id === requestedDay) ?? trip.days[0]
  const placeParam = params.get(PARAMS.PLACE)
  const selectedPlaceId = placeParam ? Number(placeParam) : null
  const isSearchOpen = params.get(PARAMS.PANEL) === SEARCH_PANEL

  const update = (changes: Record<string, string | null>, replace = false) =>
    setParams(
      (current) => {
        const next = new URLSearchParams(current)
        Object.entries(changes).forEach(([key, value]) =>
          value === null ? next.delete(key) : next.set(key, value)
        )
        return next
      },
      { replace }
    )

  return {
    day,
    selectedPlaceId,
    isSearchOpen,
    selectDay: (dayId: number) =>
      update({ [PARAMS.DAY]: String(dayId), [PARAMS.PLACE]: null }),
    selectPlace: (placeId: number | null) =>
      update({ [PARAMS.PLACE]: placeId === null ? null : String(placeId) }, true),
    openSearch: () => update({ [PARAMS.PANEL]: SEARCH_PANEL }),
    closeSearch: () => update({ [PARAMS.PANEL]: null }),
  }
}
