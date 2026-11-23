import type { CSSProperties, ReactNode } from 'react'
import styles from './ManuscriptPaper.module.css'

type Props = {
  count: number
  columns?: number
  cellSize?: 72 | 96 | 144
  compact?: boolean
  caption?: ReactNode
  renderCell: (index: number) => ReactNode
  className?: string
  name?: string
  groups?: readonly number[] | undefined
  groupGap?: number | undefined
  cellStates?: readonly ('default' | 'error' | 'stroke-order' | 'shape')[]
}
export function ManuscriptPaper({
  count,
  columns = count,
  cellSize = 72,
  compact = false,
  caption,
  renderCell,
  className = '',
  name = 'manuscript-paper',
  groups,
  groupGap,
  cellStates = [],
}: Props) {
  const cols = Math.max(1, columns)
  const grouped =
    groups &&
    groups.length > 0 &&
    groups.every((size) => Number.isInteger(size) && size > 0) &&
    groups.reduce((sum, size) => sum + size, 0) === count
  const sections = grouped
    ? groups.map((size, index) => ({
        count: size,
        columns: size,
        start: groups.slice(0, index).reduce((sum, value) => sum + value, 0),
      }))
    : [{ count, columns: cols, start: 0 }]
  return (
    <div
      className={`${styles.paper} ${compact ? styles.compact : ''} ${className}`}
      data-name={name}
      style={
        {
          '--paper-columns': cols,
          '--paper-cell-size': `${cellSize}px`,
          '--paper-group-count': sections.length,
          '--paper-gap-count': sections.length - 1,
          '--paper-group-gap': groupGap ? `${groupGap}px` : 'var(--space-block-pad)',
        } as CSSProperties
      }
    >
      <div className={styles.groups}>
        {sections.map((section) => (
          <div
            key={section.start}
            className={styles.grid}
            data-name="paper-grid"
            style={{ '--group-columns': section.columns } as CSSProperties}
          >
            {Array.from({ length: section.count }, (_, localIndex) => {
              const index = section.start + localIndex
              return (
                <div
                  key={index}
                  className={styles.cell}
                  data-name="paper-cell"
                  data-state={cellStates[index] ?? 'default'}
                >
                  {renderCell(index)}
                </div>
              )
            })}
          </div>
        ))}
      </div>
      {caption && <div className={styles.caption}>{caption}</div>}
    </div>
  )
}
