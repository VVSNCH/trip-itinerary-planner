import type { Coordinates } from '@/types'

// Five decimals is about a metre, enough to treat a search result as the same place.
export const coordinateKey = ({ lat, lng }: Coordinates) =>
  `${lat.toFixed(5)},${lng.toFixed(5)}`
