import MuiButton from '@mui/material/Button'
import type { MouseEventHandler, ReactNode } from 'react'
import { tokens } from '@/theme'

type Variant = 'primary' | 'secondary' | 'text' | 'danger' | 'dashed'

export interface ButtonProps {
  children: ReactNode
  variant?: Variant
  size?: 'sm' | 'md'
  startIcon?: ReactNode
  endIcon?: ReactNode
  fullWidth?: boolean
  disabled?: boolean
  autoFocus?: boolean
  type?: 'button' | 'submit'
  onClick?: MouseEventHandler<HTMLButtonElement>
}

const muiVariant = {
  primary: { variant: 'contained', color: 'primary' },
  secondary: { variant: 'outlined', color: 'inherit' },
  text: { variant: 'text', color: 'primary' },
  danger: { variant: 'contained', color: 'error' },
  dashed: { variant: 'outlined', color: 'primary' },
} as const

export const Button = ({
  variant = 'primary',
  size = 'md',
  type = 'button',
  ...rest
}: ButtonProps) => (
  <MuiButton
    {...muiVariant[variant]}
    {...rest}
    type={type}
    size={size === 'sm' ? 'small' : 'medium'}
    sx={variant === 'dashed' ? dashedStyles : undefined}
  />
)

const dashedStyles = {
  borderStyle: 'dashed',
  borderColor: tokens.colors.border,
  backgroundColor: 'transparent',
  color: tokens.colors.primary,
  '&:hover': {
    borderStyle: 'dashed',
    borderColor: tokens.colors.primary,
    backgroundColor: tokens.colors.surface,
  },
}
