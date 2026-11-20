import { createContext, useContext } from 'react'
import type { ScreenName } from './routes/screens'
import type { Preferences } from './session'
import type { WritingDraft } from '@/data/writingTypes'
import type { Stage } from './session'
import type { CatalogCache } from '@/api/catalogCache'
import type { LevelAssessment } from '@/api/study'
export type { Stage, Mode } from './session'

export const SessionContext = createContext<{
  screen: ScreenName
  preferences: Preferences
  update: (value: Partial<Preferences>) => void
  notice: string
  notify: (value: string) => void
  accessToken: string | null
  setAccessToken: (token: string | null) => void
  catalog: CatalogCache & { token: string | null }
  reset: () => void
  draft: WritingDraft | null
  saveDraft: (draft: WritingDraft) => void
  contentId: string
  selectContent: (id: string, thumbnailUrl?: string | null) => void
  selectedThumbnail: string | null
  practiceTarget: string | null
  selectPractice: (target: string) => void
  writingRevision: number
  beginAttempt: (stage: Stage, scope?: 'all' | 'errors' | number) => void
  resultOrigin: 'records' | 'jamo-digeut' | 'jamo-a' | null
  setResultOrigin: (origin: 'records' | 'jamo-digeut' | 'jamo-a' | null) => void
  settingsOrigin: boolean
  setSettingsOrigin: (value: boolean) => void
  jamo: string
  selectJamo: (jamo: string) => void
  comparisonCell: number | null
  selectComparisonCell: (index: number) => void
  testDrafts: Partial<Record<number, WritingDraft>>
  saveTest: (step: number, draft: WritingDraft) => void
  testAssessment: LevelAssessment | null
  setTestAssessment: (assessment: LevelAssessment | null) => void
} | null>(null)

export function useSession() {
  const session = useContext(SessionContext)
  if (!session) throw new Error('SessionProvider is required')
  return session
}
