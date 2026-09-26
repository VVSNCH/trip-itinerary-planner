import styled from 'styled-components'

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space(3)};
  padding: ${({ theme }) => theme.space(6, 6, 0)};
`

export const HeaderIcon = styled.span`
  display: inline-flex;
  padding-top: ${({ theme }) => theme.space(0.5)};
  color: ${({ theme }) => theme.colors.danger};

  & svg {
    font-size: ${({ theme }) => theme.sizes.iconMd};
  }
`

export const TitleBlock = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(2)};
  min-width: 0;
`

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(4)};
  padding: ${({ theme }) => theme.space(5, 6, 0)};
`

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${({ theme }) => theme.space(2)};
  padding: ${({ theme }) => theme.space(5, 6, 6)};
`
