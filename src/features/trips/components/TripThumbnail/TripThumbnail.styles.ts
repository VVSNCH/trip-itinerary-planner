import styled from 'styled-components'

export const Svg = styled.svg`
  display: block;
  width: 100%;
  height: ${({ theme }) => theme.sizes.thumbnailHeight};
  background: ${({ theme }) => theme.colors.map.land};
`
