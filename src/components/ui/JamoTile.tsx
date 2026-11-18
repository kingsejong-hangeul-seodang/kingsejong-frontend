import { Action } from './Action'
import styles from './patterns.module.css'
export function JamoTile({
  glyph,
  src,
  status = 'default',
}: {
  glyph: string
  src: string
  status?: 'default' | 'familiar' | 'practice'
}) {
  return (
    <Action
      kind="jamo"
      label={`동국체: ${glyph}`}
      data-name="jamo"
      data-status={status}
      className={styles.jamo}
    >
      <img src={src} alt="" />
      {status !== 'default' && <span>{status === 'familiar' ? '익숙' : '연습'}</span>}
    </Action>
  )
}
