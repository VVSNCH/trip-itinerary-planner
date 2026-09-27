import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  parseISO,
  startOfMonth,
  startOfWeek,
} from 'date-fns'
import { useState } from 'react'
import { LABELS } from '@/constants'
import { formatDate, toISODate } from '@/utils/dates'
import { IconButton } from '../IconButton/IconButton'
import { Text } from '../Text/Text'
import { TextField } from '../TextField/TextField'
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from '../icons'
import {
  Calendar,
  Cell,
  DayButton,
  Fields,
  Grid,
  MonthHeader,
  Weekday,
  Wrapper,
} from './DateRangePicker.styles'

export interface DateRange {
  start: string | null
  end: string | null
}

export interface DateRangePickerProps {
  value: DateRange
  onChange: (value: DateRange) => void
}

const WEEK = { weekStartsOn: 1 } as const
const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

const ignore = () => {}

export const DateRangePicker = ({ value, onChange }: DateRangePickerProps) => {
  const [month, setMonth] = useState(() =>
    startOfMonth(value.start ? parseISO(value.start) : new Date())
  )

  const days = eachDayOfInterval({
    start: startOfWeek(month, WEEK),
    end: endOfWeek(endOfMonth(month), WEEK),
  })

  // First pick sets the start, second sets the end; anything else starts over.
  const handlePick = (iso: string) => {
    const { start, end } = value
    if (!start || end || iso < start) onChange({ start: iso, end: null })
    else onChange({ start, end: iso })
  }

  return (
    <Wrapper>
      <Fields>
        <TextField
          label={LABELS.START}
          value={value.start ? formatDate(value.start) : ''}
          placeholder={LABELS.NOT_SET}
          onChange={ignore}
          endAdornment={<CalendarIcon />}
          readOnly
        />
        <TextField
          label={LABELS.END}
          value={value.end ? formatDate(value.end) : ''}
          placeholder={LABELS.NOT_SET}
          onChange={ignore}
          endAdornment={<CalendarIcon />}
          readOnly
        />
      </Fields>

      <Calendar>
        <MonthHeader>
          <IconButton
            label={LABELS.PREVIOUS_MONTH}
            size="sm"
            onClick={() => setMonth((current) => addMonths(current, -1))}
          >
            <ChevronLeftIcon />
          </IconButton>
          <Text variant="bodyStrong">{format(month, 'MMMM yyyy')}</Text>
          <IconButton
            label={LABELS.NEXT_MONTH}
            size="sm"
            onClick={() => setMonth((current) => addMonths(current, 1))}
          >
            <ChevronRightIcon />
          </IconButton>
        </MonthHeader>

        <Grid>
          {WEEKDAYS.map((weekday) => (
            <Weekday key={weekday} aria-hidden="true">
              {weekday.charAt(0)}
            </Weekday>
          ))}
          {days.map((day) => {
            const iso = toISODate(day)
            if (!isSameMonth(day, month)) return <Cell key={iso} $inRange={false} />

            const { start, end } = value
            const isEdge = iso === start || iso === end
            const inRange = Boolean(start && end && iso >= start && iso <= end)

            return (
              <Cell key={iso} $inRange={inRange && start !== end}>
                <DayButton
                  $selected={isEdge}
                  aria-label={formatDate(iso)}
                  aria-pressed={isEdge}
                  onClick={() => handlePick(iso)}
                >
                  {format(day, 'd')}
                </DayButton>
              </Cell>
            )
          })}
        </Grid>
      </Calendar>
    </Wrapper>
  )
}
