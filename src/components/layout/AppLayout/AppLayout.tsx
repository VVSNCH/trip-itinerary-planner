import type { ReactNode } from 'react'
import { LABELS, ROUTES } from '@/constants'
import { PlaceIcon } from '@/components/common/icons'
import { Actions, Brand, Header, HeaderInner, LogoMark, Main } from './AppLayout.styles'

export interface AppLayoutProps {
  children: ReactNode
  actions?: ReactNode
}

export const AppLayout = ({ children, actions }: AppLayoutProps) => (
  <>
    <Header>
      <HeaderInner>
        <Brand to={ROUTES.TRIPS}>
          <LogoMark aria-hidden="true">
            <PlaceIcon />
          </LogoMark>
          {LABELS.APP_NAME}
        </Brand>
        {actions && <Actions>{actions}</Actions>}
      </HeaderInner>
    </Header>
    <Main>{children}</Main>
  </>
)
