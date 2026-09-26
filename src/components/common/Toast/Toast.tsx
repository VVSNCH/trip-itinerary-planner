import Snackbar from '@mui/material/Snackbar'
import { TOAST_AUTO_HIDE_MS } from '@/constants'
import { Notice, type NoticeTone } from '@/components/feedback/Notice/Notice'

export interface ToastProps {
  open: boolean
  message: string
  onClose: () => void
  tone?: NoticeTone
  actionLabel?: string
  onAction?: () => void
}

export const Toast = ({
  open,
  message,
  onClose,
  tone = 'info',
  actionLabel,
  onAction,
}: ToastProps) => (
  <Snackbar
    open={open}
    onClose={(_event, reason) => reason !== 'clickaway' && onClose()}
    autoHideDuration={TOAST_AUTO_HIDE_MS}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
  >
    <Notice message={message} tone={tone} actionLabel={actionLabel} onAction={onAction} />
  </Snackbar>
)
