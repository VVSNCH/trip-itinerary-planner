import { createGlobalStyle } from 'styled-components'
import { MIN_SUPPORTED_WIDTH } from '@/constants'

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;
    min-width: ${MIN_SUPPORTED_WIDTH}px;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-family: ${({ theme }) => theme.fontFamily.sans};
    font-size: ${({ theme }) => theme.textStyles.body.fontSize};
    line-height: ${({ theme }) => theme.textStyles.body.lineHeight};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, p {
    margin: 0;
  }

  button, input, textarea, select {
    font: inherit;
  }

  img, svg {
    display: block;
    max-width: 100%;
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 2px;
  }

  .leaflet-container {
    font-family: inherit;
    background: ${({ theme }) => theme.colors.map.land};
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`
