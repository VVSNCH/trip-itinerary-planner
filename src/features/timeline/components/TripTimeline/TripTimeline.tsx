import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PARAMS, PARAM_VALUES, buildPlannerPath } from '@/constants'
import PlannerHeader from '@/features/itinerary/components/PlannerHeader'
import ShareDialog from '@/features/share/components/ShareDialog'
import type { Trip } from '@/types'
import { TimelineView } from '../TimelineView/TimelineView'

export const TripTimeline = ({ trip }: { trip: Trip }) => {
  const navigate = useNavigate()
  const [isSharing, setIsSharing] = useState(false)
  const plannerPath = buildPlannerPath(trip.id)

  return (
    <>
      <PlannerHeader
        trip={trip}
        view="timeline"
        onAddPlace={() =>
          navigate(`${plannerPath}?${PARAMS.PANEL}=${PARAM_VALUES.SEARCH_PANEL}`)
        }
        onShare={() => setIsSharing(true)}
      />
      <TimelineView
        trip={trip}
        onOpenDay={(dayId) => navigate(`${plannerPath}?${PARAMS.DAY}=${dayId}`)}
      />
      {isSharing && <ShareDialog trip={trip} onClose={() => setIsSharing(false)} />}
    </>
  )
}
