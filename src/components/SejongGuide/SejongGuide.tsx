import styles from '@/styles/screens.module.css'
export function SejongGuide({
  className,
  src,
  variant = '기본',
}: {
  className?: string | undefined
  src: string
  variant?: string
}) {
  return (
    <div className={className || styles.element0} data-name={`킹세종/${variant}`}>
      <img className={styles.element1} src={src} alt="" />
    </div>
  )
}
