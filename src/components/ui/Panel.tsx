import type { HTMLAttributes } from 'react'
import styles from './patterns.module.css'
export function Panel({ className = '', ...props }: HTMLAttributes<HTMLElement>) {
  return <section {...props} className={`${className} ${styles.panel}`} />
}
