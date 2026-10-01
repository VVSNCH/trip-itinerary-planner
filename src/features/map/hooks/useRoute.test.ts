import { act, renderHook } from '@testing-library/react'
import { OSRM } from '@/constants'
import { useRoute } from './useRoute'

const stops = [
  { lat: 38.6979, lng: -9.2068 },
  { lat: 38.6916, lng: -9.216 },
]

beforeEach(() => vi.useFakeTimers())
afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

it('draws straight lines until the road route arrives', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(
      async () =>
        new Response(
          JSON.stringify({
            code: 'Ok',
            routes: [
              {
                geometry: {
                  coordinates: [
                    [-9.2068, 38.6979],
                    [-9.21, 38.695],
                    [-9.216, 38.6916],
                  ],
                },
              },
            ],
          })
        )
    )
  )

  const { result } = renderHook(() => useRoute(stops))
  expect(result.current).toMatchObject({ status: 'loading', path: stops })

  await act(() => vi.advanceTimersByTimeAsync(OSRM.DEBOUNCE_MS))
  expect(result.current.status).toBe('ready')
  expect(result.current.path).toHaveLength(3)
})

it('falls back to straight lines when routing fails, and retries on request', async () => {
  const fetchSpy = vi.fn(async () => new Response('down', { status: 503 }))
  vi.stubGlobal('fetch', fetchSpy)
  const otherStops = [
    { lat: 38.6916, lng: -9.216 },
    { lat: 38.6979, lng: -9.2068 },
  ]

  const { result } = renderHook(() => useRoute(otherStops))
  await act(() => vi.advanceTimersByTimeAsync(OSRM.DEBOUNCE_MS))
  expect(result.current).toMatchObject({ status: 'fallback', path: otherStops })

  act(() => result.current.retry())
  await act(() => vi.advanceTimersByTimeAsync(OSRM.DEBOUNCE_MS))
  expect(fetchSpy).toHaveBeenCalledTimes(2)
})
