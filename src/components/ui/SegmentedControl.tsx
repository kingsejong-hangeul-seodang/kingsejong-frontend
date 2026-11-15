import { Action } from './Action'
import styles from './controls.module.css'
export function SegmentedControl({
  options,
  kind = 'stage-item',
  label,
  fullWidth = false,
}: {
  options: readonly string[]
  kind?: 'stage-item' | 'seg-item'
  label: string
  fullWidth?: boolean
}) {
  return (
    <div
      className={`${styles.segment} ${fullWidth ? styles.stretch : ''}`}
      data-name={kind === 'stage-item' ? 'stage' : 'seg'}
      role="group"
      aria-label={label}
    >
      {options.map((option) => (
        <Action key={option} kind={kind} label={option} data-name={kind} className={styles.stage}>
          {option}
        </Action>
      ))}
    </div>
  )
}
