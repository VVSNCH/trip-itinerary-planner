import MuiTab from '@mui/material/Tab'
import MuiTabs from '@mui/material/Tabs'
import type { ReactElement, SyntheticEvent } from 'react'
import { tokens } from '@/theme'
import { TileLabel, TileSublabel } from './Tabs.styles'

export interface TabItem<T extends string | number> {
  value: T
  label: string
  sublabel?: string
  icon?: ReactElement
}

export interface TabsProps<T extends string | number> {
  label: string
  value: T
  items: TabItem<T>[]
  onChange: (value: T) => void
  appearance?: 'underline' | 'tiles'
}

const { colors, radii, sizes, space, textStyles } = tokens

const underlineTab = {
  ...textStyles.label,
  minHeight: sizes.controlLg,
  padding: space(0, 4),
  gap: space(2),
  color: colors.textSecondary,
  textTransform: 'none',
  '& svg': { fontSize: sizes.iconMd },
  '&.Mui-selected': { color: colors.textPrimary },
}

const tileTab = {
  flexDirection: 'column',
  alignItems: 'flex-start',
  minWidth: sizes.tileMinWidth,
  minHeight: 'auto',
  padding: space(2, 3),
  border: `${sizes.border} solid ${colors.border}`,
  borderRadius: radii.md,
  backgroundColor: colors.surface,
  color: colors.textPrimary,
  textTransform: 'none',
  '&:hover': { borderColor: colors.borderStrong },
  '&.Mui-selected': {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
    color: colors.textOnPrimary,
  },
  '&.Mui-focusVisible': { boxShadow: `0 0 0 ${sizes.focusRing} ${colors.focusRing}` },
}

export const Tabs = <T extends string | number>({
  label,
  value,
  items,
  onChange,
  appearance = 'underline',
}: TabsProps<T>) => {
  const isTiles = appearance === 'tiles'

  const handleChange = (_event: SyntheticEvent, next: T) => onChange(next)

  return (
    <MuiTabs
      value={value}
      onChange={handleChange}
      aria-label={label}
      variant={isTiles ? 'scrollable' : 'standard'}
      scrollButtons={false}
      sx={
        isTiles
          ? {
              minHeight: 'auto',
              '& .MuiTabs-indicator': { display: 'none' },
              '& .MuiTabs-flexContainer': { gap: space(2) },
            }
          : {
              minHeight: sizes.controlLg,
              '& .MuiTabs-indicator': { backgroundColor: colors.primary },
            }
      }
    >
      {items.map((item) => (
        <MuiTab
          key={item.value}
          value={item.value}
          icon={isTiles ? undefined : item.icon}
          iconPosition="start"
          disableRipple
          sx={isTiles ? tileTab : underlineTab}
          label={
            isTiles ? (
              <>
                <TileLabel>{item.label}</TileLabel>
                {item.sublabel && <TileSublabel>{item.sublabel}</TileSublabel>}
              </>
            ) : (
              item.label
            )
          }
        />
      ))}
    </MuiTabs>
  )
}
