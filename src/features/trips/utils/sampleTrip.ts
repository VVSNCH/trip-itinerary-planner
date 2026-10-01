import { addDays } from 'date-fns'
import type { TripDraft } from '@/context'
import sample from '@/mocks/tamil-nadu-temples.json'
import { toISODate } from '@/utils/dates'
import { redateDays } from './days'

const SAMPLE_START_OFFSET_DAYS = 7

// The mock keeps its places; only the dates move, so the sample is always upcoming.
export const buildSampleTrip = (today: Date): TripDraft => {
  const startDate = toISODate(addDays(today, SAMPLE_START_OFFSET_DAYS))
  const endDate = toISODate(
    addDays(today, SAMPLE_START_OFFSET_DAYS + sample.days.length - 1)
  )
  return {
    name: sample.name,
    startDate,
    endDate,
    days: redateDays(sample.days, startDate, endDate),
  }
}
