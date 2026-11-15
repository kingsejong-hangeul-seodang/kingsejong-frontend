import type { ReactNode } from 'react'
import { Action } from './Action'
import styles from './patterns.module.css'
export function ContentCard({
  label,
  poster,
  title,
  description,
  className = '',
}: {
  label: string
  poster: ReactNode
  title: ReactNode
  description: ReactNode
  className?: string | undefined
}) {
  return (
    <Action
      kind="c-card"
      label={label}
      data-name="c-card"
      className={`${className} ${styles.contentCard}`}
    >
      {poster}
      <div className={styles.contentBody} data-name="c-body">
        {title}
        <p className={styles.description}>{description}</p>
      </div>
    </Action>
  )
}
