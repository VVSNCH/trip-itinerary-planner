import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { EMPTY_STATES } from '@/constants'
import { StatusPage } from '@/components/layout'
import SharedTripView from '@/features/share/components/SharedTripView'
import { decodeTrip } from '@/features/share/utils/shareCodec'

export const SharedTripPage = () => {
  const { hash } = useLocation()
  const draft = useMemo(() => decodeTrip(hash.slice(1)), [hash])

  if (!draft) {
    return (
      <StatusPage
        title={EMPTY_STATES.SHARE_INVALID.title}
        description={EMPTY_STATES.SHARE_INVALID.description}
      />
    )
  }

  return <SharedTripView draft={draft} />
}
