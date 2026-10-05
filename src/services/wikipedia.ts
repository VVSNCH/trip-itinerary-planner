import { WIKIPEDIA } from '@/constants'
import { requestJson } from './http'

export interface WikiSummary {
  title: string
  extract: string
  thumbnail: string | null
  url: string
}

interface TitleMapping {
  from: string
  to: string
}

interface WikiPage {
  title: string
  missing?: boolean
  extract?: string
  thumbnail?: { source: string }
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null

const isMapping = (value: unknown): value is TitleMapping =>
  isRecord(value) && typeof value.from === 'string' && typeof value.to === 'string'

const isPage = (value: unknown): value is WikiPage =>
  isRecord(value) && typeof value.title === 'string'

const listOf = <T>(value: unknown, guard: (item: unknown) => item is T): T[] =>
  Array.isArray(value) ? value.filter(guard) : []

const cache = new Map<string, WikiSummary | null>()

const buildUrl = (titles: string[]) =>
  `${WIKIPEDIA.API_URL}?${new URLSearchParams({
    action: 'query',
    format: 'json',
    formatversion: '2',
    origin: '*',
    redirects: '1',
    titles: titles.join('|'),
    prop: 'pageimages|extracts',
    exintro: '1',
    explaintext: '1',
    exsentences: String(WIKIPEDIA.SENTENCES),
    exlimit: String(WIKIPEDIA.BATCH_SIZE),
    piprop: 'thumbnail',
    pithumbsize: String(WIKIPEDIA.THUMB_SIZE),
    pilimit: String(WIKIPEDIA.BATCH_SIZE),
  })}`

const fetchBatch = async (titles: string[], signal?: AbortSignal) => {
  const data = await requestJson(buildUrl(titles), { signal })
  const query = isRecord(data) && isRecord(data.query) ? data.query : {}

  // Wikipedia tidies titles and follows redirects; walk each request to its page.
  const renamed = new Map(
    [...listOf(query.normalized, isMapping), ...listOf(query.redirects, isMapping)].map(
      ({ from, to }) => [from, to]
    )
  )
  const pages = new Map(listOf(query.pages, isPage).map((page) => [page.title, page]))

  titles.forEach((requested) => {
    let title = requested
    for (let hops = 0; renamed.has(title) && hops < 2; hops++)
      title = renamed.get(title) ?? title
    const page = pages.get(title)
    cache.set(
      requested,
      page && !page.missing && page.extract
        ? {
            title: page.title,
            extract: page.extract,
            thumbnail: page.thumbnail?.source ?? null,
            url: `${WIKIPEDIA.ARTICLE_URL}${encodeURIComponent(page.title.replace(/ /g, '_'))}`,
          }
        : null
    )
  })
}

// Summaries keyed by the requested title; null where there's no usable article.
export const getSummaries = async (titles: string[], signal?: AbortSignal) => {
  const missing = [...new Set(titles)].filter((title) => !cache.has(title))
  for (let start = 0; start < missing.length; start += WIKIPEDIA.BATCH_SIZE) {
    await fetchBatch(missing.slice(start, start + WIKIPEDIA.BATCH_SIZE), signal)
  }
  return new Map(titles.map((title) => [title, cache.get(title) ?? null]))
}
