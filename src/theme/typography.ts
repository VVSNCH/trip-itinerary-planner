export const fontFamily = {
  sans: "'Inter Variable', Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
} as const

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
} as const

export const textStyles = {
  display: {
    fontSize: '1.75rem',
    lineHeight: 1.2,
    fontWeight: fontWeight.semibold,
    letterSpacing: '-0.01em',
  },
  title: {
    fontSize: '1.25rem',
    lineHeight: 1.3,
    fontWeight: fontWeight.semibold,
    letterSpacing: '-0.005em',
  },
  heading: {
    fontSize: '1.125rem',
    lineHeight: 1.35,
    fontWeight: fontWeight.semibold,
    letterSpacing: '0',
  },
  subheading: {
    fontSize: '0.9375rem',
    lineHeight: 1.4,
    fontWeight: fontWeight.medium,
    letterSpacing: '0',
  },
  body: {
    fontSize: '0.875rem',
    lineHeight: 1.45,
    fontWeight: fontWeight.regular,
    letterSpacing: '0',
  },
  bodyStrong: {
    fontSize: '0.875rem',
    lineHeight: 1.45,
    fontWeight: fontWeight.medium,
    letterSpacing: '0',
  },
  caption: {
    fontSize: '0.8125rem',
    lineHeight: 1.4,
    fontWeight: fontWeight.regular,
    letterSpacing: '0',
  },
  overline: {
    fontSize: '0.6875rem',
    lineHeight: 1.4,
    fontWeight: fontWeight.medium,
    letterSpacing: '0.08em',
  },
  label: {
    fontSize: '0.875rem',
    lineHeight: 1.2,
    fontWeight: fontWeight.medium,
    letterSpacing: '0',
  },
} as const

export type TextStyle = keyof typeof textStyles
