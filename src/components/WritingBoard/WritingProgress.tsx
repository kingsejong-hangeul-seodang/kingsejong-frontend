import type { HTMLAttributes } from 'react'
import { useWriting } from './useWriting'
export function WritingProgress({
  total,
  ...props
}: HTMLAttributes<HTMLParagraphElement> & { total: number }) {
  const { count } = useWriting()
  return (
    <p {...props} role="status" aria-live="polite">
      {total}칸 중 {Math.min(count, total)}칸을 썼어요
    </p>
  )
}
