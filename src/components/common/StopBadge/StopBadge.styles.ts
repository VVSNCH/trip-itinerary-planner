import styled, { css } from 'styled-components'

interface BadgeProps {
  $size: 'sm' | 'md'
  $highlighted: boolean
  $visited: boolean
}

export const Badge = styled.span<BadgeProps>`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: ${({ theme, $size }) => ($size === 'sm' ? theme.sizes.badgeSm : theme.sizes.badgeMd)};
  height: ${({ theme, $size }) => ($size === 'sm' ? theme.sizes.badgeSm : theme.sizes.badgeMd)};
  border-radius: ${({ theme }) => theme.radii.round};
  background: ${({ theme, $visited }) =>
    $visited ? theme.colors.primary : theme.colors.map.marker};
  color: ${({ theme }) => theme.colors.map.markerText};
  font-size: ${({ theme }) => theme.textStyles.caption.fontSize};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  font-variant-numeric: tabular-nums;
  line-height: 1;

  & > svg {
    font-size: ${({ theme }) => theme.sizes.iconSm};
  }

  ${({ theme, $highlighted }) =>
    $highlighted &&
    css`
      box-shadow: 0 0 0 ${theme.sizes.badgeHalo} ${theme.colors.accentBorder};
    `}
`
