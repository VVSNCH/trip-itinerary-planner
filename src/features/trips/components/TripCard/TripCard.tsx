import { COPY, LABELS, buildPlannerPath } from '@/constants'
import {
  CalendarIcon,
  Card,
  Chip,
  CopyIcon,
  DeleteIcon,
  EditIcon,
  Menu,
  ShareIcon,
  Text,
} from '@/components/common'
import type { Trip } from '@/types'
import { formatRange } from '@/utils/dates'
import { plural } from '@/utils/format'
import type { TripStatus } from '../../utils/tripStatus'
import { TripThumbnail } from '../TripThumbnail/TripThumbnail'
import {
  Body,
  DateLine,
  Footer,
  MenuSlot,
  Thumb,
  TitleLink,
  TitleRow,
} from './TripCard.styles'

const statusChip = { upcoming: 'brand', ongoing: 'accent', past: 'neutral' } as const

const statusLabel = (status: TripStatus) => {
  if (status.kind === 'past') return LABELS.PAST
  if (status.kind === 'ongoing') return COPY.dayOf(status.day, status.dayCount)
  return status.daysAway === 1 ? LABELS.TOMORROW : COPY.startsIn(status.daysAway)
}

export interface TripCardProps {
  trip: Trip
  status: TripStatus
  onRename: () => void
  onDuplicate: () => void
  onChangeDates: () => void
  onShare: () => void
  onDelete: () => void
}

export const TripCard = ({
  trip,
  status,
  onRename,
  onDuplicate,
  onChangeDates,
  onShare,
  onDelete,
}: TripCardProps) => {
  const placeCount = trip.days.reduce((count, day) => count + day.places.length, 0)

  return (
    <Card padding="none" interactive>
      <Thumb>
        <TripThumbnail trip={trip} />
      </Thumb>
      <Body>
        <TitleRow>
          <TitleLink to={buildPlannerPath(trip.id)}>{trip.name}</TitleLink>
          <MenuSlot>
            <Menu
              label={LABELS.TRIP_ACTIONS}
              items={[
                {
                  id: 'rename',
                  label: LABELS.RENAME,
                  icon: <EditIcon />,
                  onSelect: onRename,
                },
                {
                  id: 'dates',
                  label: LABELS.CHANGE_DATES,
                  icon: <CalendarIcon />,
                  onSelect: onChangeDates,
                },
                {
                  id: 'duplicate',
                  label: LABELS.DUPLICATE,
                  icon: <CopyIcon />,
                  onSelect: onDuplicate,
                },
                {
                  id: 'share',
                  label: LABELS.SHARE,
                  icon: <ShareIcon />,
                  onSelect: onShare,
                },
                {
                  id: 'delete',
                  label: LABELS.DELETE,
                  icon: <DeleteIcon />,
                  tone: 'danger',
                  dividerBefore: true,
                  onSelect: onDelete,
                },
              ]}
            />
          </MenuSlot>
        </TitleRow>
        <DateLine>
          <CalendarIcon />
          <Text tone="secondary">{formatRange(trip.startDate, trip.endDate)}</Text>
        </DateLine>
        <Footer>
          <Text variant="overline">
            {plural(placeCount, 'place')} · {plural(trip.days.length, 'day')}
          </Text>
          <Chip tone={statusChip[status.kind]} label={statusLabel(status)} />
        </Footer>
      </Body>
    </Card>
  )
}
