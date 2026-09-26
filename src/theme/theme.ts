import { createTheme } from '@mui/material/styles'
import { tokens } from './tokens'

const { colors, textStyles, radii, shadows, sizes, zIndex, motion } = tokens

const focusRing = `0 0 0 ${sizes.focusRing} ${colors.focusRing}`

export const muiTheme = createTheme({
  spacing: tokens.spacingUnit,
  breakpoints: { values: tokens.breakpoints },
  shape: { borderRadius: parseInt(radii.md, 10) },
  zIndex: {
    appBar: zIndex.header,
    drawer: zIndex.sheet,
    modal: zIndex.dialog,
    snackbar: zIndex.toast,
    tooltip: zIndex.tooltip,
  },
  transitions: {
    easing: {
      easeInOut: motion.easing.STANDARD,
      easeOut: motion.easing.DECELERATE,
      easeIn: motion.easing.STANDARD,
      sharp: motion.easing.STANDARD,
    },
    duration: motion.reduced
      ? {
          shortest: 0,
          shorter: 0,
          short: 0,
          standard: 0,
          complex: 0,
          enteringScreen: 0,
          leavingScreen: 0,
        }
      : {
          shortest: motion.duration.INSTANT,
          shorter: motion.duration.FAST,
          short: motion.duration.FAST,
          standard: motion.duration.BASE,
          complex: motion.duration.SLOW,
          enteringScreen: motion.duration.BASE,
          leavingScreen: motion.duration.FAST,
        },
  },
  palette: {
    primary: {
      main: colors.primary,
      dark: colors.primaryHover,
      light: colors.primarySoft,
      contrastText: colors.textOnPrimary,
    },
    secondary: {
      main: colors.accent,
      dark: colors.accentHover,
      light: colors.accentSoft,
      contrastText: colors.textOnPrimary,
    },
    error: {
      main: colors.danger,
      dark: colors.dangerHover,
      light: colors.dangerSoft,
      contrastText: colors.textOnPrimary,
    },
    text: { primary: colors.textPrimary, secondary: colors.textSecondary },
    background: { default: colors.background, paper: colors.surface },
    divider: colors.border,
  },
  typography: {
    fontFamily: tokens.fontFamily.sans,
    h1: textStyles.display,
    h2: textStyles.title,
    h3: textStyles.heading,
    subtitle1: textStyles.subheading,
    subtitle2: textStyles.bodyStrong,
    body1: textStyles.body,
    body2: textStyles.caption,
    overline: { ...textStyles.overline, textTransform: 'uppercase' },
    button: { ...textStyles.label, textTransform: 'none' },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          subtitle1: 'p',
          subtitle2: 'p',
          body1: 'p',
          body2: 'p',
          overline: 'span',
          button: 'span',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: { disableRipple: true },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: radii.md,
          padding: tokens.space(2.5, 4),
          minHeight: sizes.controlMd,
          '&.Mui-focusVisible': { boxShadow: focusRing },
        },
        sizeSmall: { padding: tokens.space(1.5, 3), minHeight: sizes.controlSm },
        outlined: {
          borderColor: colors.border,
          color: colors.textPrimary,
          backgroundColor: colors.surface,
          '&:hover': {
            borderColor: colors.borderStrong,
            backgroundColor: colors.background,
          },
        },
        text: {
          padding: tokens.space(2, 3),
          '&:hover': { backgroundColor: colors.primaryTint },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: colors.textSecondary,
          borderRadius: radii.md,
          '&:hover': { backgroundColor: colors.surfaceMuted },
          '&.Mui-focusVisible': { boxShadow: focusRing },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: colors.surface,
          borderRadius: radii.md,
          '& .MuiOutlinedInput-notchedOutline': { borderColor: colors.border },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.borderStrong,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.primary,
            borderWidth: sizes.borderFocus,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          ...textStyles.caption,
          color: colors.textSecondary,
          '&.Mui-focused': { color: colors.primary },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: { ...textStyles.caption, color: colors.textMuted, marginInline: 0 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: radii.xl, boxShadow: shadows.overlay },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: { backgroundColor: colors.overlay },
        invisible: { backgroundColor: 'transparent' },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: radii.lg,
          border: `${sizes.border} solid ${colors.border}`,
          boxShadow: shadows.raised,
          minWidth: sizes.menuMinWidth,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          ...textStyles.body,
          gap: tokens.space(3),
          padding: tokens.space(2.5, 4),
          '&:hover': { backgroundColor: colors.background },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          ...textStyles.caption,
          backgroundColor: colors.textPrimary,
          borderRadius: radii.sm,
          padding: tokens.space(1.5, 2.5),
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: { backgroundColor: colors.skeleton },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: { borderColor: colors.border },
      },
    },
  },
})
