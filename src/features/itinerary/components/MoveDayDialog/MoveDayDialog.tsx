import { COPY, DIALOGS, LABELS } from '@/constants'
import { Button, Dialog } from '@/components/common'
import type { Day, Place } from '@/types'
import { formatShortDay } from '@/utils/dates'
import { plural } from '@/utils/format'
import { Choices } from './MoveDayDialog.styles'

export interface MoveDayDialogProps {
  place: Place
  days: Day[]
  currentDayId: number
  onMove: (dayId: number) => void
  onClose: () => void
}

// The tap-friendly way to move a place to another day, no dragging needed.
export const MoveDayDialog = ({
  place,
  days,
  currentDayId,
  onMove,
  onClose,
}: MoveDayDialogProps) => (
  <Dialog
    open
    onClose={onClose}
    title={DIALOGS.MOVE_TO_DAY}
    description={place.name}
    actions={
      <Button variant="text" onClick={onClose}>
        {LABELS.CANCEL}
      </Button>
    }
  >
    <Choices>
      {days.map((day, index) =>
        day.id === currentDayId ? null : (
          <Button
            key={day.id}
            variant="secondary"
            fullWidth
            onClick={() => onMove(day.id)}
          >
            {COPY.dayOption(
              index + 1,
              formatShortDay(day.date),
              plural(day.places.length, 'place')
            )}
          </Button>
        )
      )}
    </Choices>
  </Dialog>
)
