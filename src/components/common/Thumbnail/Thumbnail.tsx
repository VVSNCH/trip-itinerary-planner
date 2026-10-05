import { Image } from './Thumbnail.styles'

export interface ThumbnailProps {
  src: string
  size?: 'sm' | 'md'
}

// Decorative: the place's name always sits next to it, so the alt text is empty.
export const Thumbnail = ({ src, size = 'sm' }: ThumbnailProps) => (
  <Image src={src} alt="" loading="lazy" decoding="async" $size={size} />
)
