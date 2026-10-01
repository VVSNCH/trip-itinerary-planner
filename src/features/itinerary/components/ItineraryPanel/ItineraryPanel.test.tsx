import { fireEvent, render, screen } from '@testing-library/react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TripProvider, useTrips } from '@/context'
import { buildSampleTrip } from '@/features/trips/utils/sampleTrip'
import { saveTrips } from '@/services/storage'
import { ThemeProviders } from '@/theme'
import { ItineraryPanel } from './ItineraryPanel'

const NOW = '2026-09-27T10:00:00.000Z'

const DayTwo = () => {
  const { trips } = useTrips()
  const trip = trips[0]
  const day = trip?.days[1]
  if (!trip || !day) return null
  return (
    <ItineraryPanel
      trip={trip}
      day={day}
      dayNumber={2}
      selectedPlaceId={null}
      hoverDayId={null}
      onSelectPlace={() => {}}
      onAddPlace={() => {}}
    />
  )
}

const renderDayTwo = () => {
  const sample = buildSampleTrip(new Date(2026, 9, 1))
  saveTrips([{ ...sample, id: 1, createdAt: NOW, updatedAt: NOW }])
  render(
    <ThemeProviders>
      <TripProvider>
        <DndProvider backend={HTML5Backend}>
          <DayTwo />
        </DndProvider>
      </TripProvider>
    </ThemeProviders>
  )
}

const stopNames = () =>
  screen.getAllByRole('button', { pressed: false }).map((button) => button.textContent)

beforeEach(() => localStorage.clear())

it('reorders a place with Ctrl and the arrow keys', () => {
  renderDayTwo()
  const first = screen.getByRole('button', { name: 'Mosteiro dos Jerónimos' })

  fireEvent.keyDown(first, { key: 'ArrowDown', ctrlKey: true })

  expect(stopNames()).toEqual([
    'Pastéis de Belém',
    'Mosteiro dos Jerónimos',
    'Torre de Belém',
    'MAAT',
  ])
  expect(screen.getByText('Mosteiro dos Jerónimos moved to stop 2.')).toBeInTheDocument()
})

it('moves a place to the next day with Ctrl and the right arrow', () => {
  renderDayTwo()

  fireEvent.keyDown(screen.getByRole('button', { name: 'MAAT' }), {
    key: 'ArrowRight',
    ctrlKey: true,
  })

  expect(stopNames()).not.toContain('MAAT')
  expect(screen.getByText('MAAT moved to Day 3.')).toBeInTheDocument()
})

it('ignores arrow keys pressed without Ctrl', () => {
  renderDayTwo()
  fireEvent.keyDown(screen.getByRole('button', { name: 'MAAT' }), { key: 'ArrowUp' })
  expect(stopNames().at(-1)).toBe('MAAT')
})
