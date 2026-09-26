import MuiChip from '@mui/material/Chip'
import styled, { type DefaultTheme } from 'styled-components'
import type { ChipTone } from './Chip'

const toneStyles = (theme: DefaultTheme, tone: ChipTone) =>
  ({
    brand: {
      bg: theme.colors.primarySoft,
      fg: theme.colors.primary,
      border: 'transparent',
    },
    neutral: {
      bg: theme.colors.surfaceMuted,
      fg: theme.colors.textSecondary,
      border: 'transparent',
    },
    accent: {
      bg: theme.colors.accentSoft,
      fg: theme.colors.accent,
      border: theme.colors.accentBorder,
    },
    outline: {
      bg: theme.colors.background,
      fg: theme.colors.textPrimary,
      border: theme.colors.borderSubtle,
    },
  })[tone]

export const StyledChip = styled(MuiChip)<{ $tone: ChipTone }>`
  && {
    height: auto;
    padding: ${({ theme }) => theme.space(0.75, 2.5)};
    border-radius: ${({ theme }) => theme.radii.pill};
    border: ${({ theme }) => theme.sizes.border} solid
      ${({ theme, $tone }) => toneStyles(theme, $tone).border};
    background: ${({ theme, $tone }) => toneStyles(theme, $tone).bg};
    color: ${({ theme, $tone }) => toneStyles(theme, $tone).fg};
    font-size: ${({ theme }) => theme.textStyles.caption.fontSize};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    font-variant-numeric: tabular-nums;
  }

  & .MuiChip-label {
    padding: 0;
  }

  & .MuiChip-icon {
    margin: 0 ${({ theme }) => theme.space(1.5)} 0 0;
    font-size: ${({ theme }) => theme.sizes.iconSm};
    color: inherit;
  }
`
