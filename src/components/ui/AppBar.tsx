import styles from './controls.module.css'
export function AppBar({ title = '', onBack }: { title?: string; onBack: () => void }) {
  return (
    <header className={styles.appbar} data-name="appbar">
      <button
        type="button"
        className={styles.back}
        aria-label="이전 화면"
        data-action="appbar-btn"
        data-name="appbar-btn"
        onClick={onBack}
      >
        <img src="/assets/figma/3cb51.svg" alt="" />
      </button>
      {title && <h1 className={styles.title}>{title}</h1>}
    </header>
  )
}
