import type { ReactNode } from 'react'
import styles from './patterns.module.css'
import { Action } from './Action'
export function StatCard({
  label,
  value,
  className = '',
  children,
  action = false,
}: {
  label: ReactNode
  value: ReactNode
  className?: string | undefined
  children?: ReactNode
  action?: boolean
}) {
  const content = (
    <>
      <p className={styles.statLabel}>{label}</p>
      <p className={styles.statValue}>{value}</p>
      {children}
    </>
  )
  return action ? (
    <Action
      kind="stat"
      label="내 킹세종 보기"
      className={`${className} ${styles.stat}`}
      data-name="통계 칸"
    >
      {content}
    </Action>
  ) : (
    <div className={`${className} ${styles.stat}`} data-name="통계 칸">
      {content}
    </div>
  )
}
