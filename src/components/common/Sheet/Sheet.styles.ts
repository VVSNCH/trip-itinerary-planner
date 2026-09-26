import styled from 'styled-components'

export const Handle = styled.span`
  align-self: center;
  width: ${({ theme }) => theme.sizes.sheetHandle};
  height: ${({ theme }) => theme.sizes.sheetHandleHeight};
  margin-top: ${({ theme }) => theme.space(2)};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme }) => theme.colors.borderStrong};
`

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space(3)};
  padding: ${({ theme }) => theme.space(4, 4, 3)};
`

export const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(0.5)};
  min-width: 0;
`

export const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.space(0, 4, 4)};
`
