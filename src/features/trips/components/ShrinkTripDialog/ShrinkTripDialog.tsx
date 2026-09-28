import { COPY, DIALOGS } from '@/constants'
import { ConfirmDialog, Text } from '@/components/common'
import type { TripInput } from '@/context'
import type { Day, Trip } from '@/types'
import { countDays, formatRange } from '@/utils/dates'
import { plural } from '@/utils/format'
import { Box, Struck } from './ShrinkTripDialog.styles'

export interface ShrinkTripDialogProps {
  trip: Trip
  changes: TripInput
  removedDays: Day[]
  onConfirm: () => void
  onCancel: () => void
}

export const ShrinkTripDialog = ({
  trip,
  changes,
  removedDays,
  onConfirm,
  onCancel,
}: ShrinkTripDialogProps) => {
  const [firstRemoved] = removedDays
  const dayLabel =
    removedDays.length === 1 && firstRemoved
      ? `Day ${trip.days.indexOf(firstRemoved) + 1}`
      : plural(removedDays.length, 'day')
  const placeCount = removedDays.reduce((count, day) => count + day.places.length, 0)
  const verb = removedDays.length === 1 ? 'has' : 'have'
  const newRange = formatRange(changes.startDate, changes.endDate)
  const newLength = plural(countDays(changes.startDate, changes.endDate), 'day')

  return (
    <ConfirmDialog
      open
      title={DIALOGS.SHRINK_TITLE}
      message={COPY.removedPlaces(dayLabel, plural(placeCount, 'place'), verb)}
      confirmLabel={DIALOGS.SHRINK_CONFIRM}
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      <Box>
        <Text variant="overline">{trip.name}</Text>
        <Struck>{formatRange(trip.startDate, trip.endDate)}</Struck>
        <Text>
          {newRange} · {newLength}
        </Text>
      </Box>
    </ConfirmDialog>
  )
}
