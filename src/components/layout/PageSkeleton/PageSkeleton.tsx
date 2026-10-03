import { Skeleton } from '@/components/common/Skeleton/Skeleton'
import { tokens } from '@/theme'
import { AppLayout } from '../AppLayout/AppLayout'
import { Cards, Stack } from './PageSkeleton.styles'

const CARD_COUNT = 3

// Shown for the moment a page's code is still downloading.
export const PageSkeleton = () => (
  <AppLayout>
    <Stack aria-busy="true">
      <Skeleton width="40%" height={tokens.sizes.controlMd} />
      <Cards>
        {Array.from({ length: CARD_COUNT }, (_, index) => (
          <Skeleton key={index} shape="block" height={tokens.sizes.thumbnailHeight} />
        ))}
      </Cards>
    </Stack>
  </AppLayout>
)
