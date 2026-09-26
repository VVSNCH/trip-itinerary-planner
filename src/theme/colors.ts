const palette = {
  white: '#FFFFFF',
  stone50: '#F7F6F2',
  stone100: '#EFEEE9',
  stone150: '#EEEDEA',
  stone200: '#E3E2DF',
  stone300: '#CFCDC8',
  stone400: '#B7B2AC',
  stone500: '#8C8983',
  stone600: '#6B6964',
  stone900: '#1F1E1C',

  green50: '#EEF2F1',
  green100: '#E5EEEB',
  green300: '#9DBDB3',
  green700: '#1F5C4C',
  green800: '#184A3D',

  clay50: '#FBF6F2',
  clay200: '#E9BFA7',
  clay600: '#C4622D',
  clay700: '#A94F20',

  red100: '#F3E1DE',
  red700: '#A8332A',
  red800: '#8E2A22',

  mapLand: '#F1EEE9',
  mapWater: '#E0E6E6',
  mapPark: '#E2E8DC',
} as const

export const colors = {
  background: palette.stone50,
  surface: palette.white,
  surfaceMuted: palette.stone100,
  border: palette.stone200,
  borderSubtle: palette.stone150,
  borderStrong: palette.stone300,

  textPrimary: palette.stone900,
  textSecondary: palette.stone600,
  textMuted: palette.stone500,
  textOnPrimary: palette.white,

  primary: palette.green700,
  primaryHover: palette.green800,
  primarySoft: palette.green100,
  primaryTint: palette.green50,

  accent: palette.clay600,
  accentHover: palette.clay700,
  accentSoft: palette.clay50,
  accentBorder: palette.clay200,

  danger: palette.red700,
  dangerHover: palette.red800,
  dangerSoft: palette.clay50,
  dangerBorder: palette.red100,

  focusRing: palette.green300,
  overlay: 'rgba(31, 30, 28, 0.45)',
  skeleton: palette.stone100,

  progressTrack: palette.stone150,
  progressFill: palette.stone400,

  map: {
    land: palette.mapLand,
    water: palette.mapWater,
    park: palette.mapPark,
    road: palette.white,
    route: palette.clay600,
    marker: palette.clay600,
    markerText: palette.white,
  },
} as const
