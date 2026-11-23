import styles from './controls.module.css'
export function SegmentedControl<T extends string>({
  options,
  kind = 'stage-item',
  label,
  fullWidth = false,
  value,
  onChange,
}: {
  options: readonly T[]
  value: T
  onChange: (value: T) => void
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
        <button
          key={option}
          type="button"
          data-action={kind}
          aria-label={option}
          data-selected={value === option}
          aria-pressed={value === option}
          data-name={kind}
          className={styles.stage}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
