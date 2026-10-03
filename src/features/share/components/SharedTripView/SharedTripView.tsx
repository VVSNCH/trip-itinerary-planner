import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { LABELS, MESSAGES, PARAMS, buildPlannerPath } from '@/constants'
import { Button, CopyIcon, Text, ViewIcon } from '@/components/common'
import { importTrip, useTrips, type TripDraft } from '@/context'
import PlannerView from '@/features/itinerary/components/PlannerView'
import PlannerHeader, {
  type PlannerHeaderView,
} from '@/features/itinerary/components/PlannerHeader'
import TimelineView from '@/features/timeline/components/TimelineView'
import type { Trip } from '@/types'
import { nextId } from '@/utils/nextId'
import { Banner, BannerText } from './SharedTripView.styles'

// A shared trip isn't stored locally, so it gets a stand-in id until it's saved.
const UNSAVED_ID = 0

export const SharedTripView = ({ draft }: { draft: TripDraft }) => {
  const { trips, dispatch } = useTrips()
  const navigate = useNavigate()
  const { hash } = useLocation()
  const [view, setView] = useState<PlannerHeaderView>('planner')
  const trip = useMemo<Trip>(
    () => ({ ...draft, id: UNSAVED_ID, createdAt: '', updatedAt: '' }),
    [draft]
  )

  const handleSave = () => {
    const id = nextId(trips)
    dispatch(importTrip(draft))
    navigate(buildPlannerPath(id))
  }

  const handleOpenDay = (dayId: number) => {
    setView('planner')
    navigate({ search: `${PARAMS.DAY}=${dayId}`, hash })
  }

  return (
    <>
      <Banner role="note" aria-label={LABELS.SHARED_ITINERARY}>
        <ViewIcon />
        <BannerText>
          <Text variant="bodyStrong">{LABELS.SHARED_ITINERARY}</Text>
          <Text tone="secondary">{MESSAGES.SHARED_BANNER}</Text>
        </BannerText>
        <Button size="sm" startIcon={<CopyIcon />} onClick={handleSave}>
          {LABELS.SAVE_COPY}
        </Button>
      </Banner>
      {view === 'planner' ? (
        <PlannerView trip={trip} readOnly onViewChange={setView} />
      ) : (
        <>
          <PlannerHeader trip={trip} view="timeline" onViewChange={setView} />
          <TimelineView trip={trip} onOpenDay={handleOpenDay} />
        </>
      )}
    </>
  )
}
