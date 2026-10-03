import { OSRM } from '@/constants'
import type { Coordinates } from '@/types'
import { RequestError, requestJson } from './http'

// Only the fields we read; the provider shape never leaves this file.
interface OsrmResponse {
  code: string
  routes: { geometry: { coordinates: [number, number][] } }[]
  waypoints?: { location?: unknown }[]
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

const toPoint = ([lng, lat]: [number, number]): Coordinates => ({ lat, lng })

const squaredDistance = (a: Coordinates, b: Coordinates) =>
  (a.lat - b.lat) ** 2 + (a.lng - b.lng) ** 2

const isSamePoint = (a: Coordinates, b: Coordinates) => a.lat === b.lat && a.lng === b.lng

// OSRM starts and ends each leg on the nearest walkable road, so a pin inside a
// temple compound or a park would sit off the line. A short spur from the road to
// each stop and back makes the route reach every marker.
const joinStops = (path: Coordinates[], stops: Coordinates[], snapped: Coordinates[]) => {
  const joined: Coordinates[] = []
  let from = 0

  stops.forEach((stop, index) => {
    const target = snapped[index] ?? stop
    let meet = from
    for (let i = from; i < path.length; i++) {
      const point = path[i]
      const best = path[meet]
      if (point && best && squaredDistance(point, target) < squaredDistance(best, target))
        meet = i
    }
    joined.push(...path.slice(from, meet + 1))
    const road = path[meet]
    if (road && !isSamePoint(road, stop)) joined.push(stop, road)
    from = meet + 1
  })

  return [...joined, ...path.slice(from)]
}

const fromRouteKey = (routeKey: string) =>
  routeKey.split(';').map((pair) => {
    const [lng = 0, lat = 0] = pair.split(',').map(Number)
    return { lat, lng }
  })

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

  const road = (data.routes[0]?.geometry.coordinates ?? []).map(toPoint)
  const snapped = (data.waypoints ?? []).flatMap(({ location }) =>
    isPair(location) ? [toPoint(location)] : []
  )
  const path = joinStops(road, fromRouteKey(routeKey), snapped)
  cache.set(routeKey, path)
  return path
}
