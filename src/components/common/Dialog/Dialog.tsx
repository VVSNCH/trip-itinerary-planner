import MuiDialog from '@mui/material/Dialog'
import { useId, type ReactNode } from 'react'
import { IconButton } from '../IconButton/IconButton'
import { Text } from '../Text/Text'
import { CloseIcon } from '../icons'
import { Actions, Body, Header, HeaderIcon, TitleBlock } from './Dialog.styles'

export interface DialogProps {
  open: boolean
  onClose: () => void
  title: ReactNode
  description?: ReactNode
  icon?: ReactNode
  children?: ReactNode
  actions?: ReactNode
  size?: 'sm' | 'md'
  showClose?: boolean
}

export const Dialog = ({
  open,
  onClose,
  title,
  description,
  icon,
  children,
  actions,
  size = 'sm',
  showClose = true,
}: DialogProps) => {
  const titleId = useId()
  const descriptionId = useId()

  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth={size === 'sm' ? 'xs' : 'sm'}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
    >
      <Header>
        {icon && <HeaderIcon>{icon}</HeaderIcon>}
        <TitleBlock>
          <Text variant="title" as="h2" id={titleId}>
            {title}
          </Text>
          {description && (
            <Text tone="secondary" id={descriptionId}>
              {description}
            </Text>
          )}
        </TitleBlock>
        {showClose && (
          <IconButton label="Close" size="sm" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        )}
      </Header>
      {children && <Body>{children}</Body>}
      {actions && <Actions>{actions}</Actions>}
    </MuiDialog>
  )
}
