import { forwardRef, type ReactNode } from 'react'
import { Text } from '@/components/common/Text/Text'
import { StyledEmptyState } from './EmptyState.styles'

export interface EmptyStateProps {
  title: string
  description?: ReactNode
  action?: ReactNode
  dashed?: boolean
  highlighted?: boolean
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ title, description, action, dashed = false, highlighted = false }, ref) => (
    <StyledEmptyState ref={ref} $dashed={dashed} $highlighted={highlighted}>
      <Text variant={dashed ? 'subheading' : 'heading'} as="h3" align="center">
        {title}
      </Text>
      {description && (
        <Text tone="secondary" align="center">
          {description}
        </Text>
      )}
      {action}
    </StyledEmptyState>
  )
)

EmptyState.displayName = 'EmptyState'
