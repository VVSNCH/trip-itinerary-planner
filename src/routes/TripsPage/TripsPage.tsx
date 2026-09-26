import { EMPTY_STATES, LABELS } from '@/constants'
import { AddIcon, Button, Card, Text } from '@/components/common'
import { EmptyState } from '@/components/feedback'
import { AppLayout } from '@/components/layout'
import { Heading } from './TripsPage.styles'

export const TripsPage = () => (
  <AppLayout actions={<Button startIcon={<AddIcon />}>{LABELS.NEW_TRIP}</Button>}>
    <Heading>
      <Text variant="display" as="h1">
        {LABELS.TRIPS}
      </Text>
    </Heading>
    <Card>
      <EmptyState
        title={EMPTY_STATES.TRIPS.title}
        description={EMPTY_STATES.TRIPS.description}
        action={<Button startIcon={<AddIcon />}>{LABELS.NEW_TRIP}</Button>}
      />
    </Card>
  </AppLayout>
)
