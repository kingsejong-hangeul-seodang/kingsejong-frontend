import { Action } from './Action'
import styles from './patterns.module.css'
const modes = [
  ['K팝', '3fbea.svg'],
  ['K드라마', '4a83e.svg'],
  ['기본 연습', '37e74.svg'],
] as const
export function ModeTabs() {
  return (
    <div className={styles.modes} data-name="modes" role="group" aria-label="학습 콘텐츠 선택">
      {modes.map(([label, icon]) => (
        <Action key={label} kind="mode" label={label} data-name="mode" className={styles.mode}>
          <img src={`/assets/figma/${icon}`} alt="" />
          {label}
        </Action>
      ))}
    </div>
  )
}
