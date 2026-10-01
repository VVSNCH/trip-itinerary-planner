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
    width: 100%;
    height: 100%;
    font-family: inherit;
    background: ${({ theme }) => theme.colors.map.land};
  }

  .leaflet-control-zoom.leaflet-bar {
    border: ${({ theme }) => theme.sizes.border} solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.md};
    box-shadow: ${({ theme }) => theme.shadows.card};
    overflow: hidden;
  }

  .leaflet-control-zoom a {
    width: ${({ theme }) => theme.sizes.controlMd};
    height: ${({ theme }) => theme.sizes.controlMd};
    line-height: ${({ theme }) => theme.sizes.controlMd};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  .leaflet-control-attribution {
    font-size: ${({ theme }) => theme.textStyles.overline.fontSize};
  }

  /* Leaflet renders markers outside React, so they are styled here. */
  .stop-marker {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border: 2px solid ${({ theme }) => theme.colors.map.road};
    border-radius: ${({ theme }) => theme.radii.round};
    background: ${({ theme }) => theme.colors.map.marker};
    color: ${({ theme }) => theme.colors.map.markerText};
    font-size: ${({ theme }) => theme.textStyles.caption.fontSize};
    font-weight: ${({ theme }) => theme.fontWeight.semibold};
    box-shadow: ${({ theme }) => theme.shadows.card};
    transition: ${({ theme }) => theme.motion.transition('box-shadow', 'FAST')};
  }

  .stop-marker.is-selected {
    box-shadow: 0 0 0 ${({ theme }) => theme.sizes.badgeHalo}
      ${({ theme }) => theme.colors.accentBorder};
  }

  .leaflet-marker-icon:focus-visible .stop-marker {
    outline: 2px solid ${({ theme }) => theme.colors.focusRing};
    outline-offset: 2px;
  }

  .leaflet-tooltip.stop-tooltip {
    padding: ${({ theme }) => theme.space(1.5, 3)};
    border: ${({ theme }) => theme.sizes.border} solid ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.radii.md};
    box-shadow: ${({ theme }) => theme.shadows.raised};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: ${({ theme }) => theme.textStyles.bodyStrong.fontSize};
    font-weight: ${({ theme }) => theme.fontWeight.medium};
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
