import { createContext, useContext } from 'react'
import type { SubmittedCell } from './draft'
export type Command = 'undo' | 'cell' | 'clear' | 'replay'
export type Cell = { run: (command: Command) => void; snapshot: () => SubmittedCell }
export const WritingContext = createContext<{
  register: (id: string, cell: Cell) => () => void
  activate: (id: string) => void
  command: (command: Command) => void
  count: number
  report: (id: string, written: boolean) => void
  snapshot: () => SubmittedCell[]
} | null>(null)
export function useWriting() {
  const value = useContext(WritingContext)
  if (!value) throw new Error('WritingProvider is required')
  return value
}
