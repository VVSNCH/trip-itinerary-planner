import { useState } from 'react'
import { COPY, LABELS, MESSAGES, NOMINATIM } from '@/constants'
import {
  AddIcon,
  Button,
  CheckIcon,
  Chip,
  CloseIcon,
  IconButton,
  SearchIcon,
  Skeleton,
  Text,
  TextField,
} from '@/components/common'
import { Notice, type NoticeTone } from '@/components/feedback'
import { addPlace, useTrips } from '@/context'
import type { RequestErrorKind } from '@/services/http'
import { toViewbox } from '@/services/nominatim'
import type { PlaceSearchResult, Trip } from '@/types'
import { formatShortDay } from '@/utils/dates'
import { plural } from '@/utils/format'
import { usePlaceSearch } from '../../hooks/usePlaceSearch'
import { coordinateKey } from '../../utils/coordinateKey'
import {
  Header,
  NoResults,
  Panel,
  ResultList,
  ResultRow,
  ResultText,
  TitleBlock,
} from './SearchPanel.styles'

export interface SearchPanelProps {
  trip: Trip
  dayId: number
  onClose?: () => void
}

const SKELETON_ROWS = 4

const errorNotices: Record<
  RequestErrorKind,
  { tone: NoticeTone; message: string; canRetry: boolean }
> = {
  'rate-limited': { tone: 'busy', message: MESSAGES.SEARCH_RATE_LIMITED, canRetry: true },
  offline: { tone: 'offline', message: MESSAGES.OFFLINE, canRetry: false },
  timeout: { tone: 'info', message: MESSAGES.SEARCH_FAILED, canRetry: true },
  failed: { tone: 'info', message: MESSAGES.SEARCH_FAILED, canRetry: true },
}

export const SearchPanel = ({ trip, dayId, onClose }: SearchPanelProps) => {
  const { dispatch } = useTrips()
  const [query, setQuery] = useState('')
  const viewbox = toViewbox(trip.days.flatMap((day) => day.places))
  const { state, isTooShort, retry } = usePlaceSearch(query, viewbox)

  const dayIndex = trip.days.findIndex((day) => day.id === dayId)
  const day = trip.days[dayIndex]
  if (!day) return null
  const dayNumber = dayIndex + 1

  const plannedOnDay = new Map(
    trip.days.flatMap((tripDay, index) =>
      tripDay.places.map((place) => [coordinateKey(place), index + 1] as const)
    )
  )

  const handleAdd = (result: PlaceSearchResult) =>
    dispatch(addPlace(trip.id, day.id, result))

  const notice = state.status === 'error' ? errorNotices[state.kind] : null

  return (
    <Panel>
      <Header>
        <TitleBlock>
          <Text variant="overline">
            {COPY.addingTo(dayNumber, formatShortDay(day.date))}
          </Text>
          <Text variant="title" as="h2">
            {LABELS.SEARCH_PLACES}
          </Text>
        </TitleBlock>
        {onClose && (
          <IconButton label={LABELS.CLOSE} onClick={onClose}>
            <CloseIcon />
          </IconButton>
        )}
      </Header>

      <TextField
        label={LABELS.SEARCH_PLACES}
        value={query}
        onChange={setQuery}
        startIcon={<SearchIcon />}
        endAdornment={
          query && (
            <IconButton
              label={LABELS.CLEAR_SEARCH}
              size="sm"
              onClick={() => setQuery('')}
            >
              <CloseIcon />
            </IconButton>
          )
        }
        autoFocus
      />

      {isTooShort && (
        <Text variant="caption" tone="muted">
          {COPY.searchTooShort(NOMINATIM.MIN_QUERY_LENGTH)}
        </Text>
      )}

      {state.status === 'loading' && (
        <ResultList aria-busy="true">
          {Array.from({ length: SKELETON_ROWS }, (_, index) => (
            <ResultRow key={index}>
              <ResultText>
                <Skeleton width="65%" />
                <Skeleton width="30%" />
                <Skeleton width="80%" />
              </ResultText>
            </ResultRow>
          ))}
        </ResultList>
      )}

      {notice && (
        <Notice
          tone={notice.tone}
          message={notice.message}
          onAction={notice.canRetry ? retry : undefined}
        />
      )}

      {state.status === 'done' && state.results.length === 0 && (
        <NoResults>
          <Text variant="subheading" align="center">
            {COPY.searchNoMatch(query.trim())}
          </Text>
          <Text tone="secondary" align="center">
            {MESSAGES.SEARCH_EMPTY_HINT}
          </Text>
          <Button variant="text" onClick={() => setQuery('')}>
            {LABELS.CLEAR_SEARCH}
          </Button>
        </NoResults>
      )}

      {state.status === 'done' && state.results.length > 0 && (
        <>
          <Text variant="caption" tone="secondary">
            {plural(state.results.length, 'result')}
          </Text>
          <ResultList>
            {state.results.map((result) => {
              const onDay = plannedOnDay.get(coordinateKey(result))
              return (
                <ResultRow key={result.key}>
                  <ResultText>
                    <Text variant="subheading" truncate>
                      {result.name}
                    </Text>
                    <Text variant="overline" truncate>
                      {[result.category, result.area].filter(Boolean).join(' · ')}
                    </Text>
                    <Text tone="secondary" truncate>
                      {result.address}
                    </Text>
                  </ResultText>
                  {onDay ? (
                    <Chip icon={<CheckIcon />} label={COPY.onDay(onDay)} />
                  ) : (
                    <IconButton
                      label={COPY.addToDay(result.name, dayNumber)}
                      variant="outlined"
                      onClick={() => handleAdd(result)}
                    >
                      <AddIcon />
                    </IconButton>
                  )}
                </ResultRow>
              )
            })}
          </ResultList>
        </>
      )}
    </Panel>
  )
}
