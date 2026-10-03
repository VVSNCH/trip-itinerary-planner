import { deflateSync, inflateSync, strFromU8, strToU8 } from 'fflate'
import { SHARE } from '@/constants'
import type { TripDraft } from '@/context'
import type { Trip } from '@/types'
import { isDay } from '@/utils/tripGuards'

const PREFIX = `${SHARE.VERSION}.`

// base64url keeps the payload safe in a URL fragment without escaping.
const toBase64Url = (bytes: Uint8Array) =>
  btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')

const fromBase64Url = (text: string) =>
  Uint8Array.from(atob(text.replace(/-/g, '+').replace(/_/g, '/')), (char) =>
    char.charCodeAt(0)
  )

const isDraft = (value: unknown): value is TripDraft =>
  typeof value === 'object' &&
  value !== null &&
  'name' in value &&
  typeof value.name === 'string' &&
  'startDate' in value &&
  typeof value.startDate === 'string' &&
  'endDate' in value &&
  typeof value.endDate === 'string' &&
  'days' in value &&
  Array.isArray(value.days) &&
  value.days.every(isDay)

// Only what a viewer needs: the trip's own ids and timestamps stay behind.
export const encodeTrip = ({ name, startDate, endDate, days }: Trip | TripDraft) =>
  PREFIX +
  toBase64Url(deflateSync(strToU8(JSON.stringify({ name, startDate, endDate, days }))))

// Anything unreadable, truncated or from another version comes back as null.
export const decodeTrip = (encoded: string): TripDraft | null => {
  if (!encoded.startsWith(PREFIX)) return null
  try {
    const data: unknown = JSON.parse(
      strFromU8(inflateSync(fromBase64Url(encoded.slice(PREFIX.length))))
    )
    return isDraft(data) ? data : null
  } catch {
    return null
  }
}
