import Fab from '@mui/material/Fab'
import type { ReactNode } from 'react'
import { tokens } from '@/theme'

export interface FloatingButtonProps {
  label: string
  icon: ReactNode
  onClick: () => void
}

const { shadows, sizes, space, textStyles } = tokens

export const FloatingButton = ({ label, icon, onClick }: FloatingButtonProps) => (
  <Fab
    variant="extended"
    color="primary"
    onClick={onClick}
    sx={{
      ...textStyles.label,
      gap: space(2),
      height: sizes.controlLg,
      padding: space(0, 5),
      textTransform: 'none',
      boxShadow: shadows.raised,
    }}
  >
    {icon}
    {label}
  </Fab>
)
