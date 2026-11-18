import { createContext, useContext } from 'react'
import type { ScreenName } from './screens'
import type { Preferences } from './session'
import type { WritingDraft } from '@/components/WritingBoard/draft'
export type { Stage, Mode } from './session'

export const SessionContext = createContext<{
  screen: ScreenName
  preferences: Preferences
  update: (value: Partial<Preferences>) => void
  notice: string
  notify: (value: string) => void
  reset: () => void
  draft: WritingDraft | null
  saveDraft: (draft: WritingDraft) => void
} | null>(null)

export function useSession() {
  const session = useContext(SessionContext)
  if (!session) throw new Error('SessionProvider is required')
  return session
}
