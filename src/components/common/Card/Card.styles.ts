import MuiCard from '@mui/material/Card'
import styled, { css } from 'styled-components'

interface CardStyleProps {
  $padding: 'none' | 'sm' | 'md'
  $selected: boolean
  $interactive: boolean
  $lifted: boolean
  $dashed: boolean
}

const paddingSteps = { none: 0, sm: 3, md: 4 } as const

export const StyledCard = styled(MuiCard)<CardStyleProps>`
  && {
    position: relative;
    overflow: visible;
    padding: ${({ theme, $padding }) => theme.space(paddingSteps[$padding])};
    background: ${({ theme }) => theme.colors.surface};
    border: ${({ theme }) => theme.sizes.border} solid
      ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.lg};
    box-shadow: ${({ theme }) => theme.shadows.card};
    transition: ${({ theme }) =>
      theme.motion.transition(['box-shadow', 'border-color', 'transform'], 'FAST')};

    ${({ theme, $interactive }) =>
      $interactive &&
      css`
        cursor: pointer;

        &:hover {
          box-shadow: ${theme.shadows.raised};
        }
      `}

    ${({ theme, $selected }) =>
      $selected &&
      css`
        background: ${theme.colors.accentSoft};
        border-color: ${theme.colors.accent};
      `}

    ${({ theme, $dashed, $selected }) =>
      $dashed &&
      css`
        border-style: dashed;
        border-color: ${$selected ? theme.colors.accent : theme.colors.borderStrong};
        background: ${$selected ? theme.colors.accentSoft : 'transparent'};
        box-shadow: none;
      `}

    ${({ theme, $lifted }) =>
      $lifted &&
      css`
        box-shadow: ${theme.shadows.drag};
        transform: rotate(1.5deg);
      `}

    &:focus-visible {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 ${({ theme }) => theme.sizes.focusRing}
        ${({ theme }) => theme.colors.focusRing};
    }
  }
`
