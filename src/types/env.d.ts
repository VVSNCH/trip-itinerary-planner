/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NOMINATIM_URL?: string
  readonly VITE_OSRM_URL?: string
  readonly VITE_TILE_URL?: string
  readonly VITE_APP_CONTACT?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
