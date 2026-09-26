import { act, fireEvent, render, screen } from '@testing-library/react'
import { STORAGE_KEYS, STORAGE_WRITE_DEBOUNCE_MS } from '@/constants'
import { createTrip } from './actions'
import { TripProvider } from './TripProvider'
import { useTrips } from './useTrips'

const TripCount = () => {
  const { trips, dispatch } = useTrips()
  const handleCreate = () =>
    dispatch(
      createTrip({ name: 'Lisbon', startDate: '2026-10-09', endDate: '2026-10-13' })
    )

  return (
    <>
      <p>{trips.length} trips</p>
      <button onClick={handleCreate}>Create</button>
    </>
  )
}

const renderApp = () =>
  render(
    <TripProvider>
      <TripCount />
    </TripProvider>
  )

beforeEach(() => {
  localStorage.clear()
  vi.useFakeTimers()
})

afterEach(() => vi.useRealTimers())

it('keeps a created trip across a reload', () => {
  const first = renderApp()
  fireEvent.click(screen.getByRole('button', { name: 'Create' }))
  act(() => vi.advanceTimersByTime(STORAGE_WRITE_DEBOUNCE_MS))
  first.unmount()

  renderApp()
  expect(screen.getByText('1 trips')).toBeInTheDocument()
})

it('waits for the debounce before writing', () => {
  renderApp()
  act(() => vi.advanceTimersByTime(STORAGE_WRITE_DEBOUNCE_MS))
  fireEvent.click(screen.getByRole('button', { name: 'Create' }))
  fireEvent.click(screen.getByRole('button', { name: 'Create' }))

  expect(localStorage.getItem(STORAGE_KEYS.TRIPS)).toBe('[]')

  act(() => vi.advanceTimersByTime(STORAGE_WRITE_DEBOUNCE_MS))
  expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.TRIPS) ?? '[]')).toHaveLength(2)
})

it('saves immediately when the page is closed', () => {
  renderApp()
  fireEvent.click(screen.getByRole('button', { name: 'Create' }))
  window.dispatchEvent(new Event('pagehide'))

  expect(JSON.parse(localStorage.getItem(STORAGE_KEYS.TRIPS) ?? '[]')).toHaveLength(1)
})
