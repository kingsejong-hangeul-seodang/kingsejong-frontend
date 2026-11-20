import type { ReactNode } from 'react'
import styles from './patterns.module.css'
export function ContentCard({
  label,
  poster,
  title,
  description,
  className = '',
  onClick,
}: {
  label: string
  poster: ReactNode
  title: ReactNode
  description: ReactNode
  className?: string | undefined
  onClick: () => void
}) {
  return (
    <button
      type="button"
      data-action="c-card"
      aria-label={label}
      onClick={onClick}
      data-name="c-card"
      className={`${className} ${styles.contentCard}`}
    >
      {poster}
      <div className={styles.contentBody} data-name="c-body">
        {title}
        <p className={styles.description}>{description}</p>
      </div>
    </button>
  )
}
