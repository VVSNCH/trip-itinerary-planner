import ButtonBase from '@mui/material/ButtonBase'
import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(4)};
`

export const Fields = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: ${({ theme }) => theme.space(3)};
`

export const Calendar = styled.div`
  padding: ${({ theme }) => theme.space(3)};
  border: ${({ theme }) => theme.sizes.border} solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
`

export const MonthHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.space(2)};
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  row-gap: ${({ theme }) => theme.space(1)};
`

export const Weekday = styled.span`
  padding: ${({ theme }) => theme.space(2, 0)};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.textStyles.caption.fontSize};
  text-align: center;
`

export const Cell = styled.div<{ $inRange: boolean }>`
  display: flex;
  justify-content: center;
  background: ${({ theme, $inRange }) => ($inRange ? theme.colors.primarySoft : 'transparent')};
`

export const DayButton = styled(ButtonBase)<{ $selected: boolean }>`
  && {
    width: 100%;
    max-width: ${({ theme }) => theme.sizes.controlMd};
    aspect-ratio: 1;
    border-radius: ${({ theme }) => theme.radii.round};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: ${({ theme }) => theme.textStyles.body.fontSize};
    font-variant-numeric: tabular-nums;

    &:hover {
      background: ${({ theme }) => theme.colors.surfaceMuted};
    }

    &.Mui-focusVisible {
      box-shadow: 0 0 0 ${({ theme }) => theme.sizes.focusRing}
        ${({ theme }) => theme.colors.focusRing};
    }

    ${({ theme, $selected }) =>
      $selected &&
      css`
        background: ${theme.colors.primary};
        color: ${theme.colors.textOnPrimary};
        font-weight: ${theme.fontWeight.semibold};

        &:hover {
          background: ${theme.colors.primaryHover};
        }
      `}
  }
`
