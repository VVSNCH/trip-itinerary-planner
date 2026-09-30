import styled from 'styled-components'

export const Fields = styled.form`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.space(3)};
  padding-top: ${({ theme }) => theme.space(2)};
`
