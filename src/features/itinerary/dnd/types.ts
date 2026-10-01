export interface PlaceDragItem {
  placeId: number
  name: string
  dayId: number
  originIndex: number
  index: number
}

export type PlaceDropResult = { kind: 'list' } | { kind: 'day'; dayId: number }
