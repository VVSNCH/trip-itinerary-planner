import { divIcon } from 'leaflet'
import { memo, useMemo } from 'react'
import { Marker, Tooltip } from 'react-leaflet'
import { MAP } from '@/constants'
import type { Place } from '@/types'

export interface StopMarkerProps {
  place: Place
  stopNumber: number
  isSelected: boolean
  onSelect: (placeId: number) => void
}

const HALF = MAP.MARKER_SIZE / 2

export const StopMarker = memo(
  ({ place, stopNumber, isSelected, onSelect }: StopMarkerProps) => {
    const icon = useMemo(
      () =>
        divIcon({
          className: '',
          html: `<span class="stop-marker${isSelected ? ' is-selected' : ''}">${stopNumber}</span>`,
          iconSize: [MAP.MARKER_SIZE, MAP.MARKER_SIZE],
          iconAnchor: [HALF, HALF],
        }),
      [stopNumber, isSelected]
    )

    return (
      <Marker
        position={[place.lat, place.lng]}
        icon={icon}
        title={place.name}
        alt={place.name}
        zIndexOffset={isSelected ? 1000 : 0}
        eventHandlers={{ click: () => onSelect(place.id) }}
      >
        {isSelected && (
          <Tooltip
            permanent
            direction="top"
            offset={[0, MAP.TOOLTIP_OFFSET_Y]}
            className="stop-tooltip"
          >
            {place.name}
          </Tooltip>
        )}
      </Marker>
    )
  }
)

StopMarker.displayName = 'StopMarker'
