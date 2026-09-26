import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { up } from '@/theme'

const container = css`
  width: 100%;
  max-width: ${({ theme }) => theme.sizes.containerMaxWidth};
  margin: 0 auto;
  padding-inline: ${({ theme }) => theme.space(4)};

  ${up('sm')} {
    padding-inline: ${({ theme }) => theme.space(6)};
  }
`

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.header};
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: ${({ theme }) => theme.sizes.border} solid
    ${({ theme }) => theme.colors.borderSubtle};
`

export const HeaderInner = styled.div`
  ${container}
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space(4)};
  height: ${({ theme }) => theme.sizes.headerHeight};
`

export const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(3)};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.textStyles.subheading.fontSize};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.radii.sm};
`

export const LogoMark = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.sizes.logoMark};
  height: ${({ theme }) => theme.sizes.logoMark};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textOnPrimary};

  & svg {
    font-size: ${({ theme }) => theme.sizes.iconSm};
  }
`

export const Actions = styled.div`
  display: none;
  align-items: center;
  gap: ${({ theme }) => theme.space(2)};

  ${up('sm')} {
    display: flex;
  }
`

export const Main = styled.main`
  ${container}
  padding-top: ${({ theme }) => theme.space(8)};
  padding-bottom: ${({ theme }) => theme.space(12)};
`
