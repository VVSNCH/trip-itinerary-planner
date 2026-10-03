import styled from 'styled-components'
import { up } from '@/theme'

export const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(6)};
`

export const Cards = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: ${({ theme }) => theme.space(5)};

  ${up('sm')} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`
