import { useCallback, useRef, useState, type ReactNode } from 'react'
import { WritingContext, type Cell } from './useWriting'
export function WritingProvider({ children }: { children: ReactNode }) {
  const cells = useRef(new Map<string, Cell>())
  const active = useRef('')
  const [written, setWritten] = useState<ReadonlySet<string>>(() => new Set())
  const register = useCallback((id: string, cell: Cell) => {
    cells.current.set(id, cell)
    return () => {
      cells.current.delete(id)
    }
  }, [])
  const report = useCallback((id: string, value: boolean) => {
    setWritten((previous) => {
      if (previous.has(id) === value) return previous
      const next = new Set(previous)
      if (value) next.add(id)
      else next.delete(id)
      return next
    })
  }, [])
  return (
    <WritingContext
      value={{
        register,
        report,
        count: written.size,
        activate(id) {
          active.current = id
        },
        command(command) {
          if (command === 'clear') cells.current.forEach((cell) => cell.run(command))
          else if (command === 'replay')
            document
              .querySelectorAll('[data-name="vs-line"]:last-child [data-name="wg-cell"]')
              .forEach((cell, index) => {
                cell.animate([{ opacity: 0.15 }, { opacity: 1 }], {
                  duration: 600,
                  delay: index * 350,
                  fill: 'backwards',
                })
              })
          else cells.current.get(active.current)?.run(command)
        },
      }}
    >
      {children}
    </WritingContext>
  )
}
