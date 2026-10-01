import type { KeyboardEvent } from 'react'

export interface KeyboardMoves {
  onMoveBy: (delta: -1 | 1) => void
  onMoveToDay: (delta: -1 | 1) => void
}

// The keyboard route for everything a drag can do: Ctrl (or Cmd) plus an arrow key.
export const useKeyboardMove = ({ onMoveBy, onMoveToDay }: KeyboardMoves) => {
  const moves: Record<string, () => void> = {
    ArrowUp: () => onMoveBy(-1),
    ArrowDown: () => onMoveBy(1),
    ArrowLeft: () => onMoveToDay(-1),
    ArrowRight: () => onMoveToDay(1),
  }

  return (event: KeyboardEvent<HTMLElement>) => {
    const move = moves[event.key]
    if (!move || !(event.ctrlKey || event.metaKey)) return
    event.preventDefault()
    move()
  }
}
