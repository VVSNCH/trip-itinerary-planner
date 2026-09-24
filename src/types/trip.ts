export interface Place {
  id: number
  name: string
  address: string
  category: string
  lat: number
  lng: number
  time: string | null
  note: string | null
  durationMins: number | null
}

export interface Day {
  id: number
  date: string
  places: Place[]
}

export interface Trip {
  id: number
  name: string
  startDate: string
  endDate: string
  days: Day[]
  createdAt: string
  updatedAt: string
}

export type PlaceCandidate = Omit<Place, 'id' | 'time' | 'note' | 'durationMins'>

export interface Coordinates {
  lat: number
  lng: number
}
