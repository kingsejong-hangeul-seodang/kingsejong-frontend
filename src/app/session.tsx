import { useMemo, useState, type ReactNode } from 'react'
import type { ScreenName } from './routes/screens'
import { SessionContext } from './useSession'
import type { WritingDraft } from '@/data/writingTypes'
import { clearWritingMemory, writingKey, writingMemory } from '@/data/writingDrafts'
import { retryCellIndexes } from '@/data/writingFeedback'
import { createCatalogCache } from '@/api/catalogCache'
import type { LevelAssessment } from '@/api/study'

export type Stage = 'beginner' | 'mid' | 'pro'
export type Mode = 'pop' | 'drama' | 'basic'
export type Preferences = {
  stage: Stage
  mode: Mode
  language: '한국어' | 'English'
  experience: string
  singer: string
  drama: string
  code: string
  consent: boolean
  exp: number
}
const defaults: Preferences = {
  stage: 'mid',
  mode: 'pop',
  language: '한국어',
  experience: '공부해 봤어요',
  singer: '하늘별',
  drama: '',
  code: '',
  consent: true,
  exp: 120,
}
function restore(): Preferences {
  try {
    const value = JSON.parse(
      localStorage.getItem('hangeul-preferences') || 'null',
    ) as Partial<Preferences> | null
    return {
      ...defaults,
      stage:
        value && ['beginner', 'mid', 'pro'].includes(value.stage ?? '')
          ? value.stage!
          : defaults.stage,
      mode:
        value && ['pop', 'drama', 'basic'].includes(value.mode ?? '') ? value.mode! : defaults.mode,
      language: value?.language === 'English' ? 'English' : '한국어',
      singer: value?.singer === '루나틱' ? '루나틱' : '하늘별',
      drama: typeof value?.drama === 'string' ? value.drama : '',
      experience: value?.experience === '처음 배워요' ? '처음 배워요' : defaults.experience,
      consent: typeof value?.consent === 'boolean' ? value.consent : defaults.consent,
      exp:
        typeof value?.exp === 'number' && Number.isSafeInteger(value.exp) && value.exp >= 0
          ? value.exp
          : defaults.exp,
    }
  } catch {
    return defaults
  }
}
export function SessionProvider({ screen, children }: { screen: ScreenName; children: ReactNode }) {
  const [preferences, setPreferences] = useState(restore)
  const [notice, notify] = useState('')
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const catalog = useMemo(() => {
    // Each authenticated session owns its cache.
    return { ...createCatalogCache(), token: accessToken }
  }, [accessToken])
  const [draft, saveDraft] = useState<WritingDraft | null>(null)
  const [contentId, setContentId] = useState('miss-you')
  const [practiceTarget, setPracticeTarget] = useState<string | null>(null)
  const [writingRevision, setWritingRevision] = useState(0)
  const [resultOrigin, setResultOrigin] = useState<'records' | 'jamo-digeut' | 'jamo-a' | null>(
    null,
  )
  const [settingsOrigin, setSettingsOrigin] = useState(false)
  const [selectedThumbnail, setSelectedThumbnail] = useState<string | null>(null)
  function selectContent(id: string, thumbnailUrl: string | null = null) {
    setSelectedThumbnail(thumbnailUrl)
    setContentId(id)
    setPracticeTarget(null)
  }
  function selectPractice(target: string) {
    setPracticeTarget(target.normalize('NFC'))
  }
  function beginAttempt(stage: Stage, scope: 'all' | 'errors' | number = 'all') {
    const key = writingKey(contentId, practiceTarget, stage)
    clearWritingMemory(key)
    const previous =
      draft?.stage === stage &&
      draft.contentId === contentId &&
      (draft.practiceTarget ?? null) === practiceTarget
        ? draft
        : null
    if (scope !== 'all' && previous) {
      const retry = new Set(typeof scope === 'number' ? [scope] : retryCellIndexes(previous))
      if (retry.size) {
        const memory = writingMemory(key)
        previous.cells.forEach((cell, index) => {
          if (!retry.has(index)) memory.set(index, cell)
        })
      }
    }
    setWritingRevision((value) => value + 1)
    setResultOrigin(null)
  }
  const [jamo, selectJamo] = useState('ㄷ')
  const [comparisonCell, selectComparisonCell] = useState<number | null>(null)
  const [testDrafts, setTestDrafts] = useState<Partial<Record<number, WritingDraft>>>({})
  const [testAssessment, setTestAssessment] = useState<LevelAssessment | null>(null)
  function saveTest(step: number, draft: WritingDraft) {
    setTestDrafts((previous) => ({ ...(step === 0 ? {} : previous), [step]: draft }))
  }
  function update(value: Partial<Preferences>) {
    setPreferences((previous) => {
      const next = { ...previous, ...value }
      try {
        const saved = { ...next, code: undefined }
        localStorage.setItem('hangeul-preferences', JSON.stringify(saved))
      } catch {
        /* Optional storage. */
      }
      return next
    })
  }
  function reset() {
    setAccessToken(null)
    setPreferences(defaults)
    saveDraft(null)
    clearWritingMemory()
    setPracticeTarget(null)
    setContentId('miss-you')
    setResultOrigin(null)
    setSettingsOrigin(false)
    setTestDrafts({})
    setTestAssessment(null)
    notify('')
    try {
      localStorage.removeItem('hangeul-preferences')
    } catch {
      /* Optional storage. */
    }
  }
  return (
    <SessionContext
      value={{
        screen,
        preferences,
        update,
        notice,
        notify,
        accessToken,
        setAccessToken,
        catalog,
        reset,
        draft,
        saveDraft,
        contentId,
        selectContent,
        selectedThumbnail,
        practiceTarget,
        selectPractice,
        writingRevision,
        beginAttempt,
        resultOrigin,
        setResultOrigin,
        settingsOrigin,
        setSettingsOrigin,
        jamo,
        selectJamo,
        comparisonCell,
        selectComparisonCell,
        testDrafts,
        saveTest,
        testAssessment,
        setTestAssessment,
      }}
    >
      {children}
    </SessionContext>
  )
}
