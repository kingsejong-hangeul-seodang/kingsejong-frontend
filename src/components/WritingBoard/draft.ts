import type { Stage } from '@/app/session'
export type SubmittedCell = { image: string; written: boolean }
export type WritingDraft = { source: string; stage: Stage; cells: SubmittedCell[] }
