import styled, { css } from 'styled-components'

export const StyledEmptyState = styled.div<{ $dashed: boolean; $highlighted: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space(2)};
  padding: ${({ theme }) => theme.space(10, 6)};
  border-radius: ${({ theme }) => theme.radii.lg};
  transition: ${({ theme }) => theme.motion.transition(['border-color', 'background'], 'FAST')};

  & > p {
    max-width: ${({ theme }) => theme.sizes.emptyStateMaxWidth};
  }

  & > button {
    margin-top: ${({ theme }) => theme.space(2)};
  }

  ${({ theme, $dashed }) =>
    $dashed &&
    css`
      padding: ${theme.space(8, 6)};
      border: ${theme.sizes.border} dashed ${theme.colors.borderStrong};
    `}

  ${({ theme, $highlighted }) =>
    $highlighted &&
    css`
      border-color: ${theme.colors.accent};
      background: ${theme.colors.accentSoft};
    `}
`
