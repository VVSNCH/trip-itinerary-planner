import styled, { css } from 'styled-components'
import type { NoticeTone } from './Notice'

export const StyledNotice = styled.div<{ $tone: NoticeTone }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(3)};
  padding: ${({ theme }) => theme.space(2.5, 3, 2.5, 4)};
  min-height: ${({ theme }) => theme.sizes.controlLg};
  background: ${({ theme }) => theme.colors.surface};
  border: ${({ theme }) => theme.sizes.border} solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.card};

  ${({ theme, $tone }) =>
    $tone === 'warning' &&
    css`
      background: ${theme.colors.dangerSoft};
      border-color: ${theme.colors.dangerBorder};
      box-shadow: none;
    `}
`

export const NoticeIcon = styled.span<{ $tone: NoticeTone }>`
  display: inline-flex;
  flex-shrink: 0;
  color: ${({ theme, $tone }) =>
    $tone === 'warning' ? theme.colors.accent : theme.colors.textSecondary};

  & svg {
    font-size: ${({ theme }) => theme.sizes.iconMd};
  }
`

export const Message = styled.p`
  flex: 1;
  min-width: 0;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.textStyles.body.fontSize};
  line-height: ${({ theme }) => theme.textStyles.body.lineHeight};
`
