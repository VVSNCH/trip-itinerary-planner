import { REQUEST_TIMEOUT_MS } from '@/constants'

export type RequestErrorKind = 'offline' | 'rate-limited' | 'timeout' | 'failed'

export class RequestError extends Error {
  constructor(
    readonly kind: RequestErrorKind,
    message: string = kind
  ) {
    super(message)
    this.name = 'RequestError'
  }
}

interface RequestOptions {
  signal?: AbortSignal
  timeoutMs?: number
}

const HTTP_TOO_MANY_REQUESTS = 429

const isOffline = () => typeof navigator !== 'undefined' && !navigator.onLine

// The only place in the app that calls fetch. A caller's own abort is rethrown
// untouched so it can be told apart from a failure.
export const requestJson = async (
  url: string,
  { signal, timeoutMs = REQUEST_TIMEOUT_MS }: RequestOptions = {}
): Promise<unknown> => {
  if (isOffline()) throw new RequestError('offline')

  const controller = new AbortController()
  const cancel = () => controller.abort()
  if (signal?.aborted) cancel()
  signal?.addEventListener('abort', cancel)
  const timer = setTimeout(cancel, timeoutMs)

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    })
    if (response.status === HTTP_TOO_MANY_REQUESTS) throw new RequestError('rate-limited')
    if (!response.ok) throw new RequestError('failed', `HTTP ${response.status}`)
    return await response.json()
  } catch (error) {
    if (error instanceof RequestError || signal?.aborted) throw error
    if (controller.signal.aborted) throw new RequestError('timeout')
    throw new RequestError(isOffline() ? 'offline' : 'failed')
  } finally {
    clearTimeout(timer)
    signal?.removeEventListener('abort', cancel)
  }
}
