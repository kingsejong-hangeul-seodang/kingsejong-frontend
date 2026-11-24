import { useUiText } from '@/app/useUiText'
import styles from './patterns.module.css'
export function ProgressBar({
  value,
  max = 100,
  label,
  className = '',
}: {
  value: number
  max?: number
  label?: string
  className?: string | undefined
}) {
  const t = useUiText()
  const percent = Math.max(0, Math.min(100, (value / Math.max(max, 1)) * 100))
  return (
    <div
      className={`${className} ${styles.progress}`}
      data-name="xp"
      role="progressbar"
      aria-label={label ?? t('학습 진행률')}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={Math.min(max, Math.max(0, value))}
    >
      <div className={styles.progressFill} style={{ width: `${percent}%` }} />
    </div>
  )
}
