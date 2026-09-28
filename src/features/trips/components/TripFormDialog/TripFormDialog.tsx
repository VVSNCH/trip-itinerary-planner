import { useId, useState, type FormEvent } from 'react'
import { LABELS, TRIP_NAME_MAX_LENGTH, VALIDATION } from '@/constants'
import {
  Button,
  Chip,
  DateRangePicker,
  Dialog,
  Text,
  TextField,
  type DateRange,
} from '@/components/common'
import type { TripInput } from '@/context'
import { countDays, formatRange } from '@/utils/dates'
import { plural } from '@/utils/format'
import { Form, Summary } from './TripFormDialog.styles'

export interface TripFormDialogProps {
  title: string
  submitLabel: string
  fields: 'all' | 'name' | 'dates'
  initial?: TripInput
  onSubmit: (values: TripInput) => void
  onClose: () => void
}

export const TripFormDialog = ({
  title,
  submitLabel,
  fields,
  initial,
  onSubmit,
  onClose,
}: TripFormDialogProps) => {
  const formId = useId()
  const [name, setName] = useState(initial?.name ?? '')
  const [range, setRange] = useState<DateRange>({
    start: initial?.startDate ?? null,
    end: initial?.endDate ?? null,
  })
  const [showErrors, setShowErrors] = useState(false)

  const trimmedName = name.trim()
  const { start, end } = range

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!trimmedName || !start || !end) {
      setShowErrors(true)
      return
    }
    onSubmit({ name: trimmedName, startDate: start, endDate: end })
  }

  return (
    <Dialog
      open
      onClose={onClose}
      title={title}
      actions={
        <>
          <Button variant="text" onClick={onClose}>
            {LABELS.CANCEL}
          </Button>
          <Button type="submit" form={formId}>
            {submitLabel}
          </Button>
        </>
      }
    >
      <Form id={formId} onSubmit={handleSubmit} noValidate>
        {fields !== 'dates' && (
          <TextField
            label={LABELS.TRIP_NAME}
            value={name}
            onChange={setName}
            maxLength={TRIP_NAME_MAX_LENGTH}
            error={showErrors && !trimmedName}
            helperText={showErrors && !trimmedName ? VALIDATION.NAME_REQUIRED : undefined}
            autoFocus
          />
        )}
        {fields !== 'name' && (
          <>
            <DateRangePicker value={range} onChange={setRange} />
            <Summary>
              {start && end ? (
                <>
                  <Text tone="secondary">{formatRange(start, end)}</Text>
                  <Chip tone="brand" label={plural(countDays(start, end), 'day')} />
                </>
              ) : (
                <Text tone={showErrors ? 'danger' : 'secondary'}>
                  {VALIDATION.DATES_REQUIRED}
                </Text>
              )}
            </Summary>
          </>
        )}
      </Form>
    </Dialog>
  )
}
