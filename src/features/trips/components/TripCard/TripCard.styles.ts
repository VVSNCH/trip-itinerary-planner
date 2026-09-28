import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Thumb = styled.div`
  overflow: hidden;
  border-radius: ${({ theme }) => `${theme.radii.lg} ${theme.radii.lg} 0 0`};
`

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(2)};
  padding: ${({ theme }) => theme.space(4)};
`

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space(2)};
`

// The link's hit area covers the whole card; the menu sits above it.
export const TitleLink = styled(Link)`
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.textStyles.subheading.fontSize};
  font-weight: ${({ theme }) => theme.textStyles.subheading.fontWeight};
  line-height: ${({ theme }) => theme.textStyles.subheading.lineHeight};
  text-decoration: none;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: ${({ theme }) => theme.radii.lg};
  }

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: none;
  }

  &:focus-visible::after {
    box-shadow: 0 0 0 ${({ theme }) => theme.sizes.focusRing}
      ${({ theme }) => theme.colors.focusRing};
  }
`

export const MenuSlot = styled.div`
  position: relative;
  z-index: 1;
`

export const DateLine = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(2)};
  color: ${({ theme }) => theme.colors.textSecondary};

  & svg {
    font-size: ${({ theme }) => theme.sizes.iconSm};
  }
`

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space(2)};
  margin-top: ${({ theme }) => theme.space(1)};
`
