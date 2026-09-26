import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { StyledCard } from './Card.styles'

export interface CardProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'style' | 'className' | 'color'
> {
  children: ReactNode
  padding?: 'none' | 'sm' | 'md'
  selected?: boolean
  interactive?: boolean
  lifted?: boolean
  dashed?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      padding = 'md',
      selected = false,
      interactive = false,
      lifted = false,
      dashed = false,
      ...rest
    },
    ref
  ) => (
    <StyledCard
      ref={ref}
      elevation={0}
      $padding={padding}
      $selected={selected}
      $interactive={interactive}
      $lifted={lifted}
      $dashed={dashed}
      {...rest}
    >
      {children}
    </StyledCard>
  )
)

Card.displayName = 'Card'
