import { SessionExpiredError, ApiError, apiModes, engineStages, backend } from '@/api/api'
import { useUiText } from '@/app/useUiText'
import { useRef } from 'react'
import type { Preferences } from '@/app/session'
import { useSession } from '@/app/useSession'

type Changes = Partial<Pick<Preferences, 'language' | 'stage' | 'mode'>>

export function useSavePreferences() {
  const t = useUiText()
  const { accessToken, catalog, notify, update } = useSession()
  const saving = useRef(false)

  return async function save(changes: Changes) {
    if (saving.current) return false
    if (!backend) {
      update(changes)
      return true
    }
    saving.current = true
    try {
      if (!accessToken) throw new ApiError(401, 'UNAUTHORIZED', t('로그인이 필요해요.'))
      const me = await backend.updateMe(accessToken, {
        ...(changes.language ? { locale: changes.language === 'English' ? 'en' : 'ko' } : {}),
        ...(changes.stage ? { stage: engineStages[changes.stage] } : {}),
        ...(changes.mode ? { lastMode: apiModes[changes.mode] } : {}),
      })
      catalog.profiles.set('me', Promise.resolve(me))
      update(changes)
      notify('')
      return true
    } catch (error) {
      if (error instanceof SessionExpiredError) return false
      notify(error instanceof Error ? error.message : t('학습 설정을 저장하지 못했어요.'))
      return false
    } finally {
      saving.current = false
    }
  }
}
