import type { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.css'
export type ButtonVariant = 'primary' | 'secondary' | 'small' | 'tool' | 'text'
export function Button({
  variant = 'primary',
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant }) {
  return (
    <button
      {...props}
      type={props.type ?? 'button'}
      className={`${className} ${styles.button}`}
      data-variant={variant}
    />
  )
}
