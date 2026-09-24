const PREFIX = 'tip'

export const STORAGE_KEYS = {
  SCHEMA_VERSION: `${PREFIX}.schemaVersion`,
  TRIPS: `${PREFIX}.trips`,
} as const

export const SCHEMA_VERSION = 1

export const STORAGE_WRITE_DEBOUNCE_MS = 400
