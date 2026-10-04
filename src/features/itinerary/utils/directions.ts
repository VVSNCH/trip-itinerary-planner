import { GOOGLE_MAPS } from '@/constants'
import type { Coordinates } from '@/types'

const toParam = ({ lat, lng }: Coordinates) => `${lat},${lng}`

// Google picks the travel mode when none is given, which suits a trip between towns.
export const directionsUrl = (from: Coordinates, to: Coordinates, mode?: 'walking') => {
  const params = new URLSearchParams({
    api: '1',
    origin: toParam(from),
    destination: toParam(to),
  })
  if (mode) params.set('travelmode', mode)
  return `${GOOGLE_MAPS.DIRECTIONS_URL}?${params}`
}

export const placeUrl = (place: Coordinates) =>
  `${GOOGLE_MAPS.SEARCH_URL}?${new URLSearchParams({ api: '1', query: toParam(place) })}`
