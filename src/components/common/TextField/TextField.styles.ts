import styled from 'styled-components'

export const HelperRow = styled.span`
  display: flex;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space(3)};
  font-variant-numeric: tabular-nums;
`
