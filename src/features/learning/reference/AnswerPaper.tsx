import { ManuscriptPaper } from '@/components/writing/ManuscriptPaper'
import type { Stage } from '@/app/session'
import { useSession } from '@/app/useSession'
import { targetCells, targetGroups } from '@/data/content'
import { ReferenceGlyph } from '@/features/learning/reference/ReferenceGlyph'
import type { ReferenceStroke } from '@/api/grading'
import layout from '@/features/learning/FigmaLearning.module.css'
export function AnswerPaper({
  stage,
  target,
  strokes,
  position = 1,
  onSelect,
}: {
  stage: Stage
  target: string
  strokes: Record<string, ReferenceStroke[]>
  position?: number
  onSelect?: (char: string, index: number) => void
}) {
  const { draft } = useSession()
  const cells = targetCells(target, stage)
  const counts = cells.map((char) => strokes[char]?.length ?? 0)
  const total = counts.reduce((sum, count) => sum + count, 0)
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
            color="var(--color-brand)"
            progress={
              position === 1
                ? Infinity
                : position * total - counts.slice(0, index).reduce((sum, count) => sum + count, 0)
            }
          />
        )
        return onSelect && char !== ' ' ? (
          <button
            type="button"
            className={layout.glyphButton}
            aria-label={`${char} 글씨 크게 보기`}
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
