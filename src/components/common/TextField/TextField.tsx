import InputAdornment from '@mui/material/InputAdornment'
import MuiTextField from '@mui/material/TextField'
import type { ChangeEvent, ReactNode } from 'react'
import { HelperRow } from './TextField.styles'

export interface TextFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  id?: string
  type?: 'text' | 'time'
  placeholder?: string
  helperText?: ReactNode
  error?: boolean
  maxLength?: number
  showCount?: boolean
  multiline?: boolean
  minRows?: number
  startIcon?: ReactNode
  endAdornment?: ReactNode
  autoFocus?: boolean
}

export const TextField = ({
  value,
  onChange,
  helperText,
  maxLength,
  showCount = false,
  startIcon,
  endAdornment,
  type = 'text',
  ...rest
}: TextFieldProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange(event.target.value)

  const counter = showCount && maxLength ? `${value.length} / ${maxLength}` : null
  const helper =
    counter !== null ? (
      <HelperRow>
        <span>{helperText}</span>
        <span>{counter}</span>
      </HelperRow>
    ) : (
      helperText
    )

  return (
    <MuiTextField
      {...rest}
      type={type}
      value={value}
      onChange={handleChange}
      helperText={helper}
      fullWidth
      inputProps={{ maxLength }}
      InputProps={{
        startAdornment: startIcon ? (
          <InputAdornment position="start">{startIcon}</InputAdornment>
        ) : undefined,
        endAdornment: endAdornment ? (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ) : undefined,
      }}
    />
  )
}
