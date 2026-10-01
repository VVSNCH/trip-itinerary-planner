import styled from 'styled-components'

// Read by screen readers, invisible on screen.
export const VisuallyHidden = styled.span`
  position: absolute;
  width: ${({ theme }) => theme.sizes.border};
  height: ${({ theme }) => theme.sizes.border};
  margin: calc(${({ theme }) => theme.sizes.border} * -1);
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
`
