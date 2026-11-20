import type { Mark } from '@/api/grading'
import type { WritingDraft } from './writingTypes'

export function shapeFeedback(draft: WritingDraft | null) {
  const grade = draft?.grade
  if (!grade || grade.engineVersion.endsWith('stub') || draft?.stage !== 'beginner') return []
  return grade.cells.flatMap((cell) => {
    const notes = cell.errors.filter((error) => error.type === 'BALANCE')
    const char = cell.expected ?? [...draft.target.replaceAll(' ', '')][cell.index]
    return cell.charCorrect &&
      cell.mark === 'none' &&
      notes.length &&
      char &&
      draft.cells[cell.index]
      ? [{ index: cell.index, char, notes }]
      : []
  })
}

export function feedbackMarks(draft: WritingDraft, detailed = false): Mark[] {
  const { grade, stage, cells } = draft
  const marks: Mark[] = cells.map(() => 'none')
  if (!grade || grade.engineVersion.endsWith('stub') || (!detailed && stage === 'pro')) return marks
  if (
    !detailed &&
    stage === 'mid' &&
    grade.correct &&
    grade.cells.some((cell) => cell.mark === 'stroke')
  )
    return marks

  for (const cell of grade.cells) marks[cell.index] = cell.mark
  for (const item of grade.alignment) {
    if (item.cellIndex != null && (item.mark === 'char' || item.mark === 'spacing'))
      marks[item.cellIndex] = item.mark
  }
  if (stage !== 'mid') return marks

  for (const word of grade.words) {
    const incorrect =
      !word.correct ||
      word.cellIndexes.some((index) => marks[index] === 'char' || marks[index] === 'spacing')
    if (incorrect) {
      for (const index of word.cellIndexes) marks[index] = 'char'
    }
  }
  return marks
}

export function retryCellIndexes(draft: WritingDraft): number[] {
  if (draft.stage === 'pro') return []
  const marks = feedbackMarks(draft, true)
  if (draft.stage === 'mid') {
    // Whole word when a cell in it needs practice, including stroke errors.
    for (const word of draft.grade?.words ?? []) {
      if (word.cellIndexes.some((index) => marks[index] !== 'none')) {
        for (const index of word.cellIndexes) marks[index] = 'char'
      }
    }
  }
  return marks.flatMap((mark, index) => (mark === 'none' ? [] : [index]))
}
