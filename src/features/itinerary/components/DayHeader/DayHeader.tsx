import { COPY, LABELS } from '@/constants'
import { AddIcon, Button, ClockIcon, Text } from '@/components/common'
import type { Day } from '@/types'
import { formatLongDay } from '@/utils/dates'
import { summarizeDay } from '../../utils/timing'
import { Actions, Header, TitleBlock } from './DayHeader.styles'

export interface DayHeaderProps {
  day: Day
  dayNumber: number
  onAddPlace?: () => void
  onSchedule?: () => void
}

export const DayHeader = ({ day, dayNumber, onAddPlace, onSchedule }: DayHeaderProps) => (
  <Header>
    <TitleBlock>
      <Text variant="overline">{COPY.day(dayNumber)}</Text>
      <Text variant="heading" as="h2">
        {formatLongDay(day.date)}
      </Text>
      <Text tone="secondary">{summarizeDay(day.places)}</Text>
    </TitleBlock>
    <Actions>
      {onSchedule && day.places.length > 0 && (
        <Button variant="text" startIcon={<ClockIcon />} onClick={onSchedule}>
          {LABELS.FILL_TIMES}
        </Button>
      )}
      {onAddPlace && (
        <Button variant="text" startIcon={<AddIcon />} onClick={onAddPlace}>
          {LABELS.ADD}
        </Button>
      )}
    </Actions>
  </Header>
)
