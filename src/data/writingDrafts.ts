import type { SubmittedCell } from './writingTypes'

// Keep unfinished work while moving between screens in this learning session.
const drafts = new Map<string, Map<number, SubmittedCell>>()
export function writingKey(contentId: string, target: string | null, stage: string) {
  return JSON.stringify([contentId, target, stage])
}
export function writingMemory(key: string) {
  let cells = drafts.get(key)
  if (!cells) {
    cells = new Map()
    drafts.set(key, cells)
  }
  return cells
}
export function clearWritingMemory(key?: string) {
  if (key) drafts.delete(key)
  else drafts.clear()
}
