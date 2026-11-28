import type { GradeResponse, ReferenceStroke } from '../api/api'
import type { SubmittedCell } from './writingTypes'

type StrokeMap = GradeResponse['cells'][number]['strokeMap']
type ReplayGrading = {
  cells: readonly { index: number; strokeMap?: StrokeMap }[]
  alignment?: GradeResponse['alignment'] | undefined
}

export const strokeReplayStepMs = 700

export function createStrokeReplay(
  ink: readonly SubmittedCell[],
  references: readonly ReferenceStroke[][],
  grade?: ReplayGrading,
) {
  const user: number[][] = ink.map(() => [])
  const answer: number[][] = references.map(() => [])
  let length = 0

  function addCell(userIndex: number | null, answerIndex: number | null, strokeMap: StrokeMap) {
    const userSlots = userIndex == null ? undefined : user[userIndex]
    const answerSlots = answerIndex == null ? undefined : answer[answerIndex]
    const reference = answerIndex == null ? [] : (references[answerIndex] ?? [])
    const indexes = new Map<string, number>()
    const counts = new Map<string, number>()
    reference.forEach(({ role, jamo }, index) => {
      const key = `${role}:${jamo}`
      const count = (counts.get(key) ?? 0) + 1
      counts.set(key, count)
      indexes.set(`${key}:${count}`, index)
    })
    const mapped = new Map(
      strokeMap?.map(({ userIndex, role, jamo, strokeNo }) => [
        userIndex,
        indexes.get(`${role}:${jamo}:${strokeNo}`),
      ]),
    )
    const userCount = userIndex == null ? 0 : (ink[userIndex]?.strokes.length ?? 0)
    for (let i = 0; i < userCount; i++) {
      userSlots![i] = length
      const match = strokeMap ? mapped.get(i) : i
      if (
        answerSlots &&
        match != null &&
        match < reference.length &&
        answerSlots[match] === undefined
      )
        answerSlots[match] = length
      length++
    }
    if (answerSlots)
      for (let i = 0; i < reference.length; i++) {
        if (answerSlots[i] === undefined) answerSlots[i] = length++
      }
  }

  const gradeByIndex = new Map(grade?.cells.map((cell) => [cell.index, cell.strokeMap]))
  if (grade?.alignment?.length) {
    const usedInk = new Set<number>()
    const usedAnswer = new Set<number>()
    for (const { cellIndex, targetIndex } of grade.alignment) {
      const i = cellIndex != null && !usedInk.has(cellIndex) ? cellIndex : null
      const j = targetIndex != null && !usedAnswer.has(targetIndex) ? targetIndex : null
      if (i != null) usedInk.add(i)
      if (j != null) usedAnswer.add(j)
      addCell(i, j, i == null ? undefined : gradeByIndex.get(i))
    }
    user.forEach((_, i) => {
      if (!usedInk.has(i)) addCell(i, null, undefined)
    })
    answer.forEach((_, j) => {
      if (!usedAnswer.has(j)) addCell(null, j, undefined)
    })
  } else {
    for (let i = 0; i < Math.max(user.length, answer.length); i++)
      addCell(i < user.length ? i : null, i < answer.length ? i : null, gradeByIndex.get(i))
  }
  return { user, answer, length }
}

export function strokeProgress(slots: readonly number[], position: number) {
  return slots.map((step) => Math.min(1, Math.max(0, position - step)))
}
