import styled from 'styled-components'

export const Image = styled.img<{ $size: 'sm' | 'md' }>`
  flex-shrink: 0;
  width: ${({ theme, $size }) => ($size === 'sm' ? theme.sizes.thumbSm : theme.sizes.thumbMd)};
  height: ${({ theme, $size }) => ($size === 'sm' ? theme.sizes.thumbSm : theme.sizes.thumbMd)};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surfaceMuted};
  object-fit: cover;
`
