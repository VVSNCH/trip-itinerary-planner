import { useNavigate } from 'react-router-dom'
import { LABELS, ROUTES } from '@/constants'
import { Button } from '@/components/common/Button/Button'
import { Card } from '@/components/common/Card/Card'
import { BackIcon } from '@/components/common/icons'
import { EmptyState } from '@/components/feedback/EmptyState/EmptyState'
import { AppLayout } from '../AppLayout/AppLayout'

export interface StatusPageProps {
  title: string
  description: string
}

export const StatusPage = ({ title, description }: StatusPageProps) => {
  const navigate = useNavigate()

  return (
    <AppLayout>
      <Card>
        <EmptyState
          title={title}
          description={description}
          action={
            <Button
              variant="secondary"
              startIcon={<BackIcon />}
              onClick={() => navigate(ROUTES.TRIPS)}
            >
              {LABELS.BACK_TO_TRIPS}
            </Button>
          }
        />
      </Card>
    </AppLayout>
  )
}
