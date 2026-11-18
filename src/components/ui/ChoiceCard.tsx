import type { ComponentProps } from 'react'
import { Action } from './Action'
import styles from './patterns.module.css'
export function ChoiceCard({ className = '', ...props }: ComponentProps<typeof Action>) {
  return <Action {...props} className={`${className} ${styles.choice}`} />
}
