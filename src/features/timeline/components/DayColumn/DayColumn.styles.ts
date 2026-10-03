import styled from 'styled-components'

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space(1.5)};
  padding-bottom: ${({ theme }) => theme.space(3)};
`

export const Meter = styled.div`
  align-self: stretch;
  margin-top: ${({ theme }) => theme.space(1.5)};
`

// Opening the day is the heading's job; its hit area covers the whole column.
export const OpenButton = styled.button`
  padding: 0;
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.textStyles.subheading.fontSize};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  text-align: left;
  cursor: pointer;

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

export const Rows = styled.ol`
  margin: 0;
  padding: 0;
  list-style: none;
`

export const Row = styled.li`
  display: flex;
  gap: ${({ theme }) => theme.space(3)};
  padding: ${({ theme }) => theme.space(3, 0)};
  border-top: ${({ theme }) => theme.sizes.border} solid
    ${({ theme }) => theme.colors.borderSubtle};
`

export const Time = styled.span`
  flex-shrink: 0;
  width: ${({ theme }) => theme.sizes.timeColumn};
  padding-top: ${({ theme }) => theme.space(0.5)};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.textStyles.caption.fontSize};
  font-variant-numeric: tabular-nums;
`
