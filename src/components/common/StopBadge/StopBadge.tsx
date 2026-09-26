import { Badge } from './StopBadge.styles'

export interface StopBadgeProps {
  number: number
  size?: 'sm' | 'md'
  highlighted?: boolean
}

export const StopBadge = ({
  number,
  size = 'sm',
  highlighted = false,
}: StopBadgeProps) => (
  <Badge $size={size} $highlighted={highlighted} aria-hidden="true">
    {number}
  </Badge>
)
