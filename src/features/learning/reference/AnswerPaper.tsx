import { useUiText } from '@/app/useUiText'
import { ManuscriptPaper } from '@/components/writing/ManuscriptPaper'
import type { Stage } from '@/app/session'
import { useSession } from '@/app/useSession'
import { targetCells, targetGroups } from '@/data/content'
import { ReferenceGlyph } from '@/features/learning/reference/ReferenceGlyph'
import type { ReferenceStroke } from '@/api/api'
import layout from '@/features/learning/FigmaLearning.module.css'
export function AnswerPaper({
  stage,
  target,
  strokes,
  progressByCell,
  onSelect,
}: {
  stage: Stage
  target: string
  strokes: Record<string, ReferenceStroke[]>
  progressByCell?: readonly number[][] | undefined
  onSelect?: (char: string, index: number) => void
}) {
  const t = useUiText()
  const { draft } = useSession()
  const cells = targetCells(target, stage)
  return (
    <ManuscriptPaper
      name="answer-writing"
      count={cells.length}
      columns={Math.min(10, cells.length)}
      cellSize={stage === 'beginner' ? 144 : stage === 'mid' ? 96 : 72}
      groups={
        (draft?.stage === stage ? draft.wordGroups : undefined) ?? targetGroups(target, stage)
      }
      groupGap={stage === 'mid' ? 96 : undefined}
      compact
      renderCell={(index) => {
        const char = cells[index]!
        const glyph = (
          <ReferenceGlyph
            char={char}
            referenceStrokes={strokes[char] ?? []}
            numbers
            progressByStroke={progressByCell?.[index]}
          />
        )
        return onSelect && char !== ' ' ? (
          <button
            type="button"
            className={layout.glyphButton}
            aria-label={t('{0} 글씨 크게 보기', char)}
            onClick={() => onSelect(char, index)}
          >
            {glyph}
          </button>
        ) : (
          glyph
        )
      }}
    />
  )
}
