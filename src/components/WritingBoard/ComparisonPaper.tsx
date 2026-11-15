import type { HTMLAttributes } from 'react'
import styles from './ManuscriptPaper.module.css'
export function ComparisonPaper({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} data-name="vs" className={`${className} ${styles.comparison}`} />
}
