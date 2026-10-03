import { useNavigate } from 'react-router-dom'
import { LABELS, ROUTES, buildPlannerPath, buildTimelinePath } from '@/constants'
import {
  AddIcon,
  BackIcon,
  Button,
  IconButton,
  ListIcon,
  ShareIcon,
  Tabs,
  Text,
  TimelineIcon,
} from '@/components/common'
import type { Trip } from '@/types'
import { formatRange } from '@/utils/dates'
import { plural } from '@/utils/format'
import { Actions, Bar, MobileActions, Nav, TitleBlock } from './PlannerHeader.styles'

export type PlannerHeaderView = 'planner' | 'timeline'

export interface PlannerHeaderProps {
  trip: Trip
  view: PlannerHeaderView
  onAddPlace?: () => void
  onShare?: () => void
  onViewChange?: (view: PlannerHeaderView) => void
}

export const PlannerHeader = ({
  trip,
  view,
  onAddPlace,
  onShare,
  onViewChange,
}: PlannerHeaderProps) => {
  const navigate = useNavigate()
  const placeCount = trip.days.reduce((count, day) => count + day.places.length, 0)

  const handleViewChange = (next: PlannerHeaderView) =>
    onViewChange
      ? onViewChange(next)
      : navigate(
          next === 'planner' ? buildPlannerPath(trip.id) : buildTimelinePath(trip.id)
        )

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
      {(onShare || onAddPlace) && (
        <Actions>
          {onShare && (
            <Button variant="secondary" startIcon={<ShareIcon />} onClick={onShare}>
              {LABELS.SHARE}
            </Button>
          )}
          {onAddPlace && (
            <Button startIcon={<AddIcon />} onClick={onAddPlace}>
              {LABELS.ADD_PLACE}
            </Button>
          )}
        </Actions>
      )}
      <MobileActions>
        {view === 'planner' ? (
          <IconButton
            label={LABELS.TIMELINE}
            onClick={() => handleViewChange('timeline')}
          >
            <TimelineIcon />
          </IconButton>
        ) : (
          <IconButton label={LABELS.PLANNER} onClick={() => handleViewChange('planner')}>
            <ListIcon />
          </IconButton>
        )}
        {onShare && (
          <IconButton label={LABELS.SHARE} onClick={onShare}>
            <ShareIcon />
          </IconButton>
        )}
      </MobileActions>
    </Bar>
  )
}
