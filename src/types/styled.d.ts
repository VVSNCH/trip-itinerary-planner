import 'styled-components'
import type { Tokens } from '@/theme/tokens'

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Tokens {}
}
