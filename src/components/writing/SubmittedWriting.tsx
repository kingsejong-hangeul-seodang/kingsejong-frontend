import { GradedInk } from './GradedInk'
import { useSession } from '@/app/useSession'
import styles from './SubmittedWriting.module.css'
import paperStyles from './ManuscriptPaper.module.css'
import type { Stage } from '@/app/session'
import { ManuscriptPaper } from './ManuscriptPaper'
import { targetGroups } from '@/data/content'
import { feedbackMarks } from '@/data/writingFeedback'

export function SubmittedWriting({
  stage,
  compact = false,
  until = Infinity,
  shapeCells,
  onShapeSelect,
  caption,
}: {
  stage?: Stage | undefined
  compact?: boolean
  until?: number
  shapeCells?: ReadonlySet<number>
  onShapeSelect?: (index: number) => void
  caption?: string | null | undefined
}) {
  const { draft } = useSession()
  const current = draft && (!stage || draft.stage === stage) ? draft : null
  if (!current)
    return <p className={styles.empty}>아직 제출한 글씨가 없어요. 먼저 글씨를 써 주세요.</p>
  return (
    <ManuscriptPaper
      name="submitted-writing"
      count={current.cells.length}
      columns={current.stage === 'pro' ? 10 : current.cells.length}
      cellSize={current.stage === 'beginner' ? 144 : current.stage === 'mid' ? 96 : 72}
      groups={current.wordGroups ?? targetGroups(current.target, current.stage)}
      groupGap={current.stage === 'mid' ? 96 : undefined}
      compact={compact}
      cellStates={feedbackMarks(current, compact).map((mark, index) =>
        shapeCells?.has(index)
          ? 'shape'
          : mark === 'stroke'
            ? 'stroke-order'
            : mark === 'char' || mark === 'spacing'
              ? 'error'
              : 'default',
      )}
      caption={
        caption === undefined
          ? `${current.cells.length}칸 중 ${current.cells.filter((cell) => cell.written).length}칸을 썼어요`
          : caption
      }
      renderCell={(index) => {
        const ink = current.cells[index]?.strokes.length ? (
          <GradedInk
            cell={current.cells[index]}
            errors={
              (compact || current.stage === 'beginner') &&
              !current.grade?.engineVersion.endsWith('stub')
                ? (current.grade?.cells[index]?.errors ?? [])
                : []
            }
            until={until}
          />
        ) : current.cells[index]?.image ? (
          <img
            src={current.cells[index].image}
            alt={`${index + 1}번째 칸에 쓴 글씨`}
            draggable={false}
          />
        ) : null
        return onShapeSelect && shapeCells?.has(index) ? (
          <button
            type="button"
            className={paperStyles.cellAction}
            aria-label={`${index + 1}번째 칸 모양 크게 보기`}
            onClick={() => onShapeSelect(index)}
          >
            {ink}
          </button>
        ) : (
          ink
        )
      }}
    />
  )
}
