import { EMPTY_STATES } from '@/constants'
import { StatusPage } from '@/components/layout'

// Catches anything a page throws while rendering, so the app never goes blank.
export const RouteErrorPage = () => (
  <StatusPage
    title={EMPTY_STATES.PAGE_ERROR.title}
    description={EMPTY_STATES.PAGE_ERROR.description}
  />
)
