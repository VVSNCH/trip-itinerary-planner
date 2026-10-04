import styled, { css } from 'styled-components'

// While dragging, the card stays in the list as an empty placeholder of the same size.
export const Row = styled.div<{ $isPlaceholder: boolean }>`
  visibility: ${({ $isPlaceholder }) => ($isPlaceholder ? 'hidden' : 'visible')};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(3)};

  /* A long press picks the card up on touch screens, so it must not select text. */
  @media (pointer: coarse) {
    user-select: none;
    -webkit-touch-callout: none;
  }
`

// Above the stretched select button, so pressing the handle starts a drag.
// The padding grows the grab area to a finger's width without moving the icon.
export const Handle = styled.span`
  position: relative;
  z-index: 1;
  display: inline-flex;
  margin: -${({ theme }) => theme.space(3, 2)};
  padding: ${({ theme }) => theme.space(3, 2)};
  cursor: grab;
  touch-action: none;
  user-select: none;
  -webkit-touch-callout: none;
  color: ${({ theme }) => theme.colors.textMuted};

  & svg {
    font-size: ${({ theme }) => theme.sizes.iconMd};
  }
`

export const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: ${({ theme }) => theme.space(1)};
  min-width: 0;
`

// Selecting is the name's job; its hit area stretches over the whole card.
export const SelectButton = styled.button`
  padding: 0;
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: ${({ theme }) => theme.textStyles.subheading.fontSize};
  font-weight: ${({ theme }) => theme.textStyles.subheading.fontWeight};
  line-height: ${({ theme }) => theme.textStyles.subheading.lineHeight};
  text-align: left;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: ${({ theme }) => theme.radii.lg};
  }

  &:focus-visible {
    outline: none;
  }

  &:focus-visible::after {
    box-shadow: 0 0 0 ${({ theme }) => theme.sizes.focusRing}
      ${({ theme }) => theme.colors.focusRing};
  }
`

export const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.space(2)};
  margin-top: ${({ theme }) => theme.space(1)};
`

// Controls that must stay clickable above the stretched select button.
export const Above = styled.div`
  position: relative;
  z-index: 1;
`

const textButton = css`
  padding: 0;
  border: none;
  background: none;
  font: inherit;
  text-align: left;
  cursor: pointer;
`

export const NoteButton = styled.button`
  ${textButton}
  display: block;
  width: 100%;
  margin-top: ${({ theme }) => theme.space(1)};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.textStyles.caption.fontSize};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const AddNoteButton = styled.button`
  ${textButton}
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.space(1)};
  margin-top: ${({ theme }) => theme.space(1)};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.textStyles.caption.fontSize};
  font-weight: ${({ theme }) => theme.fontWeight.medium};

  & svg {
    font-size: ${({ theme }) => theme.sizes.iconSm};
  }
`

export const Warning = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.space(1)};
  margin-top: ${({ theme }) => theme.space(1.5)};
  color: ${({ theme }) => theme.colors.danger};

  & > svg {
    flex-shrink: 0;
    margin-top: ${({ theme }) => theme.space(0.25)};
    font-size: ${({ theme }) => theme.sizes.iconSm};
  }
`
