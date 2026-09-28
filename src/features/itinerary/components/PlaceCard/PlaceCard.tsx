import { useState } from 'react'
import { LABELS } from '@/constants'
import {
  Card,
  Chip,
  ClockIcon,
  DeleteIcon,
  DragHandleIcon,
  EditIcon,
  Menu,
  StopBadge,
  Text,
} from '@/components/common'
import type { Place } from '@/types'
import { formatPlaceTiming } from '../../utils/timing'
import { NoteEditor } from '../NoteEditor/NoteEditor'
import {
  AddNoteButton,
  Above,
  Content,
  Handle,
  Meta,
  NoteButton,
  Row,
  SelectButton,
} from './PlaceCard.styles'

export interface PlaceCardProps {
  place: Place
  stopNumber: number
  isSelected: boolean
  onSelect: () => void
  onEditTime: () => void
  onSaveNote: (note: string | null) => void
  onRemove: () => void
}

export const PlaceCard = ({
  place,
  stopNumber,
  isSelected,
  onSelect,
  onEditTime,
  onSaveNote,
  onRemove,
}: PlaceCardProps) => {
  const [isEditingNote, setIsEditingNote] = useState(false)
  const timing = formatPlaceTiming(place)

  const handleSaveNote = (note: string | null) => {
    onSaveNote(note)
    setIsEditingNote(false)
  }

  return (
    <Card padding="sm" selected={isSelected}>
      <Row>
        <Handle aria-hidden="true">
          <DragHandleIcon />
        </Handle>
        <StopBadge number={stopNumber} highlighted={isSelected} />
        <Content>
          <SelectButton type="button" aria-pressed={isSelected} onClick={onSelect}>
            {place.name}
          </SelectButton>
          <Text tone="secondary" truncate>
            {place.address}
          </Text>
          <Meta>
            {timing && <Chip tone="outline" icon={<ClockIcon />} label={timing} />}
            {place.category && <Text variant="overline">{place.category}</Text>}
          </Meta>
          <Above>
            {isEditingNote ? (
              <NoteEditor
                initial={place.note}
                onSave={handleSaveNote}
                onCancel={() => setIsEditingNote(false)}
              />
            ) : place.note ? (
              <NoteButton type="button" onClick={() => setIsEditingNote(true)}>
                {place.note}
              </NoteButton>
            ) : (
              isSelected && (
                <AddNoteButton type="button" onClick={() => setIsEditingNote(true)}>
                  <EditIcon />
                  {LABELS.ADD_NOTE}
                </AddNoteButton>
              )
            )}
          </Above>
        </Content>
        <Above>
          <Menu
            label={LABELS.PLACE_ACTIONS}
            items={[
              {
                id: 'time',
                label: LABELS.EDIT_TIME,
                icon: <ClockIcon />,
                onSelect: onEditTime,
              },
              {
                id: 'note',
                label: place.note ? LABELS.EDIT_NOTE : LABELS.ADD_NOTE,
                icon: <EditIcon />,
                onSelect: () => setIsEditingNote(true),
              },
              {
                id: 'remove',
                label: LABELS.REMOVE,
                icon: <DeleteIcon />,
                tone: 'danger',
                dividerBefore: true,
                onSelect: onRemove,
              },
            ]}
          />
        </Above>
      </Row>
    </Card>
  )
}
