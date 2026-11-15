import type { HTMLAttributes } from 'react'
import styles from './patterns.module.css'
export function StrokeDiagram({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div {...props} data-name="stroke-box" className={`${className} ${styles.stroke}`} />
}
