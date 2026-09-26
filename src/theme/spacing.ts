export const SPACING_UNIT = 4

export const space = (...steps: number[]) =>
  steps.map((step) => `${step * SPACING_UNIT}px`).join(' ')
