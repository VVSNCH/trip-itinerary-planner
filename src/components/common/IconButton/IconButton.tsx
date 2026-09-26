import MuiIconButton from '@mui/material/IconButton'
import type { MouseEventHandler, ReactNode } from 'react'
import { tokens } from '@/theme'

export interface IconButtonProps {
  label: string
  children: ReactNode
  variant?: 'plain' | 'outlined'
  size?: 'sm' | 'md'
  disabled?: boolean
  controls?: string
  expanded?: boolean
  hasPopup?: 'menu' | 'dialog'
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const { colors, sizes } = tokens

export const IconButton = ({
  label,
  children,
  variant = 'plain',
  size = 'md',
  disabled,
  controls,
  expanded,
  hasPopup,
  onClick,
}: IconButtonProps) => {
  const dimension = size === 'sm' ? sizes.controlSm : sizes.controlMd

  return (
    <MuiIconButton
      aria-label={label}
      aria-controls={controls}
      aria-expanded={expanded}
      aria-haspopup={hasPopup}
      disabled={disabled}
      onClick={onClick}
      sx={{
        width: dimension,
        height: dimension,
        '& svg': { fontSize: size === 'sm' ? sizes.iconSm : sizes.iconMd },
        ...(variant === 'outlined' && {
          border: `${sizes.border} solid ${colors.border}`,
          backgroundColor: colors.surface,
          color: colors.primary,
          '&:hover': {
            borderColor: colors.borderStrong,
            backgroundColor: colors.background,
          },
        }),
      }}
    >
      {children}
    </MuiIconButton>
  )
}
