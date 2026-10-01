const env = import.meta.env

// .env.example ships blank values, so '' counts as unset too
const readEnv = (value: string | undefined, fallback: string): string =>
  value?.trim() || fallback

export const NOMINATIM = {
  SEARCH_URL: readEnv(
    env.VITE_NOMINATIM_URL,
    'https://nominatim.openstreetmap.org/search'
  ),
  RESULT_LIMIT: 8,
  SEARCH_DEBOUNCE_MS: 500,
  MIN_QUERY_LENGTH: 3,
} as const

// The FOSSGIS server has a walking profile; the OSRM demo server only drives.
export const OSRM = {
  ROUTE_URL: readEnv(
    env.VITE_OSRM_URL,
    'https://routing.openstreetmap.de/routed-foot/route/v1/foot'
  ),
  MAX_WAYPOINTS: 25,
  DEBOUNCE_MS: 300,
} as const

export const TILES = {
  URL: readEnv(env.VITE_TILE_URL, 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'),
  ATTRIBUTION: '&copy; OpenStreetMap contributors',
  MAX_ZOOM: 19,
} as const

export const APP_CONTACT = readEnv(env.VITE_APP_CONTACT, 'trip-itinerary-planner')

export const REQUEST_TIMEOUT_MS = 8000
