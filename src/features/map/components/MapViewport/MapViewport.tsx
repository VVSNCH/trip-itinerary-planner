import { latLngBounds } from 'leaflet'
import { useEffect, useRef } from 'react'
import { useMap } from 'react-leaflet'
import { MAP } from '@/constants'
import { tokens } from '@/theme'
import type { Place } from '@/types'

export interface MapViewportProps {
  dayId: number
  places: Place[]
  selectedPlace: Place | null
  bottomInset: number
}

// Moves the view only when the day changes (or its first stop appears), never on
// every edit, so adding or reordering a stop doesn't yank the map away.
export const MapViewport = ({
  dayId,
  places,
  selectedPlace,
  bottomInset,
}: MapViewportProps) => {
  const map = useMap()
  const latestPlaces = useRef(places)
  latestPlaces.current = places
  const hasPlaces = places.length > 0
  const hasMoved = useRef(false)

  useEffect(() => {
    const stops = latestPlaces.current
    if (stops.length === 0) return
    const animate = hasMoved.current && !tokens.motion.reduced
    hasMoved.current = true

    const [only] = stops
    if (stops.length === 1 && only) {
      map.setView([only.lat, only.lng], MAP.SINGLE_STOP_ZOOM, { animate })
      return
    }
    const bounds = latLngBounds(stops.map((stop) => [stop.lat, stop.lng]))
    const fit = {
      paddingTopLeft: [MAP.FIT_PADDING, MAP.FIT_PADDING] as [number, number],
      paddingBottomRight: [MAP.FIT_PADDING, MAP.FIT_PADDING + bottomInset] as [
        number,
        number,
      ],
      maxZoom: MAP.MAX_FIT_ZOOM,
    }
    if (animate) map.flyToBounds(bounds, { ...fit, duration: MAP.FLY_DURATION_S })
    else map.fitBounds(bounds, fit)
  }, [map, dayId, hasPlaces, bottomInset])

  useEffect(() => {
    if (!selectedPlace) return
    const point: [number, number] = [selectedPlace.lat, selectedPlace.lng]
    if (!map.getBounds().contains(point))
      map.panTo(point, { animate: !tokens.motion.reduced })
  }, [map, selectedPlace])

  return null
}
