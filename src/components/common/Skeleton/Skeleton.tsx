import MuiSkeleton from '@mui/material/Skeleton'
import { tokens } from '@/theme'

export interface SkeletonProps {
  shape?: 'text' | 'block' | 'circle' | 'pill'
  width?: number | string
  height?: number | string
}

const muiVariant = {
  text: 'text',
  block: 'rounded',
  circle: 'circular',
  pill: 'rounded',
} as const

const radius = {
  text: undefined,
  block: tokens.radii.lg,
  circle: undefined,
  pill: tokens.radii.pill,
}

export const Skeleton = ({ shape = 'text', width, height }: SkeletonProps) => (
  <MuiSkeleton
    variant={muiVariant[shape]}
    width={width}
    height={height}
    animation={tokens.motion.reduced ? false : 'wave'}
    sx={{ borderRadius: radius[shape] }}
  />
)
