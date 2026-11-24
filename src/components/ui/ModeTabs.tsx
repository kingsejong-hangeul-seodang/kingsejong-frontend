import { useUiText } from '@/app/useUiText'
import type { Mode } from '@/app/session'
import styles from './patterns.module.css'
const modes = [
  ['pop', 'K팝', '3fbea.svg'],
  ['drama', 'K드라마', '4a83e.svg'],
  ['basic', '기본 연습', '37e74.svg'],
] as const
export function ModeTabs({ value, onChange }: { value: Mode; onChange: (mode: Mode) => void }) {
  const t = useUiText()
  return (
    <div className={styles.modes} data-name="modes" role="group" aria-label={t('학습 콘텐츠 선택')}>
      {modes.map(([mode, label, icon]) => (
        <button
          key={mode}
          type="button"
          data-action="mode"
          aria-label={t(label)}
          data-selected={value === mode}
          aria-pressed={value === mode}
          data-name="mode"
          className={styles.mode}
          onClick={() => onChange(mode)}
        >
          <img src={`/assets/figma/${icon}`} alt="" />
          {t(label)}
        </button>
      ))}
    </div>
  )
}
