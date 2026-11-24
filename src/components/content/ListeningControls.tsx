import { useUiText } from '@/app/useUiText'
import { Button } from '@/components/ui/Button'
import styles from './ContentArtwork.module.css'

export function ListeningControls({
  play,
  disabled,
  line = false,
  slowDisabled = false,
}: {
  play: (rate: number) => void
  disabled?: boolean
  line?: boolean
  slowDisabled?: boolean
}) {
  const t = useUiText()
  return (
    <div className={styles.listeningControls}>
      <Button variant="small" disabled={disabled} onClick={() => play(1)}>
        <img src="/assets/figma/a44be.svg" width="16" height="16" alt="" />
        {line ? t('이 줄 다시 듣기') : t('다시 듣기')}
      </Button>
      <Button variant="small" disabled={disabled || slowDisabled} onClick={() => play(0.75)}>
        {t('느리게 0.75×')}
      </Button>
    </div>
  )
}
