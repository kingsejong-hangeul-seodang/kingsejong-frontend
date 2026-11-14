import { Action } from './Action'
import styles from './controls.module.css'
export function StageSelector() {
  return (
    <div className={styles.segment} data-name="stage" role="group" aria-label="난이도 선택">
      {['초보', '중수', '고수'].map((label) => (
        <Action
          key={label}
          kind="stage-item"
          label={label}
          data-name="stage-item"
          className={styles.stage}
        >
          {label}
        </Action>
      ))}
    </div>
  )
}
