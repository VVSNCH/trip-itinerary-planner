import { Fragment } from 'react'
import { BUSY_DAY_MINS, COPY, LABELS } from '@/constants'
import {
  CheckIcon,
  ChevronRightIcon,
  Chip,
  ClockIcon,
  StopBadge,
  Text,
  TravelIcon,
} from '@/components/common'
import {
  dayProgress,
  isDayComplete,
  isPlaceOver,
  nowIndex,
} from '@/features/itinerary/utils/progress'
import {
  daySpan,
  formatDuration,
  plannedMinutes,
  summarizeDay,
} from '@/features/itinerary/utils/timing'
import { describeTransfer } from '@/features/itinerary/utils/walking'
import type { Day, Place } from '@/types'
import { formatLongDay, formatShortDay } from '@/utils/dates'
import {
  Body,
  ChipSlot,
  DayNode,
  Entry,
  NodeButton,
  NowDot,
  NowTime,
  OpenButton,
  Rail,
  StopNode,
  Time,
  TravelBody,
} from './TimelineDay.styles'

export interface TimelineDayProps {
  day: Day
  dayNumber: number
  arrivingFrom: { place: Place; dayNumber: number } | null
  isLast: boolean
  today: string
  now: { minutes: number; label: string }
  onOpen: () => void
  onToggleVisited?: (place: Place) => void
}

const MINUTES_PER_HOUR = 60

export const TimelineDay = ({
  day,
  dayNumber,
  arrivingFrom,
  isLast,
  today,
  now,
  onOpen,
  onToggleVisited,
}: TimelineDayProps) => {
  const span = daySpan(day.places)
  const isBusy = plannedMinutes(day.places) > BUSY_DAY_MINS
  const firstPlace = day.places[0]
  const progress = dayProgress(day.date, today)
  const isComplete = isDayComplete(day, progress)
  const isToday = progress === 'today'
  // On today's day, "now" goes before the first stop that hasn't started yet.
  const nowAt = isToday ? nowIndex(day.places, now.minutes) : -1

  const nowEntry = (
    <Entry>
      <NowTime>{now.label}</NowTime>
      <Rail $done $endsAtNode={isLast && nowAt === day.places.length}>
        <NowDot />
      </Rail>
      <Body>
        <Text variant="caption" tone="accent">
          {LABELS.NOW}
        </Text>
      </Body>
    </Entry>
  )

  return (
    <>
      {arrivingFrom && firstPlace && (
        <Entry>
          <span />
          <Rail $dashed $done={progress === 'past' || isToday} />
          <TravelBody>
            <Text variant="caption" tone="secondary">
              {COPY.fromPreviousDay(arrivingFrom.place.name, arrivingFrom.dayNumber)}
            </Text>
            <Chip
              tone="outline"
              icon={<TravelIcon />}
              label={describeTransfer(arrivingFrom.place, firstPlace)}
            />
          </TravelBody>
        </Entry>
      )}

      <Entry>
        <span />
        <Rail
          $startsAtNode={dayNumber === 1}
          $endsAtNode={isLast && !firstPlace && nowAt !== 0}
          $done={progress === 'past'}
        >
          <DayNode aria-hidden="true">{isComplete ? <CheckIcon /> : dayNumber}</DayNode>
        </Rail>
        <Body $gap="lg">
          <Text variant="overline">
            {COPY.day(dayNumber)} · {formatShortDay(day.date)}
          </Text>
          <OpenButton type="button" onClick={onOpen}>
            {formatLongDay(day.date)}
            <ChevronRightIcon fontSize="small" />
          </OpenButton>
          <Text tone="secondary">
            {firstPlace ? summarizeDay(day.places) : COPY.nothingPlanned(dayNumber)}
          </Text>
          {(isComplete || isToday || (isBusy && span)) && (
            <ChipSlot>
              {isComplete && (
                <Chip tone="neutral" icon={<CheckIcon />} label={LABELS.COMPLETED} />
              )}
              {isToday && !isComplete && <Chip tone="brand" label={LABELS.TODAY} />}
              {isBusy && span && (
                <Chip
                  tone="accent"
                  icon={<ClockIcon />}
                  label={COPY.hoursOut(
                    span.label,
                    Math.round(span.minutes / MINUTES_PER_HOUR)
                  )}
                />
              )}
            </ChipSlot>
          )}
        </Body>
      </Entry>

      {day.places.map((place, index) => {
        const isVisited = place.visited === true
        const isOver = isPlaceOver(place, progress, now.minutes)
        const isLastStop = index === day.places.length - 1
        const node = (
          <StopNode $isOver={isOver && !isVisited}>
            <StopBadge number={index + 1} visited={isVisited} />
          </StopNode>
        )

        return (
          <Fragment key={place.id}>
            {index === nowAt && nowEntry}
            <Entry>
              <Time>{place.time}</Time>
              <Rail
                $endsAtNode={isLast && isLastStop && nowAt !== day.places.length}
                $done={isVisited || isOver}
              >
                {onToggleVisited ? (
                  <NodeButton
                    type="button"
                    aria-pressed={isVisited}
                    aria-label={COPY.toggleVisited(place.name, isVisited)}
                    onClick={() => onToggleVisited(place)}
                  >
                    {node}
                  </NodeButton>
                ) : (
                  node
                )}
              </Rail>
              <Body>
                <Text variant="bodyStrong">{place.name}</Text>
                <Text variant="overline">
                  {[
                    place.category,
                    place.durationMins && formatDuration(place.durationMins),
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                </Text>
                {place.note && (
                  <Text variant="caption" tone="secondary">
                    {place.note}
                  </Text>
                )}
              </Body>
            </Entry>
          </Fragment>
        )
      })}
      {nowAt === day.places.length && nowEntry}
    </>
  )
}
