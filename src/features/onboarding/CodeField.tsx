import type { HTMLAttributes } from 'react'
import { useSession } from '@/app/useSession'
export function CodeField(props: Omit<HTMLAttributes<HTMLDivElement>, 'children'>) {
  const { preferences, update, notice } = useSession()
  return (
    <div {...props}>
      <input
        aria-label="로그인 코드"
        aria-invalid={!!notice}
        aria-describedby={notice ? 'app-notice' : undefined}
        autoComplete="off"
        autoCapitalize="characters"
        spellCheck={false}
        placeholder="SEJONG-07"
        value={preferences.code}
        maxLength={40}
        onChange={(event) => update({ code: event.target.value.toUpperCase() })}
      />
    </div>
  )
}
