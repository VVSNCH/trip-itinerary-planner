import { TILES } from '@/constants'
import type { Coordinates } from '@/types'

export const THUMBNAIL = {
  width: 400,
  height: 176,
  padding: 28,
  tileSize: 256,
  minZoom: 2,
  maxZoom: 14,
} as const

export interface ThumbnailTile {
  href: string
  x: number
  y: number
}

export interface ThumbnailMap {
  tiles: ThumbnailTile[]
  points: [number, number][]
}

// Web Mercator, the projection map tiles are drawn in: pixel position at a zoom level.
const project = ({ lat, lng }: Coordinates, zoom: number): [number, number] => {
  const worldSize = THUMBNAIL.tileSize * 2 ** zoom
  const sin = Math.sin((lat * Math.PI) / 180)
  return [
    ((lng + 180) / 360) * worldSize,
    (0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI)) * worldSize,
  ]
}

const bounds = (pixels: [number, number][]) => {
  const xs = pixels.map(([x]) => x)
  const ys = pixels.map(([, y]) => y)
  return {
    minX: Math.min(...xs),
    maxX: Math.max(...xs),
    minY: Math.min(...ys),
    maxY: Math.max(...ys),
  }
}

const tileUrl = (zoom: number, x: number, y: number) =>
  TILES.URL.replace('{z}', String(zoom))
    .replace('{x}', String(x))
    .replace('{y}', String(y))
    .replace('{s}', 'a')
    .replace('{r}', '')

// The closest zoom that fits every stop in the card, the tiles that cover it, and
// where each stop lands on them.
export const thumbnailMap = (places: Coordinates[]): ThumbnailMap => {
  if (places.length === 0) return { tiles: [], points: [] }
  const { width, height, padding, tileSize, minZoom, maxZoom } = THUMBNAIL

  let zoom = maxZoom
  while (zoom > minZoom) {
    const box = bounds(places.map((place) => project(place, zoom)))
    if (
      box.maxX - box.minX <= width - padding * 2 &&
      box.maxY - box.minY <= height - padding * 2
    )
      break
    zoom--
  }

  const pixels = places.map((place) => project(place, zoom))
  const box = bounds(pixels)
  const left = (box.minX + box.maxX) / 2 - width / 2
  const top = (box.minY + box.maxY) / 2 - height / 2
  const tileCount = 2 ** zoom

  const tiles: ThumbnailTile[] = []
  for (let tileY = Math.floor(top / tileSize); tileY * tileSize < top + height; tileY++) {
    if (tileY < 0 || tileY >= tileCount) continue
    for (
      let tileX = Math.floor(left / tileSize);
      tileX * tileSize < left + width;
      tileX++
    ) {
      const wrappedX = ((tileX % tileCount) + tileCount) % tileCount
      tiles.push({
        href: tileUrl(zoom, wrappedX, tileY),
        x: tileX * tileSize - left,
        y: tileY * tileSize - top,
      })
    }
  }

  return { tiles, points: pixels.map(([x, y]) => [x - left, y - top]) }
}
