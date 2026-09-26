import { useState } from 'react'
import { MESSAGES } from '@/constants'
import { Toast } from '@/components/common'
import { useTrips } from '@/context'

export const StorageResetToast = () => {
  const { storageWasReset } = useTrips()
  const [isOpen, setIsOpen] = useState(storageWasReset)

  return (
    <Toast
      open={isOpen}
      tone="warning"
      message={MESSAGES.STORAGE_CORRUPT}
      onClose={() => setIsOpen(false)}
    />
  )
}
