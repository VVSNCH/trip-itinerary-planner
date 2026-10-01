export const MAP = {
  WORLD_CENTER: [20, 0] as [number, number],
  WORLD_ZOOM: 2,
  SINGLE_STOP_ZOOM: 15,
  MAX_FIT_ZOOM: 16,
  FIT_PADDING: 56,
  // Room for the phone's stop card and List/Map switch over the bottom of the map.
  PHONE_BOTTOM_INSET: 330,
  FLY_DURATION_S: 0.6,
  MARKER_SIZE: 28,
  TOOLTIP_OFFSET_Y: -18,
  ROUTE_WEIGHT: 4,
  ROUTE_OPACITY: 0.85,
  FALLBACK_DASH: '6 8',
} as const
