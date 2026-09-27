import type { Day, Place, Trip } from '@/types'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const isString = (value: unknown): value is string => typeof value === 'string'

const isNumber = (value: unknown): value is number => Number.isFinite(value)

const isStringOrNull = (value: unknown) => value === null || isString(value)

const isNumberOrNull = (value: unknown) => value === null || isNumber(value)

export const isPlace = (value: unknown): value is Place =>
  isRecord(value) &&
  isNumber(value.id) &&
  isString(value.name) &&
  isString(value.address) &&
  isString(value.category) &&
  isNumber(value.lat) &&
  isNumber(value.lng) &&
  isStringOrNull(value.time) &&
  isStringOrNull(value.note) &&
  isNumberOrNull(value.durationMins)

export const isDay = (value: unknown): value is Day =>
  isRecord(value) &&
  isNumber(value.id) &&
  isString(value.date) &&
  Array.isArray(value.places) &&
  value.places.every(isPlace)

export const isTrip = (value: unknown): value is Trip =>
  isRecord(value) &&
  isNumber(value.id) &&
  isString(value.name) &&
  isString(value.startDate) &&
  isString(value.endDate) &&
  isString(value.createdAt) &&
  isString(value.updatedAt) &&
  Array.isArray(value.days) &&
  value.days.every(isDay)

export const isTripList = (value: unknown): value is Trip[] =>
  Array.isArray(value) && value.every(isTrip)
