import { useTheme } from 'styled-components'
import { TILES } from '@/constants'
import type { Trip } from '@/types'
import { THUMBNAIL, thumbnailMap } from '../../utils/thumbnail'
import { Attribution, Svg } from './TripThumbnail.styles'

const MARKER_RADIUS = 5
// Tiles overlap by a pixel so no hairline shows where two of them meet.
const TILE_OVERLAP = 1

export const TripThumbnail = ({ trip }: { trip: Trip }) => {
  const { colors } = useTheme()
  const { tiles, points } = thumbnailMap(trip.days.flatMap((day) => day.places))
  const { width, height, tileSize } = THUMBNAIL

  return (
    <Svg viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      {tiles.map((tile) => (
        <image
          key={tile.href}
          href={tile.href}
          x={tile.x}
          y={tile.y}
          width={tileSize + TILE_OVERLAP}
          height={tileSize + TILE_OVERLAP}
        />
      ))}
      {points.length > 1 && (
        <polyline
          points={points.map(([x, y]) => `${x},${y}`).join(' ')}
          fill="none"
          stroke={colors.map.route}
          strokeOpacity={0.85}
          strokeWidth={2.5}
          strokeLinejoin="round"
        />
      )}
      {points.map(([x, y], index) => (
        <circle
          key={index}
          cx={x}
          cy={y}
          r={MARKER_RADIUS}
          fill={colors.map.marker}
          stroke={colors.map.road}
          strokeWidth={1.5}
        />
      ))}
      {tiles.length > 0 && (
        <Attribution x={width - 6} y={height - 6} textAnchor="end">
          {TILES.ATTRIBUTION_TEXT}
        </Attribution>
      )}
    </Svg>
  )
}
