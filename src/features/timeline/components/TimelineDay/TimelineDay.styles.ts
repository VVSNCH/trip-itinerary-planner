import styled, { type DefaultTheme } from 'styled-components'

// A stop whose time has gone by fades back, unless it was ticked off.
const OVER_OPACITY = 0.45
const HOVER_SCALE = 1.1

// Each entry is a row of time, rail and content. The rail's line runs the full
// row height, so consecutive rows join into one line down the page.
export const Entry = styled.li`
  display: grid;
  grid-template-columns: ${({ theme }) => theme.sizes.timeColumn} ${({ theme }) =>
      theme.sizes.badgeMd} minmax(0, 1fr);
  column-gap: ${({ theme }) => theme.space(3)};
`

export const Time = styled.span`
  padding-top: ${({ theme }) => theme.space(0.5)};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.textStyles.caption.fontSize};
  font-variant-numeric: tabular-nums;
  text-align: right;
`

export const NowTime = styled(Time)`
  color: ${({ theme }) => theme.colors.accent};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
`

interface RailProps {
  $dashed?: boolean
  $done?: boolean
  $startsAtNode?: boolean
  $endsAtNode?: boolean
}

const nodeCentre = (theme: DefaultTheme) => `calc(${theme.sizes.badgeMd} / 2)`

const railColour = (theme: DefaultTheme, { $dashed, $done }: RailProps) => {
  if ($done) return theme.colors.primary
  return $dashed ? theme.colors.textSecondary : theme.colors.borderStrong
}

export const Rail = styled.div<RailProps>`
  position: relative;
  display: flex;
  justify-content: center;

  &::before {
    content: '';
    position: absolute;
    top: ${({ theme, $startsAtNode }) => ($startsAtNode ? nodeCentre(theme) : 0)};
    bottom: ${({ theme, $endsAtNode }) =>
      $endsAtNode ? `calc(100% - ${nodeCentre(theme)})` : 0};
    left: 50%;
    border-left: ${({ theme }) => theme.sizes.borderFocus}
      ${({ $dashed }) => ($dashed ? 'dashed' : 'solid')}
      ${({ theme, ...props }) => railColour(theme, props)};
  }

  & > * {
    position: relative;
  }
`

export const DayNode = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.sizes.badgeMd};
  height: ${({ theme }) => theme.sizes.badgeMd};
  border-radius: ${({ theme }) => theme.radii.round};
  background: ${({ theme }) => theme.colors.primary};
  box-shadow: 0 0 0 ${({ theme }) => theme.space(1)}
    ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.surface};
  font-size: ${({ theme }) => theme.textStyles.caption.fontSize};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};

  & > svg {
    font-size: ${({ theme }) => theme.sizes.iconMd};
  }
`

export const StopNode = styled.span<{ $isOver: boolean }>`
  display: inline-flex;
  margin-top: ${({ theme }) => theme.space(0.25)};
  border-radius: ${({ theme }) => theme.radii.round};
  box-shadow: 0 0 0 ${({ theme }) => theme.space(1)}
    ${({ theme }) => theme.colors.background};
  opacity: ${({ $isOver }) => ($isOver ? OVER_OPACITY : 1)};
  transition: ${({ theme }) => theme.motion.transition(['transform', 'opacity'], 'FAST')};
`

// Ticking a stop off is a click on its node.
export const NodeButton = styled.button`
  align-self: flex-start;
  padding: 0;
  border: none;
  border-radius: ${({ theme }) => theme.radii.round};
  background: none;
  cursor: pointer;

  &:hover > span {
    opacity: 1;
    transform: scale(${HOVER_SCALE});
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 ${({ theme }) => theme.sizes.focusRing}
      ${({ theme }) => theme.colors.focusRing};
  }
`

export const NowDot = styled.span`
  width: ${({ theme }) => theme.space(3)};
  height: ${({ theme }) => theme.space(3)};
  margin-top: ${({ theme }) => theme.space(1)};
  border-radius: ${({ theme }) => theme.radii.round};
  background: ${({ theme }) => theme.colors.accent};
  box-shadow: 0 0 0 ${({ theme }) => theme.space(1)}
    ${({ theme }) => theme.colors.accentBorder};
`

export const Body = styled.div<{ $gap?: 'sm' | 'lg' }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space(0.5)};
  min-width: 0;
  padding-bottom: ${({ theme, $gap }) => theme.space($gap === 'lg' ? 6 : 5)};
`

export const TravelBody = styled(Body)`
  gap: ${({ theme }) => theme.space(1.5)};
  padding: ${({ theme }) => theme.space(1, 0, 8)};
`

export const OpenButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(1)};
  padding: 0;
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  background: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.textStyles.heading.fontSize};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  line-height: ${({ theme }) => theme.textStyles.heading.lineHeight};
  text-align: left;
  cursor: pointer;

  & > svg {
    color: ${({ theme }) => theme.colors.textSecondary};
    transition: ${({ theme }) => theme.motion.transition('transform', 'FAST')};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  &:hover > svg {
    transform: translateX(${({ theme }) => theme.space(0.5)});
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 ${({ theme }) => theme.sizes.focusRing}
      ${({ theme }) => theme.colors.focusRing};
  }
`

export const ChipSlot = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space(2)};
  margin-top: ${({ theme }) => theme.space(1.5)};
`
