import { RequestError, requestJson } from './http'

const respond = (status: number, body: unknown = {}) =>
  vi.fn().mockResolvedValue(new Response(JSON.stringify(body), { status }))

// A fetch that only settles when its signal aborts, like a hung connection.
const hang = vi.fn(
  (_url: string, init?: RequestInit) =>
    new Promise((_resolve, reject) =>
      init?.signal?.addEventListener('abort', () =>
        reject(new DOMException('Aborted', 'AbortError'))
      )
    )
)

const kindOf = async (promise: Promise<unknown>) => {
  try {
    await promise
    return 'resolved'
  } catch (error) {
    return error instanceof RequestError ? error.kind : 'other'
  }
}

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
  vi.useRealTimers()
})

it('returns the parsed body on success', async () => {
  vi.stubGlobal('fetch', respond(200, [{ id: 1 }]))
  await expect(requestJson('/ok')).resolves.toEqual([{ id: 1 }])
})

it('reports 429 as rate-limited', async () => {
  vi.stubGlobal('fetch', respond(429))
  expect(await kindOf(requestJson('/busy'))).toBe('rate-limited')
})

it('reports other non-2xx responses as failed', async () => {
  vi.stubGlobal('fetch', respond(503))
  expect(await kindOf(requestJson('/down'))).toBe('failed')
})

it('gives up after the timeout', async () => {
  vi.useFakeTimers()
  vi.stubGlobal('fetch', hang)
  const result = kindOf(requestJson('/slow', { timeoutMs: 1000 }))
  await vi.advanceTimersByTimeAsync(1000)
  expect(await result).toBe('timeout')
})

it('fails fast when the browser is offline', async () => {
  vi.spyOn(navigator, 'onLine', 'get').mockReturnValue(false)
  const fetchSpy = respond(200)
  vi.stubGlobal('fetch', fetchSpy)

  expect(await kindOf(requestJson('/any'))).toBe('offline')
  expect(fetchSpy).not.toHaveBeenCalled()
})

it('passes a caller abort through instead of reporting a failure', async () => {
  vi.stubGlobal('fetch', hang)
  const controller = new AbortController()
  const result = kindOf(requestJson('/cancelled', { signal: controller.signal }))
  controller.abort()
  expect(await result).toBe('other')
})
