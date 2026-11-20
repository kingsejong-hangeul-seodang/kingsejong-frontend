import type { Stage } from '@/app/session'
import styles from './controls.module.css'

const options: { value: Stage; label: string }[] = [
  { value: 'beginner', label: '초보' },
  { value: 'mid', label: '중수' },
  { value: 'pro', label: '고수' },
]

export function StageSelector({
  value,
  onChange,
}: {
  value: Stage
  onChange: (stage: Stage) => void
}) {
  return (
    <div className={styles.segment} data-name="stage" role="group" aria-label="난이도 선택">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={styles.stage}
          data-name="stage-item"
          data-action="stage-item"
          data-selected={value === option.value}
          aria-pressed={value === option.value}
          aria-label={option.label}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
