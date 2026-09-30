import { useState } from 'react'
import { LABELS, MESSAGES, NOTE_MAX_LENGTH } from '@/constants'
import { Button, TextField } from '@/components/common'
import { Actions, Editor } from './NoteEditor.styles'

export interface NoteEditorProps {
  initial: string | null
  onSave: (note: string | null) => void
  onCancel: () => void
}

export const NoteEditor = ({ initial, onSave, onCancel }: NoteEditorProps) => {
  const [note, setNote] = useState(initial ?? '')

  return (
    <Editor>
      <TextField
        label={LABELS.NOTE}
        value={note}
        onChange={setNote}
        multiline
        minRows={3}
        maxLength={NOTE_MAX_LENGTH}
        showCount
        helperText={MESSAGES.NOTE_HINT}
        autoFocus
      />
      <Actions>
        <Button variant="text" onClick={onCancel}>
          {LABELS.CANCEL}
        </Button>
        <Button onClick={() => onSave(note.trim() || null)}>{LABELS.SAVE}</Button>
      </Actions>
    </Editor>
  )
}
