import { useState, type ReactNode } from 'react'
import type { ScreenName } from './screens'
import { SessionContext } from './useSession'

export type Stage = 'beginner' | 'mid' | 'pro'
export type Mode = 'pop' | 'drama' | 'basic'
export type Preferences = {
  stage: Stage
  mode: Mode
  language: '한국어' | 'English'
  experience: string
  singer: string
  code: string
  consent: boolean
}
const defaults: Preferences = {
  stage: 'mid',
  mode: 'pop',
  language: '한국어',
  experience: '공부해 봤어요',
  singer: '하늘별',
  code: '',
  consent: true,
}
function restore(): Preferences {
  try {
    const value = JSON.parse(
      localStorage.getItem('hangeul-preferences') || 'null',
    ) as Partial<Preferences> | null
    return {
      ...defaults,
      stage:
        value && ['beginner', 'mid', 'pro'].includes(value.stage ?? '')
          ? value.stage!
          : defaults.stage,
      mode:
        value && ['pop', 'drama', 'basic'].includes(value.mode ?? '') ? value.mode! : defaults.mode,
      language: value?.language === 'English' ? 'English' : '한국어',
      singer: value?.singer === '루나틱' ? '루나틱' : '하늘별',
      experience: value?.experience === '처음 배워요' ? '처음 배워요' : defaults.experience,
      consent: typeof value?.consent === 'boolean' ? value.consent : defaults.consent,
    }
  } catch {
    return defaults
  }
}
export function SessionProvider({ screen, children }: { screen: ScreenName; children: ReactNode }) {
  const [preferences, setPreferences] = useState(restore)
  const [notice, notify] = useState('')
  function update(value: Partial<Preferences>) {
    setPreferences((previous) => {
      const next = { ...previous, ...value }
      try {
        const saved = { ...next, code: undefined }
        localStorage.setItem('hangeul-preferences', JSON.stringify(saved))
      } catch {
        /* Optional storage. */
      }
      return next
    })
  }
  function reset() {
    setPreferences(defaults)
    notify('')
    try {
      localStorage.removeItem('hangeul-preferences')
    } catch {
      /* Optional storage. */
    }
  }
  return (
    <SessionContext value={{ screen, preferences, update, notice, notify, reset }}>
      {children}
    </SessionContext>
  )
}
