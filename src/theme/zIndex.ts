// Leaflet uses up to 1000 for its own panes and controls, so app layers sit above it.
export const zIndex = {
  base: 0,
  sticky: 1050,
  header: 1100,
  sheet: 1200,
  dialog: 1300,
  toast: 1400,
  tooltip: 1500,
} as const
