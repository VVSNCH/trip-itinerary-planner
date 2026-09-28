import { WALK_METERS_PER_MINUTE } from '@/constants'
import type { Coordinates } from '@/types'

const EARTH_RADIUS_M = 6_371_000
const METERS_PER_KM = 1000

const toRadians = (degrees: number) => (degrees * Math.PI) / 180

// Straight-line distance; road routing arrives with the map.
export const distanceMeters = (from: Coordinates, to: Coordinates) => {
  const dLat = toRadians(to.lat - from.lat)
  const dLng = toRadians(to.lng - from.lng)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(from.lat)) * Math.cos(toRadians(to.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * EARTH_RADIUS_M * Math.asin(Math.sqrt(a))
}

const formatDistance = (meters: number) =>
  meters < METERS_PER_KM
    ? `${Math.max(10, Math.round(meters / 10) * 10)} m`
    : `${(meters / METERS_PER_KM).toFixed(1)} km`

// "4 min walk · 300 m"
export const describeWalk = (from: Coordinates, to: Coordinates) => {
  const meters = distanceMeters(from, to)
  const minutes = Math.max(1, Math.round(meters / WALK_METERS_PER_MINUTE))
  return `${minutes} min walk · ${formatDistance(meters)}`
}
