import { useSession } from '@/app/useSession'
import styles from './SubmittedWriting.module.css'
import type { Stage } from '@/app/session'
import { ManuscriptPaper } from './ManuscriptPaper'

export function SubmittedWriting({
  stage,
  compact = false,
}: {
  stage?: Stage | undefined
  compact?: boolean
}) {
  const { draft } = useSession()
  const current = draft && (!stage || draft.stage === stage) ? draft : null
  if (!current)
    return <p className={styles.empty}>아직 제출한 글씨가 없어요. 먼저 글씨를 써 주세요.</p>
  return (
    <ManuscriptPaper
      name="submitted-writing"
      count={current.cells.length}
      columns={current.stage === 'pro' ? 9 : current.cells.length}
      cellSize={current.stage === 'beginner' ? 144 : current.stage === 'mid' ? 96 : 72}
      groups={current.stage === 'mid' ? [2, 3] : undefined}
      compact={compact}
      caption={`${current.cells.length}칸 중 ${current.cells.filter((cell) => cell.written).length}칸을 썼어요`}
      renderCell={(index) =>
        current.cells[index]?.image ? (
          <img
            src={current.cells[index].image}
            alt={`${index + 1}번째 칸에 쓴 글씨`}
            draggable={false}
          />
        ) : null
      }
    />
  )
}
