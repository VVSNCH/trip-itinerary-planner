import styled from 'styled-components'

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(1)};
  padding: ${({ theme }) => theme.space(3, 4)};
  background: ${({ theme }) => theme.colors.background};
  border: ${({ theme }) => theme.sizes.border} solid
    ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radii.lg};
`

export const Struck = styled.span`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.textStyles.body.fontSize};
  text-decoration: line-through;
`
