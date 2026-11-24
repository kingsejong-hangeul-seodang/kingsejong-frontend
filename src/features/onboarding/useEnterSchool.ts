import { useUiText } from '@/app/useUiText'
import { useRef, useState } from 'react'
import { useSession } from '@/app/useSession'
import { navigate } from '@/app/router'
import { homeScreen } from '@/app/learningFlow'
import { backend, demoMode } from '@/api/integration'
import { demoLogin } from '@/api/demo'

export function useEnterSchool() {
  const t = useUiText()
  const { preferences, update, notify, setAccessToken } = useSession()
  const [pending, setPending] = useState(false)
  const submitting = useRef(false)

  async function enter(code: string) {
    if (submitting.current) return
    notify('')
    if (!backend && !demoMode) {
      navigate('experience')
      return
    }
    submitting.current = true
    setPending(true)
    try {
      const { accessToken, me } = backend ? await backend.login(code) : demoLogin(code)
      const patch = {
        locale: preferences.language === 'English' ? ('en' as const) : ('ko' as const),
        consentAgreed: preferences.consent,
      }
      const saved = backend ? await backend.updateMe(accessToken, patch) : { ...me, ...patch }
      const stage =
        saved.stage === 'intermediate' ? 'mid' : saved.stage === 'advanced' ? 'pro' : saved.stage
      const mode =
        saved.lastMode === 'kpop' ? 'pop' : saved.lastMode === 'kdrama' ? 'drama' : saved.lastMode
      update({
        ...(stage ? { stage } : {}),
        ...(mode ? { mode } : {}),
        ...(saved.experience
          ? { experience: saved.experience === 'first' ? '처음 배워요' : '공부해 봤어요' }
          : {}),
        exp: saved.level.exp,
        consent: saved.consentAgreed,
        language: saved.locale === 'en' ? 'English' : '한국어',
      })
      setAccessToken(accessToken, saved.id)
      navigate(saved.onboardingCompleted ? homeScreen(mode ?? preferences.mode) : 'experience')
    } catch (error) {
      notify(
        error instanceof Error ? error.message : t('서당에 들어가지 못했어요. 다시 시도해 주세요.'),
      )
    } finally {
      submitting.current = false
      setPending(false)
    }
  }

  return { enter, pending }
}
