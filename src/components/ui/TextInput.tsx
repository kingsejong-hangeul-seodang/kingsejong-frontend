import type { InputHTMLAttributes } from 'react'
import styles from './patterns.module.css'
export function TextInput({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${className} ${styles.input}`} />
}
