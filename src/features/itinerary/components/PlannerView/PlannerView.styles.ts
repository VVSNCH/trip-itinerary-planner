import styled from 'styled-components'
import { up } from '@/theme'

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
`

export const Body = styled.div`
  flex: 1;

  ${up('md')} {
    display: grid;
    grid-template-columns: ${({ theme }) => theme.sizes.sidePanelWidth} minmax(0, 1fr);
    height: calc(100dvh - ${({ theme }) => theme.sizes.headerHeight});
  }
`

export const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(4)};
  padding: ${({ theme }) => theme.space(4)};
  background: ${({ theme }) => theme.colors.background};

  ${up('md')} {
    overflow-y: auto;
    border-right: ${({ theme }) => theme.sizes.border} solid
      ${({ theme }) => theme.colors.borderSubtle};
  }
`

// Holds the map from phase 7; until then it keeps the planner's shape.
export const MapArea = styled.div`
  display: none;
  background: ${({ theme }) => theme.colors.map.land};

  ${up('md')} {
    display: block;
  }
`
