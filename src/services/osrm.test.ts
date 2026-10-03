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

it('joins a stop that sits off the road to the route', async () => {
  const temple = { lat: 12.8475, lng: 79.6997 }
  const shrine = { lat: 12.8402, lng: 79.7036 }
  stubFetch({
    code: 'Ok',
    routes: [
      {
        geometry: {
          coordinates: [
            [79.7005, 12.8478],
            [79.702, 12.844],
            [79.7036, 12.8402],
          ],
        },
      },
    ],
    waypoints: [{ location: [79.7005, 12.8478] }, { location: [79.7036, 12.8402] }],
  })

  expect(await getRoute(toRouteKey([temple, shrine]))).toEqual([
    { lat: 12.8478, lng: 79.7005 },
    temple,
    { lat: 12.8478, lng: 79.7005 },
    { lat: 12.844, lng: 79.702 },
    shrine,
  ])
})
