import { LABELS, buildPlannerPath } from '@/constants'
import {
  CalendarIcon,
  Card,
  Chip,
  DeleteIcon,
  EditIcon,
  Menu,
  Text,
} from '@/components/common'
import type { Trip } from '@/types'
import { formatRange } from '@/utils/dates'
import { plural } from '@/utils/format'
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

export interface TripCardProps {
  trip: Trip
  isPast: boolean
  onRename: () => void
  onChangeDates: () => void
  onDelete: () => void
}

export const TripCard = ({
  trip,
  isPast,
  onRename,
  onChangeDates,
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
          <Chip
            tone={isPast ? 'neutral' : 'brand'}
            label={isPast ? LABELS.PAST : LABELS.UPCOMING}
          />
        </Footer>
      </Body>
    </Card>
  )
}
