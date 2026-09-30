import { act, renderHook } from '@testing-library/react'
import { NOMINATIM } from '@/constants'
import { usePlaceSearch } from './usePlaceSearch'

const result = {
  place_id: 1,
  lat: '38.7',
  lon: '-9.1',
  display_name: 'Miradouro da Graça, Lisboa',
  name: 'Miradouro da Graça',
  type: 'viewpoint',
}

beforeEach(() => vi.useFakeTimers())
afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

it('sends one request after typing stops, not one per keystroke', async () => {
  const fetchSpy = vi.fn(async () => new Response(JSON.stringify([result])))
  vi.stubGlobal('fetch', fetchSpy)

  const { result: hook, rerender } = renderHook(
    ({ query }) => usePlaceSearch(query, null),
    {
      initialProps: { query: 'gra' },
    }
  )
  rerender({ query: 'grac' })
  rerender({ query: 'graca one' })

  await act(() => vi.advanceTimersByTimeAsync(NOMINATIM.SEARCH_DEBOUNCE_MS))

  expect(fetchSpy).toHaveBeenCalledTimes(1)
  expect(hook.current.state).toMatchObject({ status: 'done', results: [{ key: '1' }] })
})

it('does not search below the minimum length', () => {
  const fetchSpy = vi.fn()
  vi.stubGlobal('fetch', fetchSpy)

  const { result: hook } = renderHook(() => usePlaceSearch('gr', null))
  act(() => vi.advanceTimersByTime(NOMINATIM.SEARCH_DEBOUNCE_MS))

  expect(fetchSpy).not.toHaveBeenCalled()
  expect(hook.current).toMatchObject({ isTooShort: true, state: { status: 'idle' } })
})

it('reports a rate limit and searches again on retry', async () => {
  const fetchSpy = vi
    .fn()
    .mockResolvedValueOnce(new Response('[]', { status: 429 }))
    .mockResolvedValueOnce(new Response(JSON.stringify([result])))
  vi.stubGlobal('fetch', fetchSpy)

  const { result: hook } = renderHook(() => usePlaceSearch('graca retry', null))
  await act(() => vi.advanceTimersByTimeAsync(NOMINATIM.SEARCH_DEBOUNCE_MS))
  expect(hook.current.state).toEqual({ status: 'error', kind: 'rate-limited' })

  act(() => hook.current.retry())
  await act(() => vi.advanceTimersByTimeAsync(NOMINATIM.SEARCH_DEBOUNCE_MS))
  expect(hook.current.state).toMatchObject({ status: 'done' })
})
