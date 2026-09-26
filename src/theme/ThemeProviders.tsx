import '@fontsource-variable/inter'
import type { ReactNode } from 'react'
import {
  StyledEngineProvider,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { GlobalStyles } from './GlobalStyles'
import { muiTheme } from './theme'
import { tokens } from './tokens'

// injectFirst puts MUI's styles at the top of <head>, so styled-components
// overrides on MUI components win without extra specificity.
export const ThemeProviders = ({ children }: { children: ReactNode }) => (
  <StyledEngineProvider injectFirst>
    <MuiThemeProvider theme={muiTheme}>
      <StyledThemeProvider theme={tokens}>
        <GlobalStyles />
        {children}
      </StyledThemeProvider>
    </MuiThemeProvider>
  </StyledEngineProvider>
)
