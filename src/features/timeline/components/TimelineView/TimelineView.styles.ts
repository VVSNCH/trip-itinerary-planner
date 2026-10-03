import styled from 'styled-components'
import { up } from '@/theme'

export const Page = styled.main`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(8)};
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.timelineMaxWidth};
  margin-inline: auto;
  padding: ${({ theme }) => theme.space(6, 4)};

  ${up('md')} {
    padding: ${({ theme }) => theme.space(10, 8)};
  }
`

export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(1)};
`

export const Timeline = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
`
