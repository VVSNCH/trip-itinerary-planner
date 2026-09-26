import LinearProgress from '@mui/material/LinearProgress'
import { tokens } from '@/theme'

export interface ProgressBarProps {
  label: string
  value: number
  tone?: 'neutral' | 'accent'
}

const { colors, radii, sizes } = tokens

export const ProgressBar = ({ label, value, tone = 'neutral' }: ProgressBarProps) => (
  <LinearProgress
    variant="determinate"
    aria-label={label}
    value={Math.min(Math.max(value, 0), 100)}
    sx={{
      height: sizes.progress,
      borderRadius: radii.pill,
      backgroundColor: colors.progressTrack,
      '& .MuiLinearProgress-bar': {
        borderRadius: radii.pill,
        backgroundColor: tone === 'accent' ? colors.accent : colors.progressFill,
      },
    }}
  />
)
