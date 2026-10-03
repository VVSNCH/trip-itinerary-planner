import '@maplibre/maplibre-gl-leaflet'
import 'maplibre-gl/dist/maplibre-gl.css'
import L from 'leaflet'
import { useEffect, useState } from 'react'
import { TileLayer, useMap } from 'react-leaflet'
import { TILES } from '@/constants'

const hasWebGL = () => {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') ?? canvas.getContext('webgl'))
  } catch {
    return false
  }
}

// MapLibre draws the vector style underneath Leaflet, which keeps the markers,
// route and controls exactly as they are.
const VectorLayer = () => {
  const map = useMap()

  useEffect(() => {
    const layer = L.maplibreGL({ style: TILES.STYLE_URL }).addTo(map)
    map.attributionControl?.addAttribution(TILES.STYLE_ATTRIBUTION)
    return () => {
      layer.remove()
      map.attributionControl?.removeAttribution(TILES.STYLE_ATTRIBUTION)
    }
  }, [map])

  return null
}

export const BaseMap = () => {
  const [isVector] = useState(hasWebGL)

  return isVector ? (
    <VectorLayer />
  ) : (
    <TileLayer url={TILES.URL} attribution={TILES.ATTRIBUTION} maxZoom={TILES.MAX_ZOOM} />
  )
}
