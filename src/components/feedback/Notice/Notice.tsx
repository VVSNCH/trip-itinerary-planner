import { forwardRef, type ReactNode } from 'react'
import { Button } from '@/components/common/Button/Button'
import {
  ClockIcon,
  InfoIcon,
  OfflineIcon,
  RetryIcon,
  WarningIcon,
} from '@/components/common/icons'
import { Message, NoticeIcon, StyledNotice } from './Notice.styles'

export type NoticeTone = 'info' | 'busy' | 'offline' | 'warning'

export interface NoticeProps {
  message: ReactNode
  tone?: NoticeTone
  actionLabel?: string
  onAction?: () => void
}

const icons: Record<NoticeTone, ReactNode> = {
  info: <InfoIcon />,
  busy: <ClockIcon />,
  offline: <OfflineIcon />,
  warning: <WarningIcon />,
}

export const Notice = forwardRef<HTMLDivElement, NoticeProps>(
  ({ message, tone = 'info', actionLabel = 'Retry', onAction }, ref) => (
    <StyledNotice ref={ref} $tone={tone} role={tone === 'warning' ? 'alert' : 'status'}>
      <NoticeIcon $tone={tone}>{icons[tone]}</NoticeIcon>
      <Message>{message}</Message>
      {onAction && (
        <Button variant="text" size="sm" startIcon={<RetryIcon />} onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </StyledNotice>
  )
)

Notice.displayName = 'Notice'
