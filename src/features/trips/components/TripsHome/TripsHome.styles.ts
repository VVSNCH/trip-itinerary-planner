import styled from 'styled-components'
import { enterAnimation, up } from '@/theme'

export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(1)};
  margin-bottom: ${({ theme }) => theme.space(6)};
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: ${({ theme }) => theme.space(5)};
  padding-bottom: ${({ theme }) => theme.space(16)};

  ${up('sm')} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding-bottom: 0;
  }

  ${up('md')} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: ${({ theme }) => theme.space(6)};
  }
`

export const EmptyActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => theme.space(2)};
  margin-top: ${({ theme }) => theme.space(2)};
`

export const MobileCreate = styled.div`
  position: fixed;
  right: ${({ theme }) => theme.space(4)};
  bottom: ${({ theme }) => theme.space(4)};
  z-index: ${({ theme }) => theme.zIndex.sticky};

  ${up('sm')} {
    display: none;
  }
`

// A grid of its own so the card still stretches to the row height.
export const GridItem = styled.div<{ $order: number }>`
  display: grid;
  ${({ $order }) => enterAnimation($order)}
`
