import styled from 'styled-components'
import { up } from '@/theme'

export const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.header};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(2)};
  height: ${({ theme }) => theme.sizes.headerHeight};
  padding-inline: ${({ theme }) => theme.space(2, 4)};
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: ${({ theme }) => theme.sizes.border} solid
    ${({ theme }) => theme.colors.borderSubtle};
`

export const TitleBlock = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;

  ${up('md')} {
    flex-direction: row;
    align-items: baseline;
    gap: ${({ theme }) => theme.space(3)};
  }
`

export const Nav = styled.nav`
  display: none;
  align-self: flex-end;

  ${up('md')} {
    display: block;
  }
`

export const Actions = styled.div`
  display: none;
  gap: ${({ theme }) => theme.space(2)};
  margin-left: ${({ theme }) => theme.space(4)};

  ${up('md')} {
    display: flex;
  }
`

export const MobileShare = styled.div`
  ${up('md')} {
    display: none;
  }
`
