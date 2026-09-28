import { COPY, LABELS } from '@/constants'
import { Sheet, Tabs } from '@/components/common'
import SearchPanel from '@/features/places/components/SearchPanel'
import { useMinWidth } from '@/hooks/useMinWidth'
import type { Trip } from '@/types'
import { formatShortDay } from '@/utils/dates'
import { usePlannerParams } from '../../hooks/usePlannerParams'
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

  const dayNumber = day ? trip.days.indexOf(day) + 1 : 0
  const showInlineSearch = isDesktop && isSearchOpen && day

  return (
    <Page>
      <PlannerHeader trip={trip} view="planner" onAddPlace={openSearch} />
      <Body>
        <Sidebar>
          {showInlineSearch ? (
            <SearchPanel trip={trip} dayId={day.id} onClose={closeSearch} />
          ) : (
            <>
              <Tabs
                label={LABELS.DAYS}
                appearance="tiles"
                value={day?.id ?? 0}
                onChange={selectDay}
                items={trip.days.map((tripDay, index) => ({
                  value: tripDay.id,
                  label: COPY.day(index + 1),
                  sublabel: formatShortDay(tripDay.date),
                }))}
              />
              {day && (
                <ItineraryPanel
                  trip={trip}
                  day={day}
                  dayNumber={dayNumber}
                  selectedPlaceId={selectedPlaceId}
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
  )
}
