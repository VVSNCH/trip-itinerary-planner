import { eachDayOfInterval, format, isAfter, parseISO } from 'date-fns'
import type { Day } from '@/types'
import { nextId } from '@/utils/nextId'

const ISO_DATE = 'yyyy-MM-dd'

export const datesInRange = (startDate: string, endDate: string): string[] => {
  const start = parseISO(startDate)
  const end = parseISO(endDate)
  if (isAfter(start, end)) return []
  return eachDayOfInterval({ start, end }).map((date) => format(date, ISO_DATE))
}

export const deriveDays = (startDate: string, endDate: string): Day[] =>
  datesInRange(startDate, endDate).map((date, index) => ({
    id: index + 1,
    date,
    places: [],
  }))

// Day N keeps its places when the dates move; days past the new end are dropped.
export const redateDays = (days: Day[], startDate: string, endDate: string): Day[] => {
  let id = nextId(days)
  return datesInRange(startDate, endDate).map((date, index) => {
    const existing = days[index]
    return existing ? { ...existing, date } : { id: id++, date, places: [] }
  })
}
