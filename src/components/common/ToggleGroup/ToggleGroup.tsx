import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import type { MouseEvent, ReactNode } from 'react'
import { tokens } from '@/theme'

export interface ToggleOption<T extends string> {
  value: T
  label: string
  icon?: ReactNode
}

export interface ToggleGroupProps<T extends string> {
  label: string
  value: T
  options: ToggleOption<T>[]
  onChange: (value: T) => void
}

const { colors, radii, shadows, sizes, space, textStyles } = tokens

export const ToggleGroup = <T extends string>({
  label,
  value,
  options,
  onChange,
}: ToggleGroupProps<T>) => {
  // MUI reports null when the active option is clicked again; keep one selected.
  const handleChange = (_event: MouseEvent<HTMLElement>, next: T | null) => {
    if (next !== null) onChange(next)
  }

  return (
    <ToggleButtonGroup
      exclusive
      value={value}
      onChange={handleChange}
      aria-label={label}
      sx={{
        width: 'fit-content',
        gap: space(1),
        padding: space(1),
        backgroundColor: colors.surface,
        borderRadius: radii.lg,
        border: `${sizes.border} solid ${colors.border}`,
        boxShadow: shadows.raised,
      }}
    >
      {options.map((option) => (
        <ToggleButton
          key={option.value}
          value={option.value}
          sx={{
            ...textStyles.label,
            gap: space(2),
            minHeight: sizes.controlMd,
            padding: space(2, 6),
            border: 'none',
            borderRadius: `${radii.md} !important`,
            color: colors.textPrimary,
            textTransform: 'none',
            '& svg': { fontSize: sizes.iconMd },
            '&.Mui-selected, &.Mui-selected:hover': {
              backgroundColor: colors.primary,
              color: colors.textOnPrimary,
            },
          }}
        >
          {option.icon}
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}
