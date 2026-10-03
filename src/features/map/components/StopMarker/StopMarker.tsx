import { divIcon, type Marker as LeafletMarker } from 'leaflet'
import { memo, useEffect, useMemo, useRef } from 'react'
import { Marker, Tooltip } from 'react-leaflet'
import { MAP } from '@/constants'
import { markerDropDelay } from '@/theme'
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
    const markerRef = useRef<LeafletMarker | null>(null)
    const firstStopNumber = useRef(stopNumber)
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

    // Drops in once when it first appears. Leaflet swaps the inner span whenever the
    // icon changes, so a renumber or selection never replays it.
    useEffect(() => {
      const badge = markerRef.current?.getElement()?.firstElementChild
      if (!(badge instanceof HTMLElement)) return
      badge.style.animationDelay = markerDropDelay(firstStopNumber.current - 1)
      badge.classList.add('is-dropping')
    }, [])

    return (
      <Marker
        ref={markerRef}
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
