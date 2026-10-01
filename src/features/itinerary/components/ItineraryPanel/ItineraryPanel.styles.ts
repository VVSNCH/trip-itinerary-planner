import styled from 'styled-components'

export const Panel = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(4)};
`

export const List = styled.ol`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  list-style: none;
`

// The dotted line lines up under the drag handles, joining one card to the next.
export const Connector = styled.div`
  margin-left: ${({ theme }) => theme.space(5)};
  padding: ${({ theme }) => theme.space(2, 0, 2, 4)};
  border-left: ${({ theme }) => theme.sizes.border} dashed
    ${({ theme }) => theme.colors.borderStrong};
`

export const Status = styled.p`
  min-height: ${({ theme }) => theme.textStyles.caption.lineHeight}em;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.textStyles.caption.fontSize};
`
