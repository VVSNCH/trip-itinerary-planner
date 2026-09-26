import styled, { css } from 'styled-components'

export const Badge = styled.span<{ $size: 'sm' | 'md'; $highlighted: boolean }>`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: ${({ theme, $size }) => ($size === 'sm' ? theme.sizes.badgeSm : theme.sizes.badgeMd)};
  height: ${({ theme, $size }) => ($size === 'sm' ? theme.sizes.badgeSm : theme.sizes.badgeMd)};
  border-radius: ${({ theme }) => theme.radii.round};
  background: ${({ theme }) => theme.colors.map.marker};
  color: ${({ theme }) => theme.colors.map.markerText};
  font-size: ${({ theme }) => theme.textStyles.caption.fontSize};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  font-variant-numeric: tabular-nums;
  line-height: 1;

  ${({ theme, $highlighted }) =>
    $highlighted &&
    css`
      box-shadow: 0 0 0 ${theme.sizes.badgeHalo} ${theme.colors.accentBorder};
    `}
`
