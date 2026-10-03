import { CheckIcon } from '../icons'
import { Badge } from './StopBadge.styles'

export interface StopBadgeProps {
  number: number
  size?: 'sm' | 'md'
  highlighted?: boolean
  visited?: boolean
}

export const StopBadge = ({
  number,
  size = 'sm',
  highlighted = false,
  visited = false,
}: StopBadgeProps) => (
  <Badge $size={size} $highlighted={highlighted} $visited={visited} aria-hidden="true">
    {visited ? <CheckIcon /> : number}
  </Badge>
)
