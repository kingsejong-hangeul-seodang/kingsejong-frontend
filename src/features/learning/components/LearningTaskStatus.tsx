import { AppBar } from '@/components/ui/AppBar'
import { Button } from '@/components/ui/Button'
import styles from '@/styles/screens.module.css'

export function LearningTaskStatus({
  error,
  onRetry,
  onBack,
}: {
  error: string | undefined
  onRetry: () => void
  onBack: () => void
}) {
  return (
    <div className={styles.screen}>
      <AppBar title="연습할 글" onBack={onBack} />
      <div className={styles.pageContent}>
        <p role="status">{error ?? '연습할 글을 불러오고 있어요.'}</p>
        {error && <Button onClick={onRetry}>다시 불러오기</Button>}
      </div>
    </div>
  )
}
