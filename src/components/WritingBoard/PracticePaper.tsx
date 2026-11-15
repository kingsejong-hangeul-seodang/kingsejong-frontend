import { ManuscriptPaper } from './ManuscriptPaper'
import { WritingCell } from './WritingCell'
import { WritingProgress } from './WritingProgress'
import styles from './ManuscriptPaper.module.css'
export function PracticePaper({
  count,
  columns = count,
  cellSize = 144,
  guides = [],
  groups,
}: {
  count: number
  columns?: number
  cellSize?: 72 | 96 | 144
  guides?: readonly string[]
  groups?: readonly number[]
}) {
  return (
    <div className={styles.practice}>
      <ManuscriptPaper
        count={count}
        columns={columns}
        cellSize={cellSize}
        groups={groups}
        caption={<WritingProgress total={count} />}
        renderCell={(index) => (
          <WritingCell>
            {guides[index] && (
              <img className={styles.guide} src={guides[index]} alt="따라쓰기 글자" />
            )}
          </WritingCell>
        )}
      />
    </div>
  )
}
