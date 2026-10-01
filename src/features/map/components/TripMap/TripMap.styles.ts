import styled from 'styled-components'
import { up } from '@/theme'

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`

// Above Leaflet's own panes and controls.
export const NoticeSlot = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.space(4)};
  bottom: ${({ theme }) => theme.space(8)};
  left: ${({ theme }) => theme.space(4)};
  z-index: ${({ theme }) => theme.zIndex.sticky};

  ${up('md')} {
    right: auto;
    max-width: ${({ theme }) => theme.sizes.sidePanelWidth};
  }
`
