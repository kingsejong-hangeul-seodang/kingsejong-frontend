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
      {status !== 'default' && <span>{status === 'familiar' ? '익숙' : '연습'}</span>}
    </button>
  )
}
