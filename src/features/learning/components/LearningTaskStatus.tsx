import { useUiText } from '@/app/useUiText'
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
  const t = useUiText()
  return (
    <div className={styles.screen}>
      <AppBar title={t('연습할 글')} onBack={onBack} />
      <div className={styles.pageContent}>
        <p role="status">{error ?? t('연습할 글을 불러오고 있어요.')}</p>
        {error && <Button onClick={onRetry}>{t('다시 불러오기')}</Button>}
      </div>
    </div>
  )
}
