import { jamoParts } from './hangul.ts'
import type { Mastery } from '../api/api'
import type { WritingDraft } from './writingTypes'

type Outcome = 'ungraded' | 'pass' | 'retry'
export type JamoAttempt = Partial<Record<string, Outcome>>
export type JamoPractice = {
  outcomes: JamoAttempt
  createdAt?: string
  target?: string
}
export const consecutivePasses = 3
const maxAttempts = 100

export const masteryLabels: Record<Mastery, string> = {
  none: '아직 안 씀',
  practice: '연습',
  familiar: '익숙',
}
export const attemptLabels: Record<Outcome, string> = {
  ungraded: '미채점',
  pass: '통과',
  retry: '다시 연습',
}

export function jamoAttempt({ target, stage, cells, grade }: WritingDraft): JamoAttempt {
  const letters = [...target.normalize('NFC')]
  const graded = grade && !grade.engineVersion.endsWith('stub') ? grade : null
  const attempt: JamoAttempt = {}
  const expected = stage === 'pro' ? letters : letters.filter((letter) => letter !== ' ')

  for (const [index, cell] of cells.entries()) {
    if (!cell.strokes.length) continue
    const result = graded?.cells[index]
    const targetIndex = graded?.alignment.find((item) => item.cellIndex === index)?.targetIndex
    const char =
      targetIndex != null
        ? letters[targetIndex]
        : (result?.expected ?? (stage !== 'pro' || !graded ? expected[index] : undefined))
    if (!char) continue
    const outcome: Outcome = !result
      ? 'ungraded'
      : result.charCorrect &&
          result.mark !== 'char' &&
          result.mark !== 'stroke' &&
          result.strokePass !== false
        ? 'pass'
        : 'retry'
    for (const jamo of jamoParts(char)) {
      if (attempt[jamo] !== 'retry' && (outcome !== 'ungraded' || !attempt[jamo])) {
        attempt[jamo] = outcome
      }
    }
  }
  return attempt
}

// Records arrive newest first. Each submission counts once per jamo.
export function summarizeJamoMastery(attempts: JamoAttempt[]) {
  const progress = new Map<
    string,
    {
      status: Mastery
      practiceCount: number
      recentGrades: ('pass' | 'retry')[]
    }
  >()
  for (const attempt of attempts) {
    for (const [jamo, outcome] of Object.entries(attempt)) {
      if (outcome !== 'ungraded' && outcome !== 'pass' && outcome !== 'retry') continue
      const next = progress.get(jamo) ?? { status: 'practice', practiceCount: 0, recentGrades: [] }
      next.practiceCount++
      if (outcome !== 'ungraded' && next.recentGrades.length < consecutivePasses)
        next.recentGrades.push(outcome)
      progress.set(jamo, next)
    }
  }
  for (const item of progress.values()) {
    if (
      item.recentGrades.length === consecutivePasses &&
      item.recentGrades.every((value) => value === 'pass')
    ) {
      item.status = 'familiar'
    }
  }
  return progress
}

// Store practice summaries, never ink or images, scoped to the server and account.
const storageKey = (scope: string) => `hangeul-jamo-attempts:${scope}`

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === 'object' && !Array.isArray(value))
}

export function readJamoAttempts(scope: string): JamoPractice[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(storageKey(scope)) ?? '[]')
    return Array.isArray(value)
      ? value
          .slice(0, maxAttempts)
          .filter(isRecord)
          .map((item) => ({
            // Older records store the outcomes directly and have no date or target.
            outcomes: (isRecord(item.outcomes) ? item.outcomes : item) as JamoAttempt,
            ...(typeof item.createdAt === 'string' ? { createdAt: item.createdAt } : {}),
            ...(typeof item.target === 'string' ? { target: item.target } : {}),
          }))
      : []
  } catch {
    return []
  }
}

export function saveJamoAttempt(scope: string, draft: WritingDraft) {
  const outcomes = jamoAttempt(draft)
  if (!Object.keys(outcomes).length) return
  const practice = { outcomes, target: draft.target, createdAt: new Date().toISOString() }
  localStorage.setItem(
    storageKey(scope),
    JSON.stringify([practice, ...readJamoAttempts(scope)].slice(0, maxAttempts)),
  )
}
