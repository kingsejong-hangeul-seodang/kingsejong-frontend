import { useUiText } from '@/app/useUiText'
import styles from './patterns.module.css'
export function JamoTile({
  glyph,
  glyphFontFamily,
  label,
  status = 'default',
  onClick,
}: {
  glyph: string
  glyphFontFamily?: string
  label?: string
  status?: 'default' | 'familiar' | 'practice'
  onClick: () => void
}) {
  const t = useUiText()
  return (
    <button
      type="button"
      data-action="jamo"
      aria-label={label ?? glyph}
      onClick={onClick}
      data-name="jamo"
      data-status={status}
      className={styles.jamo}
    >
      <b
        className={styles.jamoGlyph}
        style={glyphFontFamily ? { fontFamily: glyphFontFamily, fontWeight: 'normal' } : undefined}
      >
        {glyph}
      </b>
      {status !== 'default' && <span>{status === 'familiar' ? t('익숙') : t('연습')}</span>}
    </button>
  )
}
