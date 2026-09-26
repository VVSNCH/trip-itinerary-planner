import type { ReactNode } from 'react'
import { Button } from '../Button/Button'
import { Dialog } from '../Dialog/Dialog'
import { WarningIcon } from '../icons'

export interface ConfirmDialogProps {
  open: boolean
  title: string
  message: ReactNode
  confirmLabel: string
  cancelLabel?: string
  tone?: 'danger' | 'primary'
  children?: ReactNode
  onConfirm: () => void
  onCancel: () => void
}

export const ConfirmDialog = ({
  open,
  title,
  message,
  confirmLabel,
  cancelLabel = 'Cancel',
  tone = 'danger',
  children,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => (
  <Dialog
    open={open}
    onClose={onCancel}
    title={title}
    description={message}
    icon={tone === 'danger' ? <WarningIcon /> : undefined}
    showClose={false}
    actions={
      <>
        <Button variant="text" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button variant={tone} onClick={onConfirm} autoFocus>
          {confirmLabel}
        </Button>
      </>
    }
  >
    {children}
  </Dialog>
)
