import Typography, { type TypographyProps } from '@mui/material/Typography'
import type { ElementType, ReactNode } from 'react'
import { tokens, type TextStyle } from '@/theme'

type Tone = 'primary' | 'secondary' | 'muted' | 'brand' | 'accent' | 'danger' | 'inherit'

export interface TextProps {
  children: ReactNode
  variant?: TextStyle
  tone?: Tone
  as?: ElementType
  id?: string
  truncate?: boolean
  numeric?: boolean
  align?: 'left' | 'center' | 'right'
}

const muiVariant: Record<TextStyle, TypographyProps['variant']> = {
  display: 'h1',
  title: 'h2',
  heading: 'h3',
  subheading: 'subtitle1',
  bodyStrong: 'subtitle2',
  body: 'body1',
  caption: 'body2',
  overline: 'overline',
  label: 'button',
}

const toneColor: Record<Tone, string> = {
  primary: tokens.colors.textPrimary,
  secondary: tokens.colors.textSecondary,
  muted: tokens.colors.textMuted,
  brand: tokens.colors.primary,
  accent: tokens.colors.accent,
  danger: tokens.colors.danger,
  inherit: 'inherit',
}

export const Text = ({
  children,
  variant = 'body',
  tone,
  as,
  id,
  truncate = false,
  numeric = false,
  align,
}: TextProps) => {
  const defaultTone: Tone = variant === 'overline' ? 'secondary' : 'primary'

  return (
    <Typography
      variant={muiVariant[variant]}
      {...(as && { component: as })}
      id={id}
      noWrap={truncate}
      align={align}
      sx={{
        color: toneColor[tone ?? defaultTone],
        ...(numeric && { fontVariantNumeric: 'tabular-nums' }),
      }}
    >
      {children}
    </Typography>
  )
}
