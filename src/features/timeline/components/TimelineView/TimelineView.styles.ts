import styled from 'styled-components'
import { up } from '@/theme'

export const Page = styled.main`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(6)};
  padding: ${({ theme }) => theme.space(6, 4)};

  ${up('md')} {
    padding: ${({ theme }) => theme.space(8)};
  }
`

export const Heading = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space(3)};
`

export const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space(4)};
`

export const LegendItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(2)};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.textStyles.caption.fontSize};
`

export const Swatch = styled.span<{ $tone: 'neutral' | 'accent' }>`
  width: ${({ theme }) => theme.space(4)};
  height: ${({ theme }) => theme.sizes.progress};
  border-radius: ${({ theme }) => theme.radii.pill};
  background: ${({ theme, $tone }) =>
    $tone === 'accent' ? theme.colors.accent : theme.colors.progressFill};
`

// Days sit side by side and scroll sideways once they no longer fit.
export const Columns = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(${({ theme }) => theme.sizes.timelineColumn}, 1fr);
  align-items: start;
  gap: ${({ theme }) => theme.space(5)};
  overflow-x: auto;
  padding-bottom: ${({ theme }) => theme.space(2)};
`
