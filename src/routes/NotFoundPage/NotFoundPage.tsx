import { EMPTY_STATES } from '@/constants'
import { StatusPage } from '@/components/layout'

export const NotFoundPage = () => (
  <StatusPage
    title={EMPTY_STATES.PAGE_NOT_FOUND.title}
    description={EMPTY_STATES.PAGE_NOT_FOUND.description}
  />
)
