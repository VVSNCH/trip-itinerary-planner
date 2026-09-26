import MuiTooltip from '@mui/material/Tooltip'
import type { ReactElement, ReactNode } from 'react'

export interface TooltipProps {
  title: ReactNode
  children: ReactElement
  placement?: 'top' | 'bottom' | 'left' | 'right'
}

export const Tooltip = ({ title, children, placement = 'top' }: TooltipProps) => (
  <MuiTooltip title={title} placement={placement} arrow>
    {children}
  </MuiTooltip>
)
