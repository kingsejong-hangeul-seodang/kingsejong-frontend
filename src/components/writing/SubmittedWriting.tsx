import { useUiText } from '@/app/useUiText'
import { GradedInk } from './GradedInk'
import { useSession } from '@/app/useSession'
import styles from './SubmittedWriting.module.css'
import paperStyles from './ManuscriptPaper.module.css'
import type { Stage } from '@/app/session'
import { ManuscriptPaper } from './ManuscriptPaper'
import { targetGroups } from '@/data/content'
import { feedbackMarks, visibleGrade } from '@/data/writingFeedback'

export function SubmittedWriting({
  stage,
  compact = false,
  progressByCell,
  shapeCells,
  onShapeSelect,
  caption,
}: {
  stage?: Stage | undefined
  compact?: boolean
  progressByCell?: readonly number[][] | undefined
  shapeCells?: ReadonlySet<number>
  onShapeSelect?: (index: number) => void
  caption?: string | null | undefined
}) {
  const t = useUiText()
  const { draft } = useSession()
  const current = draft && (!stage || draft.stage === stage) ? draft : null
  if (!current)
    return <p className={styles.empty}>{t('아직 제출한 글씨가 없어요. 먼저 글씨를 써 주세요.')}</p>
  if (!current.cells.length)
    return <p className={styles.empty}>{t('이 기록에는 필기 원본이 저장되지 않았어요.')}</p>
  const grade = visibleGrade(current.grade)
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
          ? t(
              '{0}칸 중 {1}칸을 썼어요',
              current.cells.length,
              current.cells.filter((cell) => cell.written).length,
            )
          : caption
      }
      renderCell={(index) => {
        const ink = current.cells[index]?.strokes.length ? (
          <GradedInk
            cell={current.cells[index]}
            errors={
              compact || current.stage === 'beginner' ? (grade?.cells[index]?.errors ?? []) : []
            }
            progressByStroke={progressByCell?.[index]}
          />
        ) : current.cells[index]?.image ? (
          <img
            src={current.cells[index].image}
            alt={t('{0}번째 칸에 쓴 글씨', index + 1)}
            draggable={false}
          />
        ) : null
        return onShapeSelect && shapeCells?.has(index) ? (
          <button
            type="button"
            className={paperStyles.cellAction}
            aria-label={t('{0}번째 칸 모양 크게 보기', index + 1)}
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
