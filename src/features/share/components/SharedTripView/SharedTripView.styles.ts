import styled from 'styled-components'
import { up } from '@/theme'

export const Banner = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(3)};
  padding: ${({ theme }) => theme.space(2.5, 4)};
  background: ${({ theme }) => theme.colors.primaryTint};
  color: ${({ theme }) => theme.colors.textSecondary};

  & > svg {
    flex-shrink: 0;
    font-size: ${({ theme }) => theme.sizes.iconMd};
  }
`

export const BannerText = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;

  ${up('sm')} {
    flex-direction: row;
    align-items: baseline;
    gap: ${({ theme }) => theme.space(3)};
  }
`
