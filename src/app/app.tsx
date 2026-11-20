import { useScreen } from '@/app/router'
import { SessionProvider } from '@/app/session'
import { WritingProvider } from '@/components/writing/WritingProvider'
import { ScreenLayout } from '@/app/layouts/ScreenLayout'
import { IPadPreview } from '@/app/layouts/IPadPreview'
import { useIPadPreview } from '@/app/layouts/useIPadPreview'
import { ReferenceDataPanel } from '@/devtools/ReferenceDataPanel'
import { useSession } from '@/app/useSession'
import { writingKey } from '@/data/writingDrafts'
import type { ReactNode } from 'react'

function PracticeSession({ children }: { children: ReactNode }) {
  const { screen, contentId, practiceTarget, writingRevision } = useSession()
  const stage = screen.startsWith('write-') ? screen.slice(6) : screen
  const cacheKey = writingKey(contentId, practiceTarget, stage)
  return (
    <WritingProvider key={`${cacheKey}:${writingRevision}`} cacheKey={cacheKey}>
      {children}
    </WritingProvider>
  )
}

export default function App() {
  const screen = useScreen()
  const preview = useIPadPreview()
  if (
    import.meta.env.DEV &&
    new URLSearchParams(window.location.search).get('tools') === 'reference'
  )
    return (
      <div style={{ maxWidth: 900, margin: '32px auto', padding: 24 }}>
        <h1>정답 획 데이터 개발 도구</h1>
        <ReferenceDataPanel />
      </div>
    )
  if (preview.enabled) return <IPadPreview scale={preview.scale} />
  return (
    <SessionProvider screen={screen}>
      <PracticeSession>
        <ScreenLayout screen={screen} />
      </PracticeSession>
    </SessionProvider>
  )
}
