import Divider from '@mui/material/Divider'
import MuiMenu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useId, useState, type MouseEvent, type ReactNode } from 'react'
import { tokens } from '@/theme'
import { IconButton } from '../IconButton/IconButton'
import { MoreIcon } from '../icons'

export interface MenuItemConfig {
  id: string
  label: string
  icon?: ReactNode
  tone?: 'default' | 'danger'
  dividerBefore?: boolean
  onSelect: () => void
}

export interface MenuProps {
  label: string
  items: MenuItemConfig[]
}

const { colors, sizes } = tokens

export const Menu = ({ label, items }: MenuProps) => {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)
  const menuId = useId()
  const isOpen = anchor !== null

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setAnchor(event.currentTarget)
  }

  const handleClose = () => setAnchor(null)

  const handleSelect = (item: MenuItemConfig) => {
    handleClose()
    item.onSelect()
  }

  const children = items.flatMap((item) => {
    const row = (
      <MenuItem
        key={item.id}
        onClick={() => handleSelect(item)}
        sx={{
          color: item.tone === 'danger' ? colors.danger : colors.textPrimary,
          '& svg': {
            fontSize: sizes.iconMd,
            color: item.tone === 'danger' ? colors.danger : colors.textSecondary,
          },
        }}
      >
        {item.icon}
        {item.label}
      </MenuItem>
    )
    return item.dividerBefore ? [<Divider key={`${item.id}-divider`} />, row] : [row]
  })

  return (
    <>
      <IconButton
        label={label}
        size="sm"
        hasPopup="menu"
        controls={isOpen ? menuId : undefined}
        expanded={isOpen}
        onClick={handleOpen}
      >
        <MoreIcon />
      </IconButton>
      <MuiMenu
        id={menuId}
        anchorEl={anchor}
        open={isOpen}
        onClose={handleClose}
        onClick={(event) => event.stopPropagation()}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {children}
      </MuiMenu>
    </>
  )
}
