import styled from 'styled-components'

export const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space(3)};
`

export const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(0.5)};
  min-width: 0;
`

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: flex-end;
`
