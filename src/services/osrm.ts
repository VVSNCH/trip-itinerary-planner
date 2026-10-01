import { OSRM } from '@/constants'
import type { Coordinates } from '@/types'
import { RequestError, requestJson } from './http'

// Only the fields we read; the provider shape never leaves this file.
interface OsrmResponse {
  code: string
  routes: { geometry: { coordinates: [number, number][] } }[]
}

const isPair = (value: unknown): value is [number, number] =>
  Array.isArray(value) && value.length >= 2 && value.every(Number.isFinite)

const isOsrmResponse = (value: unknown): value is OsrmResponse => {
  if (typeof value !== 'object' || value === null) return false
  if (!('code' in value) || value.code !== 'Ok' || !('routes' in value)) return false
  const [route] = Array.isArray(value.routes) ? value.routes : []
  const coordinates: unknown = route?.geometry?.coordinates
  return Array.isArray(coordinates) && coordinates.every(isPair)
}

const cache = new Map<string, Coordinates[]>()

// OSRM wants "lng,lat;lng,lat". Five decimals keeps the key stable across tiny float noise.
export const toRouteKey = (points: Coordinates[]) =>
  points.map(({ lat, lng }) => `${lng.toFixed(5)},${lat.toFixed(5)}`).join(';')

export const getRoute = async (
  routeKey: string,
  signal?: AbortSignal
): Promise<Coordinates[]> => {
  const cached = cache.get(routeKey)
  if (cached) return cached

  if (routeKey.split(';').length > OSRM.MAX_WAYPOINTS) {
    throw new RequestError('failed', 'Too many stops for one route request')
  }

  const data = await requestJson(
    `${OSRM.ROUTE_URL}/${routeKey}?overview=full&geometries=geojson`,
    { signal }
  )
  if (!isOsrmResponse(data)) throw new RequestError('failed', 'Unexpected route response')

  const path = (data.routes[0]?.geometry.coordinates ?? []).map(([lng, lat]) => ({
    lat,
    lng,
  }))
  cache.set(routeKey, path)
  return path
}
