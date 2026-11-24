import { useUiText } from '@/app/useUiText'
import type { ReactNode } from 'react'
import styles from './patterns.module.css'
export function StatCard({
  label,
  value,
  className = '',
  children,
  onClick,
}: {
  label: ReactNode
  value: ReactNode
  className?: string | undefined
  children?: ReactNode
  onClick?: () => void
}) {
  const t = useUiText()
  const content = (
    <>
      <p className={styles.statLabel}>{label}</p>
      <p className={styles.statValue}>{value}</p>
      {children}
    </>
  )
  return onClick ? (
    <button
      type="button"
      data-action="stat"
      aria-label={t('내 킹세종 보기')}
      onClick={onClick}
      className={`${className} ${styles.stat}`}
      data-name="통계 칸"
    >
      {content}
    </button>
  ) : (
    <div className={`${className} ${styles.stat}`} data-name="통계 칸">
      {content}
    </div>
  )
}
