import { useState, type KeyboardEventHandler } from 'react'
import { LABELS } from '@/constants'
import {
  Card,
  CheckIcon,
  Chip,
  ClockIcon,
  DeleteIcon,
  DragHandleIcon,
  EditIcon,
  Menu,
  MoveDayIcon,
  MoveDownIcon,
  MoveUpIcon,
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
  onToggleVisited: () => void
  // Left out when the move isn't possible, which also hides its menu item.
  onMoveUp?: () => void
  onMoveDown?: () => void
  onChooseDay?: () => void
  isDragging?: boolean
  handleRef?: (node: HTMLSpanElement | null) => void
  cardRef?: (node: HTMLDivElement | null) => void
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>
  describedBy?: string
  readOnly?: boolean
}

export const PlaceCard = ({
  place,
  stopNumber,
  isSelected,
  onSelect,
  onEditTime,
  onSaveNote,
  onRemove,
  onToggleVisited,
  onMoveUp,
  onMoveDown,
  onChooseDay,
  isDragging = false,
  handleRef,
  cardRef,
  onKeyDown,
  describedBy,
  readOnly = false,
}: PlaceCardProps) => {
  const [isEditingNote, setIsEditingNote] = useState(false)
  const timing = formatPlaceTiming(place)
  const moveItems = [
    onMoveUp && {
      id: 'up',
      label: LABELS.MOVE_UP,
      icon: <MoveUpIcon />,
      onSelect: onMoveUp,
    },
    onMoveDown && {
      id: 'down',
      label: LABELS.MOVE_DOWN,
      icon: <MoveDownIcon />,
      onSelect: onMoveDown,
    },
    onChooseDay && {
      id: 'day',
      label: LABELS.MOVE_TO_DAY,
      icon: <MoveDayIcon />,
      onSelect: onChooseDay,
    },
  ].filter((item) => item !== undefined)

  const handleSaveNote = (note: string | null) => {
    onSaveNote(note)
    setIsEditingNote(false)
  }

  return (
    <Card
      ref={cardRef}
      padding="sm"
      selected={isSelected || isDragging}
      dashed={isDragging}
    >
      <Row $isPlaceholder={isDragging}>
        {!readOnly && (
          <Handle ref={handleRef} aria-hidden="true">
            <DragHandleIcon />
          </Handle>
        )}
        <StopBadge number={stopNumber} highlighted={isSelected} visited={place.visited} />
        <Content>
          <SelectButton
            type="button"
            aria-pressed={isSelected}
            aria-describedby={describedBy}
            onClick={onSelect}
            onKeyDown={onKeyDown}
          >
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
            {readOnly ? (
              place.note && (
                <Text variant="caption" tone="secondary">
                  {place.note}
                </Text>
              )
            ) : isEditingNote ? (
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
        {!readOnly && (
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
                ...moveItems,
                {
                  id: 'visited',
                  label: place.visited ? LABELS.MARK_NOT_VISITED : LABELS.MARK_VISITED,
                  icon: <CheckIcon />,
                  onSelect: onToggleVisited,
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
        )}
      </Row>
    </Card>
  )
}
