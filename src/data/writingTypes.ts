import type { Mode, Stage } from '@/app/session'
import type { GradeResponse, InkStroke, WritingReward } from '@/api/api'
export type SubmittedCell = { image: string; written: boolean; strokes: InkStroke[] }
export type WritingDraft = {
  source: string
  stage: Stage
  target: string
  cells: SubmittedCell[]
  grade: GradeResponse | null
  reward?: WritingReward
  contentId?: string
  catalogContent?: { mode: Mode; source: string; nextContentId: number | null }
  wordGroups?: number[]
  practiceTarget?: string
}
