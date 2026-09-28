import { useNavigate } from 'react-router-dom'
import { LABELS, ROUTES, buildPlannerPath, buildTimelinePath } from '@/constants'
import {
  AddIcon,
  BackIcon,
  Button,
  IconButton,
  ListIcon,
  Tabs,
  Text,
  TimelineIcon,
} from '@/components/common'
import type { Trip } from '@/types'
import { formatRange } from '@/utils/dates'
import { plural } from '@/utils/format'
import { Actions, Bar, Nav, TitleBlock } from './PlannerHeader.styles'

type View = 'planner' | 'timeline'

export interface PlannerHeaderProps {
  trip: Trip
  view: View
  onAddPlace?: () => void
}

export const PlannerHeader = ({ trip, view, onAddPlace }: PlannerHeaderProps) => {
  const navigate = useNavigate()
  const placeCount = trip.days.reduce((count, day) => count + day.places.length, 0)

  const handleViewChange = (next: View) =>
    navigate(next === 'planner' ? buildPlannerPath(trip.id) : buildTimelinePath(trip.id))

  return (
    <Bar>
      <IconButton label={LABELS.BACK_TO_TRIPS} onClick={() => navigate(ROUTES.TRIPS)}>
        <BackIcon />
      </IconButton>
      <TitleBlock>
        <Text variant="title" as="h1" truncate>
          {trip.name}
        </Text>
        <Text variant="caption" tone="secondary" truncate>
          {formatRange(trip.startDate, trip.endDate)} · {plural(placeCount, 'place')}
        </Text>
      </TitleBlock>
      <Nav>
        <Tabs
          label={LABELS.VIEW}
          value={view}
          onChange={handleViewChange}
          items={[
            { value: 'planner', label: LABELS.PLANNER, icon: <ListIcon /> },
            { value: 'timeline', label: LABELS.TIMELINE, icon: <TimelineIcon /> },
          ]}
        />
      </Nav>
      {onAddPlace && (
        <Actions>
          <Button startIcon={<AddIcon />} onClick={onAddPlace}>
            {LABELS.ADD_PLACE}
          </Button>
        </Actions>
      )}
    </Bar>
  )
}
