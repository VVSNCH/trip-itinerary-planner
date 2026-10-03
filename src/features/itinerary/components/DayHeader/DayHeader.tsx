import { COPY, LABELS } from '@/constants'
import { AddIcon, Button, Text } from '@/components/common'
import type { Day } from '@/types'
import { formatLongDay } from '@/utils/dates'
import { summarizeDay } from '../../utils/timing'
import { Header, TitleBlock } from './DayHeader.styles'

export interface DayHeaderProps {
  day: Day
  dayNumber: number
  onAddPlace?: () => void
}

export const DayHeader = ({ day, dayNumber, onAddPlace }: DayHeaderProps) => (
  <Header>
    <TitleBlock>
      <Text variant="overline">{COPY.day(dayNumber)}</Text>
      <Text variant="heading" as="h2">
        {formatLongDay(day.date)}
      </Text>
      <Text tone="secondary">{summarizeDay(day.places)}</Text>
    </TitleBlock>
    {onAddPlace && (
      <Button variant="text" startIcon={<AddIcon />} onClick={onAddPlace}>
        {LABELS.ADD}
      </Button>
    )}
  </Header>
)
