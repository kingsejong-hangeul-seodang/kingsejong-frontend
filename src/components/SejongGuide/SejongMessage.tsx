import type { CSSProperties } from 'react'
import styles from './SejongMessage.module.css'
export function SejongMessage({
  title,
  description,
  src = '/assets/figma/fc462.png',
  vertical = false,
  characterWidth = 120,
  characterHeight = 191.8,
  className = '',
}: {
  title: string
  description?: string
  src?: string
  vertical?: boolean
  characterWidth?: number
  characterHeight?: number
  className?: string | undefined
}) {
  return (
    <div
      className={`${className} ${styles.message}`}
      data-name="say"
      data-layout={vertical ? 'vertical' : 'horizontal'}
      style={
        {
          '--character-width': `${characterWidth}px`,
          '--character-height': `${characterHeight}px`,
        } as CSSProperties
      }
    >
      <div className={styles.character} data-name="킹세종">
        <img src={src} alt="" />
      </div>
      <div className={styles.bubble} data-name="bubble">
        <p className={styles.title}>{title}</p>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </div>
  )
}
