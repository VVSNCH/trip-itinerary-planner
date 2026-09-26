import Drawer from '@mui/material/Drawer'
import { useId, type ReactNode } from 'react'
import { tokens } from '@/theme'
import { IconButton } from '../IconButton/IconButton'
import { Text } from '../Text/Text'
import { CloseIcon } from '../icons'
import { Content, Handle, Header, TitleBlock } from './Sheet.styles'

export interface SheetProps {
  open: boolean
  onClose: () => void
  title: string
  overline?: string
  anchor?: 'bottom' | 'left' | 'right'
  children: ReactNode
}

const { colors, radii, sizes } = tokens

export const Sheet = ({
  open,
  onClose,
  title,
  overline,
  anchor = 'bottom',
  children,
}: SheetProps) => {
  const titleId = useId()
  const isBottom = anchor === 'bottom'

  return (
    <Drawer
      open={open}
      onClose={onClose}
      anchor={anchor}
      PaperProps={{ 'aria-labelledby': titleId, role: 'dialog' }}
      sx={{
        '& .MuiDrawer-paper': {
          backgroundColor: colors.surface,
          ...(isBottom
            ? {
                maxHeight: sizes.sheetMaxHeight,
                borderTopLeftRadius: radii.xl,
                borderTopRightRadius: radii.xl,
              }
            : { width: sizes.sheetSideWidth }),
        },
      }}
    >
      {isBottom && <Handle aria-hidden="true" />}
      <Header>
        <TitleBlock>
          {overline && <Text variant="overline">{overline}</Text>}
          <Text variant="title" as="h2" id={titleId}>
            {title}
          </Text>
        </TitleBlock>
        <IconButton label="Close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Header>
      <Content>{children}</Content>
    </Drawer>
  )
}
