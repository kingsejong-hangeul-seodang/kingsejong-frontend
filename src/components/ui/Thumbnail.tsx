import type { HTMLAttributes } from 'react'
import styles from './patterns.module.css'
export function Thumbnail({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} data-name="poster" className={`${className} ${styles.thumbnail}`} />
}
