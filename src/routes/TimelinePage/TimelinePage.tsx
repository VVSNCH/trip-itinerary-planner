import { EMPTY_STATES } from '@/constants'
import { StatusPage } from '@/components/layout'

export const TimelinePage = () => (
  <StatusPage
    title={EMPTY_STATES.TRIP_NOT_FOUND.title}
    description={EMPTY_STATES.TRIP_NOT_FOUND.description}
  />
)
