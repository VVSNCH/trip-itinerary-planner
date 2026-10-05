import { APP_CONTACT, NOMINATIM } from '@/constants'
import type { Coordinates, PlaceSearchResult } from '@/types'
import { requestJson } from './http'

// Only the fields we read; the provider shape never leaves this file.
interface NominatimItem {
  place_id: number
  lat: string
  lon: string
  display_name: string
  name?: string
  type?: string
  category?: string
  address?: Record<string, string>
  extratags?: Record<string, string> | null
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const isNominatimItem = (value: unknown): value is NominatimItem =>
  isRecord(value) &&
  typeof value.place_id === 'number' &&
  typeof value.lat === 'string' &&
  typeof value.lon === 'string' &&
  typeof value.display_name === 'string'

const VIEWBOX_PADDING_DEG = 0.1
const EMAIL_PATTERN = /[^\s()<>]+@[^\s()<>]+/

const cache = new Map<string, PlaceSearchResult[]>()

// Biases results towards the places already in the trip without excluding others.
export const toViewbox = (points: Coordinates[]): string | null => {
  if (points.length === 0) return null
  const lats = points.map((point) => point.lat)
  const lngs = points.map((point) => point.lng)
  return [
    Math.min(...lngs) - VIEWBOX_PADDING_DEG,
    Math.max(...lats) + VIEWBOX_PADDING_DEG,
    Math.max(...lngs) + VIEWBOX_PADDING_DEG,
    Math.min(...lats) - VIEWBOX_PADDING_DEG,
  ]
    .map((value) => Number(value.toFixed(4)))
    .join(',')
}

const buildUrl = (query: string, viewbox: string | null) => {
  const params = new URLSearchParams({
    q: query,
    format: 'jsonv2',
    addressdetails: '1',
    extratags: '1',
    limit: String(NOMINATIM.RESULT_LIMIT),
  })
  if (viewbox) params.set('viewbox', viewbox)
  // Nominatim's usage policy asks apps to identify themselves; browsers can't set User-Agent.
  const email = APP_CONTACT.match(EMAIL_PATTERN)?.[0]
  if (email) params.set('email', email)
  return `${NOMINATIM.SEARCH_URL}?${params}`
}

const readable = (value: string | undefined) => value?.replace(/_/g, ' ').trim() ?? ''

// OpenStreetMap tags articles as "en:Title"; only English ones are used.
const englishArticle = (tag: string | undefined) => {
  const [lang, ...title] = tag?.split(':') ?? []
  return lang === 'en' && title.length > 0 ? title.join(':').trim() : undefined
}

const toResult = (item: NominatimItem): PlaceSearchResult | null => {
  const lat = Number(item.lat)
  const lng = Number(item.lon)
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null

  const address = item.address ?? {}
  const [firstPart = '', ...otherParts] = item.display_name.split(', ')
  const street = [
    address.road ?? address.pedestrian ?? address.square,
    address.house_number,
  ]
    .filter(Boolean)
    .join(' ')
  const town = [address.postcode, address.city ?? address.town ?? address.village]
    .filter(Boolean)
    .join(' ')
  const category = item.type && item.type !== 'yes' ? item.type : item.category
  const wiki = englishArticle(item.extratags?.wikipedia)

  return {
    key: String(item.place_id),
    name: item.name?.trim() || firstPart,
    address:
      [street, town].filter(Boolean).join(', ') || otherParts.slice(0, 2).join(', '),
    category: readable(category),
    area: address.suburb ?? address.neighbourhood ?? address.quarter ?? null,
    lat,
    lng,
    ...(wiki ? { wiki } : {}),
  }
}

export const searchPlaces = async (
  query: string,
  viewbox: string | null,
  signal?: AbortSignal
): Promise<PlaceSearchResult[]> => {
  const url = buildUrl(query.trim(), viewbox)
  const cached = cache.get(url)
  if (cached) return cached

  const data = await requestJson(url, { signal })
  const results = (Array.isArray(data) ? data : [])
    .filter(isNominatimItem)
    .map(toResult)
    .filter((result): result is PlaceSearchResult => result !== null)

  cache.set(url, results)
  return results
}
