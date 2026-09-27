// Derived from the data rather than a counter, so ids stay unique across reloads.
export const nextId = (items: ReadonlyArray<{ id: number }>) =>
  items.reduce((max, item) => Math.max(max, item.id), 0) + 1
