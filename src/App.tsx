import { useScreen } from '@/app/router'
import { SessionProvider } from '@/app/session'
import { WritingProvider } from '@/components/WritingBoard/WritingProvider'
import { ScreenLayout } from '@/layouts/ScreenLayout'

export default function App() {
  const screen = useScreen()
  return (
    <SessionProvider screen={screen}>
      <WritingProvider key={screen}>
        <ScreenLayout screen={screen} />
      </WritingProvider>
    </SessionProvider>
  )
}
