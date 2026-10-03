import styled from 'styled-components'

// Sits just above the finger, lined up as if held by its handle, so it stays in view.
export const Floating = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${({ theme }) => theme.zIndex.tooltip};
  pointer-events: none;

  & > * {
    width: min(
      ${({ theme }) => theme.sizes.dragPreviewWidth},
      calc(100vw - ${({ theme }) => theme.space(8)})
    );
    translate: -${({ theme }) => theme.space(6)}
      calc(-100% - ${({ theme }) => theme.space(4)});
  }
`
