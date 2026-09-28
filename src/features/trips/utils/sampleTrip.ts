import { addDays } from 'date-fns'
import type { TripDraft } from '@/context'
import type { Place } from '@/types'
import { toISODate } from '@/utils/dates'
import { deriveDays } from './days'

const SAMPLE_START_OFFSET_DAYS = 7

type Stop = Omit<Place, 'id' | 'note'>

const stopsByDay: Stop[][] = [
  [
    {
      name: 'Praça do Comércio',
      address: 'Praça do Comércio, 1100-148 Lisboa',
      category: 'landmark',
      lat: 38.7075,
      lng: -9.1364,
      time: '10:00',
      durationMins: 45,
    },
    {
      name: 'Sé de Lisboa',
      address: 'Largo da Sé, 1100-585 Lisboa',
      category: 'landmark',
      lat: 38.7097,
      lng: -9.1335,
      time: '11:00',
      durationMins: 40,
    },
    {
      name: 'Miradouro de Santa Luzia',
      address: 'Largo de Santa Luzia, 1100-487 Lisboa',
      category: 'viewpoint',
      lat: 38.7118,
      lng: -9.13,
      time: '12:00',
      durationMins: 30,
    },
    {
      name: 'Castelo de São Jorge',
      address: 'R. de Santa Cruz do Castelo, 1100-129 Lisboa',
      category: 'landmark',
      lat: 38.7139,
      lng: -9.1334,
      time: '13:00',
      durationMins: 90,
    },
  ],
  [
    {
      name: 'Mosteiro dos Jerónimos',
      address: 'Praça do Império, 1400-206 Lisboa',
      category: 'museum',
      lat: 38.6979,
      lng: -9.2068,
      time: '09:30',
      durationMins: 90,
    },
    {
      name: 'Pastéis de Belém',
      address: 'R. de Belém 84-92, 1300-085 Lisboa',
      category: 'restaurant',
      lat: 38.6975,
      lng: -9.2032,
      time: '11:15',
      durationMins: 30,
    },
    {
      name: 'Torre de Belém',
      address: 'Av. Brasília, 1400-038 Lisboa',
      category: 'landmark',
      lat: 38.6916,
      lng: -9.216,
      time: '12:15',
      durationMins: 60,
    },
    {
      name: 'MAAT',
      address: 'Av. Brasília, 1300-598 Lisboa',
      category: 'museum',
      lat: 38.6958,
      lng: -9.1945,
      time: '14:00',
      durationMins: 120,
    },
  ],
  [
    {
      name: 'Elevador de Santa Justa',
      address: 'R. do Ouro, 1150-060 Lisboa',
      category: 'transit',
      lat: 38.7121,
      lng: -9.1395,
      time: '09:00',
      durationMins: 30,
    },
    {
      name: 'Museu Arqueológico do Carmo',
      address: 'Largo do Carmo, 1200-092 Lisboa',
      category: 'museum',
      lat: 38.712,
      lng: -9.1405,
      time: '09:45',
      durationMins: 75,
    },
    {
      name: 'Miradouro de São Pedro de Alcântara',
      address: 'R. de São Pedro de Alcântara, 1200-470 Lisboa',
      category: 'viewpoint',
      lat: 38.7155,
      lng: -9.144,
      time: '16:00',
      durationMins: 45,
    },
    {
      name: 'Time Out Market',
      address: 'Av. 24 de Julho 49, 1200-479 Lisboa',
      category: 'restaurant',
      lat: 38.7069,
      lng: -9.1459,
      time: '19:30',
      durationMins: 90,
    },
  ],
]

export const buildSampleTrip = (today: Date): TripDraft => {
  const startDate = toISODate(addDays(today, SAMPLE_START_OFFSET_DAYS))
  const endDate = toISODate(
    addDays(today, SAMPLE_START_OFFSET_DAYS + stopsByDay.length - 1)
  )

  let placeId = 1
  const days = deriveDays(startDate, endDate).map((day, index) => ({
    ...day,
    places: (stopsByDay[index] ?? []).map((stop) => ({
      ...stop,
      id: placeId++,
      note: null,
    })),
  }))

  return { name: 'Lisbon, three days', startDate, endDate, days }
}
