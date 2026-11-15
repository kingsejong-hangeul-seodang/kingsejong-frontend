import { Action } from './Action'
import styles from './controls.module.css'
export function AppBar({ title = '' }: { title?: string }) {
  return (
    <header className={styles.appbar} data-name="appbar">
      <Action className={styles.back} kind="appbar-btn" label="이전 화면" data-name="appbar-btn">
        <img src="/assets/figma/3cb51.svg" alt="" />
      </Action>
      {title && <h1 className={styles.title}>{title}</h1>}
    </header>
  )
}
