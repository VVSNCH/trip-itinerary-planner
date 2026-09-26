import type { ReactElement, ReactNode } from 'react'
import { StyledChip } from './Chip.styles'

export type ChipTone = 'brand' | 'neutral' | 'accent' | 'outline'

export interface ChipProps {
  label: ReactNode
  tone?: ChipTone
  icon?: ReactElement
}

export const Chip = ({ label, tone = 'neutral', icon }: ChipProps) => (
  <StyledChip label={label} icon={icon} size="small" $tone={tone} />
)
