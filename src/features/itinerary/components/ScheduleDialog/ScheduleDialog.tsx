import { useId, useState, type FormEvent } from 'react'
import { COPY, DIALOGS, LABELS, MESSAGES, SCHEDULE } from '@/constants'
import { Button, Dialog, Text, TextField } from '@/components/common'
import type { Day } from '@/types'
import { plural } from '@/utils/format'
import { Form } from './ScheduleDialog.styles'

export interface ScheduleDialogProps {
  day: Day
  dayNumber: number
  onSave: (start: string) => void
  onClose: () => void
}

export const ScheduleDialog = ({
  day,
  dayNumber,
  onSave,
  onClose,
}: ScheduleDialogProps) => {
  const formId = useId()
  const [start, setStart] = useState(day.places[0]?.time ?? SCHEDULE.DEFAULT_START)

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (start) onSave(start)
  }

  return (
    <Dialog
      open
      onClose={onClose}
      title={DIALOGS.FILL_TIMES}
      description={COPY.scheduleFor(dayNumber, plural(day.places.length, 'place'))}
      actions={
        <>
          <Button variant="text" onClick={onClose}>
            {LABELS.CANCEL}
          </Button>
          <Button type="submit" form={formId} disabled={!start}>
            {LABELS.FILL_TIMES}
          </Button>
        </>
      }
    >
      <Form id={formId} onSubmit={handleSubmit} noValidate>
        <TextField
          label={LABELS.START_TIME}
          type="time"
          value={start}
          onChange={setStart}
          autoFocus
        />
        <Text variant="caption" tone="secondary">
          {MESSAGES.SCHEDULE_HINT}
        </Text>
      </Form>
    </Dialog>
  )
}
