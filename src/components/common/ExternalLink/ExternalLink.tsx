import MuiLink from '@mui/material/Link'
import type { ReactNode } from 'react'
import { tokens } from '@/theme'
import { OpenInNewIcon } from '../icons'

export interface ExternalLinkProps {
  href: string
  children: ReactNode
  // Spells out where the link goes when the visible text is short, like "Directions".
  label?: string
}

const { colors, fontWeight, sizes, space, textStyles } = tokens

export const ExternalLink = ({ href, children, label }: ExternalLinkProps) => (
  <MuiLink
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    underline="hover"
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: space(0.5),
      color: colors.primary,
      fontSize: textStyles.caption.fontSize,
      fontWeight: fontWeight.medium,
      '& > svg': { fontSize: sizes.iconSm },
    }}
  >
    {children}
    <OpenInNewIcon />
  </MuiLink>
)
