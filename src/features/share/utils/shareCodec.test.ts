import { buildSampleTrip } from '@/features/trips/utils/sampleTrip'
import { decodeTrip, encodeTrip } from './shareCodec'

const sample = buildSampleTrip(new Date(2026, 9, 1))

describe('encodeTrip / decodeTrip', () => {
  it('round-trips a trip, including accents and notes', () => {
    const withNote = {
      ...sample,
      days: sample.days.map((day, index) =>
        index === 0
          ? {
              ...day,
              places: day.places.map((place) => ({ ...place, note: 'Café & “pastéis”' })),
            }
          : day
      ),
    }
    expect(decodeTrip(encodeTrip(withNote))).toEqual(withNote)
  })

  it('produces a URL-safe, compressed payload', () => {
    const encoded = encodeTrip(sample)
    expect(encoded).toMatch(/^v1\.[A-Za-z0-9_-]+$/)
    expect(encoded.length).toBeLessThan(JSON.stringify(sample).length)
  })

  it('leaves the local id and timestamps out of the link', () => {
    const trip = { ...sample, id: 42, createdAt: 'x', updatedAt: 'y' }
    expect(decodeTrip(encodeTrip(trip))).toEqual(sample)
  })
})

describe('decodeTrip with bad input', () => {
  it('rejects an unknown version', () => {
    expect(decodeTrip(encodeTrip(sample).replace(/^v1/, 'v9'))).toBeNull()
  })

  it('rejects a link cut short', () => {
    const encoded = encodeTrip(sample)
    expect(decodeTrip(encoded.slice(0, Math.floor(encoded.length / 2)))).toBeNull()
  })

  it('rejects text that is not a trip', () => {
    expect(decodeTrip('v1.not-really-base64!!')).toBeNull()
    expect(decodeTrip('')).toBeNull()
  })
})
