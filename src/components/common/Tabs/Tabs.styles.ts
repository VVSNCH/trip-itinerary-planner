import styled from 'styled-components'

export const TileLabel = styled.span`
  font-size: ${({ theme }) => theme.textStyles.bodyStrong.fontSize};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  line-height: ${({ theme }) => theme.textStyles.bodyStrong.lineHeight};
`

export const TileSublabel = styled.span`
  font-size: ${({ theme }) => theme.textStyles.caption.fontSize};
  line-height: ${({ theme }) => theme.textStyles.caption.lineHeight};
  opacity: 0.85;
`
