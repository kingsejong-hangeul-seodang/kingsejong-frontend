import type { ButtonHTMLAttributes } from 'react'
import styles from './patterns.module.css'
type Props = ButtonHTMLAttributes<HTMLButtonElement> & { label: string; onClick: () => void }
export function ListRow({ className = '', label, ...props }: Props) {
  return (
    <button
      {...props}
      type="button"
      aria-label={label}
      data-action="row"
      data-name="row"
      className={`${className} ${styles.row}`}
    />
  )
}
