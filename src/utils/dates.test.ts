import { countDays, formatRange } from './dates'

describe('formatRange', () => {
  it('writes the month and year once inside one month', () => {
    expect(formatRange('2026-10-09', '2026-10-13')).toBe('Fri 9 – Tue 13 Oct 2026')
  })

  it('names both months when the range crosses a month', () => {
    expect(formatRange('2027-03-27', '2027-04-01')).toBe('Sat 27 Mar – Thu 1 Apr 2027')
  })

  it('names both years when the range crosses a year', () => {
    expect(formatRange('2026-12-30', '2027-01-01')).toBe(
      'Wed 30 Dec 2026 – Fri 1 Jan 2027'
    )
  })

  it('writes a single date once for a one-day range', () => {
    expect(formatRange('2026-10-03', '2026-10-03')).toBe('Sat 3 Oct 2026')
  })
})

describe('countDays', () => {
  it('counts both ends', () => {
    expect(countDays('2026-10-09', '2026-10-13')).toBe(5)
    expect(countDays('2026-10-09', '2026-10-09')).toBe(1)
  })
})
