import { useCallback, useRef, useState, type ReactNode } from 'react'
import { WritingContext, type Cell } from './useWriting'
import { writingMemory } from '@/data/writingDrafts'
import { assignStroke } from './inkGeometry'
export function WritingProvider({ children, cacheKey }: { children: ReactNode; cacheKey: string }) {
  const [memory] = useState(() => writingMemory(cacheKey))
  const [elapsed] = useState(() =>
    [...memory.values()].reduce(
      (max, cell) =>
        cell.strokes.reduce(
          (max, stroke) => stroke.points.reduce((max, point) => Math.max(max, point[2]), max),
          max,
        ),
      0,
    ),
  )
  const cells = useRef(new Map<string, Cell>())
  const active = useRef('')
  const [activeId, setActiveId] = useState('')
  const started = useRef<number | null>(null)
  const pending = useRef(false)
  const [submitting, setSubmitting] = useState(false)
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
        restoreCell: (index) => memory.get(index),
        rememberCell: (index, cell) => {
          memory.set(index, cell)
        },
        register,
        commitStroke(origin, points) {
          const candidates = [...cells.current.entries()].flatMap(([id, cell]) => {
            const bounds = cell.bounds()
            return bounds ? [{ id, bounds }] : []
          })
          const assigned = assignStroke(points, candidates, origin)
          if (!assigned) return
          cells.current.get(assigned.id)?.append(assigned.points)
          active.current = assigned.id
          setActiveId(assigned.id)
        },
        report,
        count: written.size,
        submitting,
        async submit(operation) {
          if (pending.current) return
          pending.current = true
          setSubmitting(true)
          try {
            return await operation()
          } finally {
            pending.current = false
            setSubmitting(false)
          }
        },
        timestamp() {
          const now = performance.now()
          started.current ??= now
          return elapsed + now - started.current
        },
        snapshot() {
          return [...cells.current.values()]
            .sort((a, b) => a.index - b.index)
            .map((cell) => cell.snapshot())
        },
        activate(id) {
          active.current = id
          setActiveId(id)
        },
        activeId,
        command(command) {
          if (command === 'clear') cells.current.forEach((cell) => cell.run(command))
          else cells.current.get(active.current)?.run(command)
        },
      }}
    >
      {children}
    </WritingContext>
  )
}
