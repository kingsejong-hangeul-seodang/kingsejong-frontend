import { createContext, useContext } from 'react'
import type { SubmittedCell } from '@/data/writingTypes'
import type { InkPoint } from '@/api/api'
export type Command = 'undo' | 'cell' | 'clear'
export type Cell = {
  index: number
  bounds: () => DOMRect | undefined
  append: (stroke: InkPoint[]) => void
  run: (command: Command) => void
  snapshot: () => SubmittedCell
}
export const WritingContext = createContext<{
  restoreCell: (index: number) => SubmittedCell | undefined
  rememberCell: (index: number, cell: SubmittedCell) => void
  register: (id: string, cell: Cell) => () => void
  commitStroke: (origin: string, points: InkPoint[]) => void
  activate: (id: string) => void
  activeId: string
  command: (command: Command) => void
  count: number
  report: (id: string, written: boolean) => void
  snapshot: () => SubmittedCell[]
  timestamp: () => number
  submitting: boolean
  submit: <T>(operation: () => Promise<T>) => Promise<T | undefined>
} | null>(null)
export function useWriting() {
  const value = useContext(WritingContext)
  if (!value) throw new Error('WritingProvider is required')
  return value
}
