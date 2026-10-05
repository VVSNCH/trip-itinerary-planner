import { getSummaries } from './wikipedia'

const stubFetch = (respond: (url: URL) => unknown) => {
  const fetchSpy = vi.fn(async (input: string) => {
    const body = respond(new URL(input))
    return new Response(JSON.stringify(body), { status: 200 })
  })
  vi.stubGlobal('fetch', fetchSpy)
  return fetchSpy
}

afterEach(() => vi.unstubAllGlobals())

it('follows redirects and skips titles without an article', async () => {
  stubFetch(() => ({
    query: {
      redirects: [{ from: "Elliot's Beach", to: "Edward Elliot's Beach" }],
      pages: [
        {
          title: "Edward Elliot's Beach",
          extract: 'A beach in Besant Nagar, Chennai.',
          thumbnail: { source: 'https://upload.wikimedia.org/beach.jpg' },
        },
        { title: 'No Such Temple', missing: true },
      ],
    },
  }))

  const summaries = await getSummaries(["Elliot's Beach", 'No Such Temple'])
  expect(summaries.get("Elliot's Beach")).toEqual({
    title: "Edward Elliot's Beach",
    extract: 'A beach in Besant Nagar, Chennai.',
    thumbnail: 'https://upload.wikimedia.org/beach.jpg',
    url: "https://en.wikipedia.org/wiki/Edward_Elliot's_Beach",
  })
  expect(summaries.get('No Such Temple')).toBeNull()
})

it('asks for many places in batches, and only once per title', async () => {
  const titles = Array.from({ length: 25 }, (_, index) => `Temple ${index}`)
  const fetchSpy = stubFetch((url) => ({
    query: {
      pages: (url.searchParams.get('titles') ?? '')
        .split('|')
        .map((title) => ({ title, extract: `About ${title}.` })),
    },
  }))

  await getSummaries(titles)
  await getSummaries(titles)

  expect(fetchSpy).toHaveBeenCalledTimes(2)
  expect((await getSummaries(['Temple 24'])).get('Temple 24')?.thumbnail).toBeNull()
})
