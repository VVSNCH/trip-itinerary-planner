import styled from 'styled-components'

export const LinkRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space(3)};

  & > :first-child {
    flex: 1;
    min-width: 0;
  }

  & > button {
    flex-shrink: 0;
    min-height: ${({ theme }) => theme.sizes.controlLg};
    margin-top: ${({ theme }) => theme.space(1)};
  }
`

export const Footnote = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(2)};
  padding-top: ${({ theme }) => theme.space(4)};
  border-top: ${({ theme }) => theme.sizes.border} solid
    ${({ theme }) => theme.colors.borderSubtle};
  color: ${({ theme }) => theme.colors.textSecondary};

  & svg {
    font-size: ${({ theme }) => theme.sizes.iconSm};
  }
`
