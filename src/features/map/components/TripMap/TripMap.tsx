import 'leaflet/dist/leaflet.css'
import { memo } from 'react'
import { MapContainer, Polyline, ZoomControl } from 'react-leaflet'
import { useTheme } from 'styled-components'
import { MAP, MESSAGES, TILES } from '@/constants'
import { Notice } from '@/components/feedback'
import type { Place } from '@/types'
import { useRoute } from '../../hooks/useRoute'
import { BaseMap } from '../BaseMap/BaseMap'
import { MapViewport } from '../MapViewport/MapViewport'
import { StopMarker } from '../StopMarker/StopMarker'
import { NoticeSlot, Wrapper } from './TripMap.styles'

export interface TripMapProps {
  dayId: number
  places: Place[]
  selectedPlaceId: number | null
  onSelectPlace: (placeId: number) => void
  bottomInset?: number
}

// Memoised so list-only changes, like typing a note, don't redraw the map.
export const TripMap = memo(
  ({ dayId, places, selectedPlaceId, onSelectPlace, bottomInset = 0 }: TripMapProps) => {
    const { colors } = useTheme()
    const route = useRoute(places)
    const selectedPlace = places.find((place) => place.id === selectedPlaceId) ?? null
    const isFallback = route.status === 'fallback'

    return (
      <Wrapper>
        <MapContainer
          center={MAP.WORLD_CENTER}
          zoom={MAP.WORLD_ZOOM}
          maxZoom={TILES.MAX_ZOOM}
          zoomControl={false}
        >
          <BaseMap />
          <ZoomControl position="topright" />
          <MapViewport
            dayId={dayId}
            places={places}
            selectedPlace={selectedPlace}
            bottomInset={bottomInset}
          />
          {route.path.length > 1 && (
            <Polyline
              positions={route.path.map((point) => [point.lat, point.lng])}
              pathOptions={{
                color: colors.map.route,
                weight: MAP.ROUTE_WEIGHT,
                opacity: MAP.ROUTE_OPACITY,
                dashArray: isFallback ? MAP.FALLBACK_DASH : undefined,
              }}
            />
          )}
          {places.map((place, index) => (
            <StopMarker
              key={place.id}
              place={place}
              stopNumber={index + 1}
              isSelected={place.id === selectedPlaceId}
              onSelect={onSelectPlace}
            />
          ))}
        </MapContainer>
        {isFallback && (
          <NoticeSlot>
            <Notice message={MESSAGES.ROUTE_FALLBACK} onAction={route.retry} />
          </NoticeSlot>
        )}
      </Wrapper>
    )
  }
)

TripMap.displayName = 'TripMap'
