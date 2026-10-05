import { NEARBY_PADDING_DEG, searchPlaces, toViewbox } from './nominatim'

const santaLuzia = {
  place_id: 101,
  lat: '38.7118',
  lon: '-9.1300',
  display_name:
    'Miradouro de Santa Luzia, Largo de Santa Luzia, Alfama, Lisboa, Portugal',
  name: 'Miradouro de Santa Luzia',
  category: 'tourism',
  type: 'viewpoint',
  address: {
    square: 'Largo de Santa Luzia',
    suburb: 'Alfama',
    postcode: '1100-487',
    city: 'Lisboa',
  },
}

const stubFetch = (body: unknown) => {
  const fetchSpy = vi.fn(async () => new Response(JSON.stringify(body), { status: 200 }))
  vi.stubGlobal('fetch', fetchSpy)
  return fetchSpy
}

afterEach(() => vi.unstubAllGlobals())

it('shapes provider results into search results', async () => {
  stubFetch([santaLuzia])

  expect(await searchPlaces('santa luzia', null)).toEqual([
    {
      key: '101',
      name: 'Miradouro de Santa Luzia',
      address: 'Largo de Santa Luzia, 1100-487 Lisboa',
      category: 'viewpoint',
      area: 'Alfama',
      lat: 38.7118,
      lng: -9.13,
    },
  ])
})

it('drops items it cannot read', async () => {
  stubFetch([santaLuzia, { place_id: 'x' }, { ...santaLuzia, place_id: 7, lat: 'north' }])
  expect(await searchPlaces('miradouro broken', null)).toHaveLength(1)
})

it('asks the provider only once per query', async () => {
  const fetchSpy = stubFetch([santaLuzia])
  await searchPlaces('cached query', null)
  await searchPlaces('cached query', null)
  expect(fetchSpy).toHaveBeenCalledTimes(1)
})

it('builds a padded viewbox around the trip, or none without places', () => {
  expect(toViewbox([])).toBeNull()
  expect(toViewbox([{ lat: 38.7, lng: -9.2 }])).toBe('-9.3,38.8,-9.1,38.6')
})

it("keeps the place's English Wikipedia article and ignores other languages", async () => {
  stubFetch([
    {
      ...santaLuzia,
      place_id: 201,
      extratags: { wikipedia: 'en:Miradouro de Santa Luzia' },
    },
    {
      ...santaLuzia,
      place_id: 202,
      extratags: { wikipedia: 'pt:Miradouro de Santa Luzia' },
    },
  ])

  const [english, portuguese] = await searchPlaces('miradouro', null)
  expect(english?.wiki).toBe('Miradouro de Santa Luzia')
  expect(portuguese).not.toHaveProperty('wiki')
})

it('keeps an idea search inside the area around the stops', async () => {
  const fetchSpy = stubFetch([santaLuzia])
  const nearby = toViewbox([{ lat: 38.7, lng: -9.2 }], NEARBY_PADDING_DEG)
  expect(nearby).toBe('-9.22,38.72,-9.18,38.68')

  await searchPlaces('museum', nearby, undefined, true)
  const [[requested]] = fetchSpy.mock.calls as unknown as [[string]]
  const url = new URL(requested)
  expect(url.searchParams.get('viewbox')).toBe(nearby)
  expect(url.searchParams.get('bounded')).toBe('1')
})
