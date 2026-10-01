import { RequestError } from './http'
import { getRoute, toRouteKey } from './osrm'

const jeronimos = { lat: 38.6979, lng: -9.2068 }
const pasteis = { lat: 38.6975, lng: -9.2032 }

const stubFetch = (body: unknown) => {
  const fetchSpy = vi.fn(async () => new Response(JSON.stringify(body), { status: 200 }))
  vi.stubGlobal('fetch', fetchSpy)
  return fetchSpy
}

afterEach(() => vi.unstubAllGlobals())

it('builds the key in the lng,lat order OSRM expects', () => {
  expect(toRouteKey([jeronimos, pasteis])).toBe('-9.20680,38.69790;-9.20320,38.69750')
})

it('turns the route geometry into lat/lng points', async () => {
  stubFetch({
    code: 'Ok',
    routes: [
      {
        geometry: {
          coordinates: [
            [-9.2068, 38.6979],
            [-9.205, 38.698],
            [-9.2032, 38.6975],
          ],
        },
      },
    ],
  })

  expect(await getRoute(toRouteKey([jeronimos, pasteis]))).toEqual([
    { lat: 38.6979, lng: -9.2068 },
    { lat: 38.698, lng: -9.205 },
    { lat: 38.6975, lng: -9.2032 },
  ])
})

it('asks the provider only once for the same stops', async () => {
  const fetchSpy = stubFetch({
    code: 'Ok',
    routes: [
      {
        geometry: {
          coordinates: [
            [-9.1, 38.7],
            [-9.2, 38.8],
          ],
        },
      },
    ],
  })
  const key = toRouteKey([
    { lat: 38.7, lng: -9.1 },
    { lat: 38.8, lng: -9.2 },
  ])

  await getRoute(key)
  await getRoute(key)
  expect(fetchSpy).toHaveBeenCalledTimes(1)
})

it('rejects a response it cannot read', async () => {
  stubFetch({ code: 'NoRoute', routes: [] })
  await expect(getRoute(toRouteKey([pasteis, jeronimos]))).rejects.toBeInstanceOf(
    RequestError
  )
})
