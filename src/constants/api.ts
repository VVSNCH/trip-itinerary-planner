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

// The map is OpenFreeMap's vector Liberty style. The plain OSM raster tiles are the
// fallback for browsers without WebGL.
export const TILES = {
  STYLE_URL: readEnv(
    env.VITE_MAP_STYLE_URL,
    'https://tiles.openfreemap.org/styles/liberty'
  ),
  STYLE_ATTRIBUTION:
    '<a href="https://openfreemap.org">OpenFreeMap</a> &copy; <a href="https://www.openmaptiles.org/">OpenMapTiles</a> Data from <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  URL: readEnv(env.VITE_TILE_URL, 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'),
  ATTRIBUTION: '&copy; OpenStreetMap contributors',
  // Plain-text version for places that can't render HTML, like the trip card thumbnails.
  ATTRIBUTION_TEXT: '© OpenStreetMap',
  MAX_ZOOM: 19,
} as const

// Photos and short descriptions. One request covers up to BATCH_SIZE places,
// which keeps a whole trip well inside Wikipedia's rate limits.
export const WIKIPEDIA = {
  API_URL: 'https://en.wikipedia.org/w/api.php',
  ARTICLE_URL: 'https://en.wikipedia.org/wiki/',
  BATCH_SIZE: 20,
  THUMB_SIZE: 320,
  SENTENCES: 2,
} as const

// Plain links the user opens; nothing is sent to Google until they click.
export const GOOGLE_MAPS = {
  DIRECTIONS_URL: 'https://www.google.com/maps/dir/',
  SEARCH_URL: 'https://www.google.com/maps/search/',
} as const

export const APP_CONTACT = readEnv(env.VITE_APP_CONTACT, 'trip-itinerary-planner')

export const REQUEST_TIMEOUT_MS = 8000
