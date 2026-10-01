import { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { COPY, LABELS } from '@/constants'
import { Sheet } from '@/components/common'
import SearchPanel from '@/features/places/components/SearchPanel'
import { useMinWidth } from '@/hooks/useMinWidth'
import type { Trip } from '@/types'
import { formatShortDay } from '@/utils/dates'
import { dndBackend, dndOptions } from '../../dnd/backend'
import { usePlannerParams } from '../../hooks/usePlannerParams'
import { DayStrip } from '../DayStrip/DayStrip'
import { ItineraryPanel } from '../ItineraryPanel/ItineraryPanel'
import { PlannerHeader } from '../PlannerHeader/PlannerHeader'
import { Body, MapArea, Page, Sidebar } from './PlannerView.styles'

export const PlannerView = ({ trip }: { trip: Trip }) => {
  const {
    day,
    selectedPlaceId,
    isSearchOpen,
    selectDay,
    selectPlace,
    openSearch,
    closeSearch,
  } = usePlannerParams(trip)
  const isDesktop = useMinWidth('md')
  const [hoverDayId, setHoverDayId] = useState<number | null>(null)

  const dayNumber = day ? trip.days.indexOf(day) + 1 : 0
  const showInlineSearch = isDesktop && isSearchOpen && day

  return (
    <DndProvider backend={dndBackend} options={dndOptions}>
      <Page>
        <PlannerHeader trip={trip} view="planner" onAddPlace={openSearch} />
        <Body>
          <Sidebar>
            {showInlineSearch ? (
              <SearchPanel trip={trip} dayId={day.id} onClose={closeSearch} />
            ) : (
              <>
                <DayStrip
                  trip={trip}
                  activeDayId={day?.id ?? 0}
                  hoverDayId={hoverDayId}
                  onSelectDay={selectDay}
                  onHoverDay={setHoverDayId}
                />
                {day && (
                  <ItineraryPanel
                    trip={trip}
                    day={day}
                    dayNumber={dayNumber}
                    selectedPlaceId={selectedPlaceId}
                    hoverDayId={hoverDayId}
                    onSelectPlace={selectPlace}
                    onAddPlace={openSearch}
                  />
                )}
              </>
            )}
          </Sidebar>
          <MapArea aria-hidden="true" />
        </Body>

        {!isDesktop && day && (
          <Sheet
            open={isSearchOpen}
            onClose={closeSearch}
            title={LABELS.SEARCH_PLACES}
            overline={COPY.addingTo(dayNumber, formatShortDay(day.date))}
          >
            <SearchPanel trip={trip} dayId={day.id} withHeader={false} />
          </Sheet>
        )}
      </Page>
    </DndProvider>
  )
}
