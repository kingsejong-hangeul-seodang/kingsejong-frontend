import { useUiText } from '@/app/useUiText'
import type { HTMLAttributes } from 'react'
import { useSession } from '@/app/useSession'
import { TextInput } from '@/components/ui/TextInput'
export function CodeField(props: Omit<HTMLAttributes<HTMLDivElement>, 'children'>) {
  const t = useUiText()
  const { preferences, update, notice } = useSession()
  return (
    <div {...props}>
      <TextInput
        aria-label={t('로그인 코드')}
        aria-invalid={!!notice}
        aria-describedby={notice ? 'app-notice' : undefined}
        autoComplete="off"
        autoCapitalize="characters"
        spellCheck={false}
        placeholder="DGU-001"
        value={preferences.code}
        maxLength={40}
        onChange={(event) => update({ code: event.target.value.toUpperCase() })}
      />
    </div>
  )
}
