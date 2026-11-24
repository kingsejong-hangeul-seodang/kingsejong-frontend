import { useUiText } from '@/app/useUiText'
import styles from './controls.module.css'
export function AppBar({ title = '', onBack }: { title?: string; onBack: () => void }) {
  const t = useUiText()
  return (
    <header className={styles.appbar} data-name="appbar">
      <button
        type="button"
        className={styles.back}
        aria-label={t('이전 화면')}
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
