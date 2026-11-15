import { useScreen } from '@/app/router'
import { SessionProvider } from '@/app/session'
import { WritingProvider } from '@/components/WritingBoard/WritingProvider'
import { ScreenLayout } from '@/layouts/ScreenLayout'
import { IPadPreview } from '@/layouts/IPadPreview'
import { useIPadPreview } from '@/layouts/useIPadPreview'

export default function App() {
  const screen = useScreen()
  const preview = useIPadPreview()
  if (preview.enabled) return <IPadPreview scale={preview.scale} />
  return (
    <SessionProvider screen={screen}>
      <WritingProvider key={screen}>
        <ScreenLayout screen={screen} />
      </WritingProvider>
    </SessionProvider>
  )
}
