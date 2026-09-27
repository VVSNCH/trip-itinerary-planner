import {
  differenceInCalendarDays,
  format,
  isSameMonth,
  isSameYear,
  parseISO,
} from 'date-fns'

const ISO_DATE = 'yyyy-MM-dd'

export const toISODate = (date: Date) => format(date, ISO_DATE)

export const todayISO = () => toISODate(new Date())

export const formatDate = (iso: string) => format(parseISO(iso), 'EEE d MMM yyyy')

// "Fri 9 – Tue 13 Oct 2026", "Sat 27 Mar – Thu 1 Apr 2027", "Wed 30 Dec 2026 – Fri 1 Jan 2027"
export const formatRange = (startISO: string, endISO: string) => {
  const start = parseISO(startISO)
  const end = parseISO(endISO)
  const endText = format(end, 'EEE d MMM yyyy')
  if (startISO === endISO) return endText
  if (!isSameYear(start, end)) return `${format(start, 'EEE d MMM yyyy')} – ${endText}`
  if (!isSameMonth(start, end)) return `${format(start, 'EEE d MMM')} – ${endText}`
  return `${format(start, 'EEE d')} – ${endText}`
}

export const countDays = (startISO: string, endISO: string) =>
  differenceInCalendarDays(parseISO(endISO), parseISO(startISO)) + 1
