import { useState } from 'react'
import { DndProvider } from 'react-dnd'
import { COPY, LABELS, MAP, MESSAGES } from '@/constants'
import { ListIcon, MapIcon, Sheet, ToggleGroup } from '@/components/common'
import { ErrorBoundary, Notice } from '@/components/feedback'
import StopCard from '@/features/map/components/StopCard'
import TripMap from '@/features/map/components/TripMap'
import SearchPanel from '@/features/places/components/SearchPanel'
import ShareDialog from '@/features/share/components/ShareDialog'
import { useMinWidth } from '@/hooks/useMinWidth'
import type { Trip } from '@/types'
import { formatShortDay } from '@/utils/dates'
import { dndBackend, dndOptions } from '../../dnd/backend'
import { usePlannerParams, type PlannerView as View } from '../../hooks/usePlannerParams'
import { DayStrip } from '../DayStrip/DayStrip'
import { ItineraryPanel } from '../ItineraryPanel/ItineraryPanel'
import { PlannerHeader, type PlannerHeaderView } from '../PlannerHeader/PlannerHeader'
import {
  Body,
  BottomBar,
  MapArea,
  MapFallback,
  Page,
  Sidebar,
} from './PlannerView.styles'

export interface PlannerViewProps {
  trip: Trip
  readOnly?: boolean
  onViewChange?: (view: PlannerHeaderView) => void
}

export const PlannerView = ({
  trip,
  readOnly = false,
  onViewChange,
}: PlannerViewProps) => {
  const {
    day,
    selectedPlaceId,
    isSearchOpen,
    view,
    selectDay,
    selectPlace,
    openSearch,
    closeSearch,
    setView,
  } = usePlannerParams(trip)
  const isDesktop = useMinWidth('md')
  const [hoverDayId, setHoverDayId] = useState<number | null>(null)
  const [isSharing, setIsSharing] = useState(false)

  const dayNumber = day ? trip.days.indexOf(day) + 1 : 0
  const canSearch = !readOnly && isSearchOpen && day
  const showInlineSearch = isDesktop && canSearch
  // On a phone the list and the map take turns; on a wide screen both show.
  const showList = isDesktop || view === 'list'
  const showMap = isDesktop || view === 'map'

  return (
    <DndProvider backend={dndBackend} options={dndOptions}>
      <Page $isMapOnly={!showList}>
        <PlannerHeader
          trip={trip}
          view="planner"
          onAddPlace={readOnly ? undefined : openSearch}
          onShare={readOnly ? undefined : () => setIsSharing(true)}
          onViewChange={onViewChange}
        />
        <Body $isMapOnly={!showList}>
          <Sidebar $isMapOnly={!showList}>
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
                {day && showList && (
                  <ItineraryPanel
                    trip={trip}
                    day={day}
                    dayNumber={dayNumber}
                    selectedPlaceId={selectedPlaceId}
                    hoverDayId={hoverDayId}
                    onSelectPlace={selectPlace}
                    onAddPlace={openSearch}
                    readOnly={readOnly}
                  />
                )}
              </>
            )}
          </Sidebar>
          {showMap && day && (
            <MapArea>
              <ErrorBoundary
                fallback={(reset) => (
                  <MapFallback>
                    <Notice message={MESSAGES.MAP_FAILED} onAction={reset} />
                  </MapFallback>
                )}
              >
                <TripMap
                  dayId={day.id}
                  places={day.places}
                  selectedPlaceId={selectedPlaceId}
                  onSelectPlace={selectPlace}
                  bottomInset={isDesktop ? 0 : MAP.PHONE_BOTTOM_INSET}
                />
              </ErrorBoundary>
            </MapArea>
          )}
        </Body>

        {!isDesktop && (
          <BottomBar $hasCard={view === 'map' && Boolean(day)}>
            <ToggleGroup<View>
              label={LABELS.VIEW}
              value={view}
              onChange={setView}
              options={[
                { value: 'list', label: LABELS.LIST, icon: <ListIcon /> },
                { value: 'map', label: LABELS.MAP, icon: <MapIcon /> },
              ]}
            />
            {view === 'map' && day && (
              <StopCard
                places={day.places}
                selectedPlaceId={selectedPlaceId}
                onSelectPlace={selectPlace}
              />
            )}
          </BottomBar>
        )}

        {!isDesktop && !readOnly && day && (
          <Sheet
            open={isSearchOpen}
            onClose={closeSearch}
            title={LABELS.SEARCH_PLACES}
            overline={COPY.addingTo(dayNumber, formatShortDay(day.date))}
          >
            <SearchPanel trip={trip} dayId={day.id} withHeader={false} />
          </Sheet>
        )}
        {isSharing && <ShareDialog trip={trip} onClose={() => setIsSharing(false)} />}
      </Page>
    </DndProvider>
  )
}
