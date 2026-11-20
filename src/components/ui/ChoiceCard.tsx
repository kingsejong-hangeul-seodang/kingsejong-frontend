import type { ButtonHTMLAttributes } from 'react'
import styles from './patterns.module.css'
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  kind: string
  selected: boolean
  onClick: () => void
}
export function ChoiceCard({ className = '', label, kind, selected, ...props }: Props) {
  return (
    <button
      {...props}
      type="button"
      aria-label={label}
      data-action={kind}
      data-selected={selected}
      aria-pressed={selected}
      className={`${className} ${styles.choice}`}
    />
  )
}
