import styled, { css } from 'styled-components'
import { up } from '@/theme'

interface LayoutProps {
  $isMapOnly: boolean
}

// In the phone's map view the page is exactly one screen tall, with the map
// filling whatever the header and day tiles leave.
const oneScreen = css`
  height: 100dvh;
  min-height: 0;
`

export const Page = styled.div<LayoutProps>`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  ${({ $isMapOnly }) => $isMapOnly && oneScreen}
`

export const Body = styled.div<LayoutProps>`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-height: 0;

  ${up('md')} {
    display: grid;
    grid-template-columns: ${({ theme }) => theme.sizes.sidePanelWidth} minmax(0, 1fr);
    height: calc(100dvh - ${({ theme }) => theme.sizes.headerHeight});
  }
`

export const Sidebar = styled.div<LayoutProps>`
  display: flex;
  flex: ${({ $isMapOnly }) => ($isMapOnly ? 'none' : '1')};
  flex-direction: column;
  gap: ${({ theme }) => theme.space(4)};
  padding: ${({ theme }) => theme.space(4)};
  padding-bottom: ${({ theme, $isMapOnly }) => ($isMapOnly ? theme.space(2) : theme.space(24))};
  background: ${({ theme }) => theme.colors.background};

  ${up('md')} {
    padding-bottom: ${({ theme }) => theme.space(4)};
    overflow-y: auto;
    border-right: ${({ theme }) => theme.sizes.border} solid
      ${({ theme }) => theme.colors.borderSubtle};
  }
`

export const MapArea = styled.div`
  position: relative;
  flex: 1;
  min-height: 0;
  background: ${({ theme }) => theme.colors.map.land};
`

export const MapFallback = styled.div`
  padding: ${({ theme }) => theme.space(4)};
`

// The phone's floating List/Map switch, with the stop card under it in map view.
export const BottomBar = styled.div<{ $hasCard: boolean }>`
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space(3)};
  padding: ${({ theme, $hasCard }) => theme.space(3, 0, $hasCard ? 0 : 4)};
  pointer-events: none;

  & > * {
    pointer-events: auto;
  }
`
