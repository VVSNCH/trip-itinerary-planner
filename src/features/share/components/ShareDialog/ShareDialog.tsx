import { useState } from 'react'
import { COPY, DIALOGS, LABELS, MESSAGES, ROUTES, SHARE } from '@/constants'
import {
  Button,
  CopyIcon,
  Dialog,
  Text,
  TextField,
  Toast,
  ViewIcon,
} from '@/components/common'
import { Notice } from '@/components/feedback'
import type { Trip } from '@/types'
import { encodeTrip } from '../../utils/shareCodec'
import { Footnote, LinkRow } from './ShareDialog.styles'

export interface ShareDialogProps {
  trip: Trip
  onClose: () => void
}

export const ShareDialog = ({ trip, onClose }: ShareDialogProps) => {
  const [toast, setToast] = useState<string | null>(null)
  // The trip rides in the fragment, which browsers never send to a server.
  const link = `${window.location.origin}${ROUTES.SHARED}#${encodeTrip(trip)}`

  const handleCopy = () =>
    navigator.clipboard
      .writeText(link)
      .then(() => setToast(MESSAGES.LINK_COPIED))
      .catch(() => setToast(MESSAGES.COPY_FAILED))

  return (
    <Dialog
      open
      onClose={onClose}
      size="md"
      title={DIALOGS.SHARE}
      description={MESSAGES.SHARE_EXPLAINER}
      actions={
        <Button variant="text" onClick={onClose}>
          {LABELS.DONE}
        </Button>
      }
    >
      <LinkRow>
        <TextField
          label={LABELS.SHARE_LINK}
          value={link}
          onChange={() => {}}
          helperText={COPY.characters(link.length)}
          readOnly
        />
        <Button startIcon={<CopyIcon />} onClick={handleCopy}>
          {LABELS.COPY_LINK}
        </Button>
      </LinkRow>
      {link.length > SHARE.WARN_LENGTH && (
        <Notice tone="warning" message={MESSAGES.SHARE_TOO_LONG} />
      )}
      <Footnote>
        <ViewIcon />
        <Text variant="caption" tone="secondary">
          {MESSAGES.SHARE_READ_ONLY}
        </Text>
      </Footnote>
      <Toast open={toast !== null} message={toast ?? ''} onClose={() => setToast(null)} />
    </Dialog>
  )
}
