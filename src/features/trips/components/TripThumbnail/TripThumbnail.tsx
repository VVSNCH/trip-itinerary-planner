import { useTheme } from 'styled-components'
import type { Trip } from '@/types'
import { THUMBNAIL, projectPoints } from '../../utils/thumbnail'
import { Svg } from './TripThumbnail.styles'

const MARKER_RADIUS = 5

export const TripThumbnail = ({ trip }: { trip: Trip }) => {
  const { colors } = useTheme()
  const points = projectPoints(trip.days.flatMap((day) => day.places))

  return (
    <Svg viewBox={`0 0 ${THUMBNAIL.width} ${THUMBNAIL.height}`} aria-hidden="true">
      {points.length > 1 && (
        <polyline
          points={points.map(([x, y]) => `${x},${y}`).join(' ')}
          fill="none"
          stroke={colors.map.route}
          strokeOpacity={0.5}
          strokeWidth={2}
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
    </Svg>
  )
}
