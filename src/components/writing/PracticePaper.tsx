import { useWriting } from './useWriting'
import { ManuscriptPaper } from './ManuscriptPaper'
import { WritingCell } from './WritingCell'
import styles from './ManuscriptPaper.module.css'
import type { ReactNode } from 'react'
export function PracticePaper({
  count,
  columns = count,
  cellSize = 144,
  groups,
  renderGuide,
}: {
  count: number
  columns?: number
  cellSize?: 72 | 96 | 144
  groups?: readonly number[] | undefined
  renderGuide?: ((index: number) => ReactNode) | undefined
}) {
  const { count: written, submitting } = useWriting()
  return (
    <div className={styles.practice} inert={submitting}>
      <ManuscriptPaper
        count={count}
        columns={columns}
        cellSize={cellSize}
        groups={groups}
        groupGap={groups && groups.length > 1 ? cellSize : undefined}
        caption={
          <p role="status" aria-live="polite">
            {count}칸 중 {Math.min(written, count)}칸을 썼어요
          </p>
        }
        renderCell={(index) => <WritingCell index={index}>{renderGuide?.(index)}</WritingCell>}
      />
    </div>
  )
}
