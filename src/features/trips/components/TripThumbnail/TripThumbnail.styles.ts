import styled from 'styled-components'

export const Svg = styled.svg`
  display: block;
  width: 100%;
  height: ${({ theme }) => theme.sizes.thumbnailHeight};
  background: ${({ theme }) => theme.colors.map.land};
`

// A pale halo keeps the credit readable over any tile.
export const Attribution = styled.text`
  fill: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.textStyles.overline.fontSize};
  paint-order: stroke;
  stroke: ${({ theme }) => theme.colors.surface};
  stroke-width: 3;
`
