import type { HTMLAttributes } from 'react'
import styles from './patterns.module.css'
export type BadgeTone = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'experience'
export function Badge({
  tone = 'neutral',
  className = '',
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone }) {
  return <span {...props} className={`${className} ${styles.badge}`} data-tone={tone} />
}
