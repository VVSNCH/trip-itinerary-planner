import type { Coordinates } from '@/types'

export const THUMBNAIL = { width: 400, height: 176, padding: 28 } as const

// Fits the points into the thumbnail box, keeping their shape. Longitude is
// scaled by cos(latitude) so a city does not look stretched sideways.
export const projectPoints = (points: Coordinates[]): [number, number][] => {
  if (points.length === 0) return []

  const lats = points.map((point) => point.lat)
  const meanLat = lats.reduce((sum, lat) => sum + lat, 0) / lats.length
  const xScale = Math.cos((meanLat * Math.PI) / 180)
  const xs = points.map((point) => point.lng * xScale)
  const ys = lats.map((lat) => -lat)

  const minX = Math.min(...xs)
  const minY = Math.min(...ys)
  const spanX = Math.max(...xs) - minX
  const spanY = Math.max(...ys) - minY

  const { width, height, padding } = THUMBNAIL
  const scale = Math.min(
    spanX ? (width - padding * 2) / spanX : Infinity,
    spanY ? (height - padding * 2) / spanY : Infinity
  )
  const fit = Number.isFinite(scale) ? scale : 0
  const offsetX = (width - spanX * fit) / 2
  const offsetY = (height - spanY * fit) / 2

  return xs.map((x, index) => [
    offsetX + (x - minX) * fit,
    offsetY + ((ys[index] ?? minY) - minY) * fit,
  ])
}
