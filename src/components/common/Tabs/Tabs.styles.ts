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

export const TileBadge = styled.span`
  position: absolute;
  top: calc(${({ theme }) => theme.space(2)} * -1);
  right: calc(${({ theme }) => theme.space(2)} * -1);
  padding: ${({ theme }) => theme.space(0.5, 1.5)};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.textOnPrimary};
  font-size: ${({ theme }) => theme.textStyles.overline.fontSize};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  line-height: 1.2;
`
