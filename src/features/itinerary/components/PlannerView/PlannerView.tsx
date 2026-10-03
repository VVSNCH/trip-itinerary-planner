import { lazy, Suspense, useState, type ReactNode } from 'react'
import { DndProvider } from 'react-dnd'
import { COPY, LABELS, MAP, MESSAGES } from '@/constants'
import { ListIcon, MapIcon, Sheet, Skeleton, ToggleGroup } from '@/components/common'
import { ErrorBoundary, Notice } from '@/components/feedback'
import StopCard from '@/features/map/components/StopCard'
import SearchPanel from '@/features/places/components/SearchPanel'
import ShareDialog from '@/features/share/components/ShareDialog'
import { useMinWidth } from '@/hooks/useMinWidth'
import type { Trip } from '@/types'
import { formatShortDay } from '@/utils/dates'
import { dndBackend, dndOptions, isTouchDevice } from '../../dnd/backend'
import { usePlannerParams, type PlannerView as View } from '../../hooks/usePlannerParams'
import { DayStrip } from '../DayStrip/DayStrip'
import { DragPreview } from '../DragPreview/DragPreview'
import { ItineraryPanel } from '../ItineraryPanel/ItineraryPanel'
import { PlannerHeader, type PlannerHeaderView } from '../PlannerHeader/PlannerHeader'
import {
  Body,
  BottomBar,
  MapArea,
  MapFallback,
  MapLoading,
  Page,
  Sidebar,
} from './PlannerView.styles'

// Leaflet is the biggest dependency, so the map downloads only once it is shown.
const TripMap = lazy(() => import('@/features/map/components/TripMap'))

const searchFallback = <Notice tone="offline" message={MESSAGES.SEARCH_FAILED} />

export interface PlannerViewProps {
  trip: Trip
  banner?: ReactNode
  readOnly?: boolean
  onViewChange?: (view: PlannerHeaderView) => void
}

export const PlannerView = ({
  trip,
  banner,
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
  // From tablet width up there is room for the list and the map together.
  const isWide = useMinWidth('sm')
  const [hoverDayId, setHoverDayId] = useState<number | null>(null)
  const [isSharing, setIsSharing] = useState(false)

  const dayNumber = day ? trip.days.indexOf(day) + 1 : 0
  const canSearch = !readOnly && isSearchOpen && day
  const showInlineSearch = isDesktop && canSearch
  // On a phone the list and the map take turns; on a wider screen both show.
  const showList = isWide || view === 'list'
  const showMap = isWide || view === 'map'

  return (
    <DndProvider backend={dndBackend} options={dndOptions}>
      <Page $isMapOnly={!showList}>
        {banner}
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
              <ErrorBoundary fallback={() => searchFallback}>
                <SearchPanel trip={trip} dayId={day.id} onClose={closeSearch} />
              </ErrorBoundary>
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
                <Suspense
                  fallback={
                    <MapLoading>
                      <Skeleton shape="block" height="100%" />
                    </MapLoading>
                  }
                >
                  <TripMap
                    dayId={day.id}
                    places={day.places}
                    selectedPlaceId={selectedPlaceId}
                    onSelectPlace={selectPlace}
                    bottomInset={isWide ? 0 : MAP.PHONE_BOTTOM_INSET}
                  />
                </Suspense>
              </ErrorBoundary>
            </MapArea>
          )}
        </Body>

        {!isWide && (
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
            <ErrorBoundary fallback={() => searchFallback}>
              <SearchPanel trip={trip} dayId={day.id} withHeader={false} />
            </ErrorBoundary>
          </Sheet>
        )}
        {isSharing && <ShareDialog trip={trip} onClose={() => setIsSharing(false)} />}
        {isTouchDevice && !readOnly && <DragPreview />}
      </Page>
    </DndProvider>
  )
}
