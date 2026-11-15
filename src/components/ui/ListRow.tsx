import type { ComponentProps } from 'react'
import { Action } from './Action'
import styles from './patterns.module.css'
export function ListRow({ className = '', ...props }: Omit<ComponentProps<typeof Action>, 'kind'>) {
  return <Action {...props} kind="row" data-name="row" className={`${className} ${styles.row}`} />
}
