import styled from 'styled-components'

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(3)};
  padding-top: ${({ theme }) => theme.space(2)};
`
