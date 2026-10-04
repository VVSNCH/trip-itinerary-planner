import styled from 'styled-components'
import { enterAnimation } from '@/theme'

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
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.space(1, 3)};
  margin-left: ${({ theme }) => theme.space(5)};
  padding: ${({ theme }) => theme.space(2, 0, 2, 4)};
  border-left: ${({ theme }) => theme.sizes.border} dashed
    ${({ theme }) => theme.colors.borderStrong};
`

// How the day is reached from the last stop of the day before.
export const Transfer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: -${({ theme }) => theme.space(2)};
  margin-left: ${({ theme }) => theme.space(5)};
  padding: ${({ theme }) => theme.space(0, 0, 2, 4)};
  border-left: ${({ theme }) => theme.sizes.border} dashed
    ${({ theme }) => theme.colors.borderStrong};
`

export const Status = styled.p`
  min-height: ${({ theme }) => theme.textStyles.caption.lineHeight}em;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.textStyles.caption.fontSize};
`

export const Item = styled.li<{ $order: number }>`
  ${({ $order }) => enterAnimation($order)}
`
