import { useId, useState, type FormEvent } from 'react'
import { DIALOGS, LABELS, MAX_DURATION_MINS, MESSAGES } from '@/constants'
import { Button, Dialog, TextField } from '@/components/common'
import type { PlaceChanges } from '@/context'
import type { Place } from '@/types'
import { Fields } from './PlaceTimeDialog.styles'

export interface PlaceTimeDialogProps {
  place: Place
  onSave: (changes: PlaceChanges) => void
  onClose: () => void
}

const parseDuration = (value: string) => {
  if (value.trim() === '') return null
  const mins = Number(value)
  return Number.isInteger(mins) && mins >= 0 && mins <= MAX_DURATION_MINS
    ? mins
    : undefined
}

export const PlaceTimeDialog = ({ place, onSave, onClose }: PlaceTimeDialogProps) => {
  const formId = useId()
  const [time, setTime] = useState(place.time ?? '')
  const [duration, setDuration] = useState(place.durationMins?.toString() ?? '')
  const durationMins = parseDuration(duration)
  const isDurationInvalid = durationMins === undefined

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (isDurationInvalid) return
    onSave({ time: time || null, durationMins })
  }

  return (
    <Dialog
      open
      onClose={onClose}
      title={DIALOGS.EDIT_TIME}
      description={place.name}
      actions={
        <>
          <Button variant="text" onClick={onClose}>
            {LABELS.CANCEL}
          </Button>
          <Button type="submit" form={formId}>
            {LABELS.SAVE}
          </Button>
        </>
      }
    >
      <Fields id={formId} onSubmit={handleSubmit} noValidate>
        <TextField
          label={LABELS.TIME}
          type="time"
          value={time}
          onChange={setTime}
          autoFocus
        />
        <TextField
          label={LABELS.DURATION}
          type="number"
          value={duration}
          onChange={setDuration}
          error={isDurationInvalid}
          helperText={isDurationInvalid ? MESSAGES.DURATION_INVALID : undefined}
        />
      </Fields>
    </Dialog>
  )
}
