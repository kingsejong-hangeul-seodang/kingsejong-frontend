import { useUiText } from '@/app/useUiText'
import { ApiError, apiModes, engineStages, backend } from '@/api/api'
import { useSession } from '@/app/useSession'

export function useCompleteOnboarding() {
  const t = useUiText()
  const { accessToken, catalog, preferences } = useSession()

  return async function completeOnboarding() {
    if (!backend) return
    if (!accessToken) throw new ApiError(401, 'UNAUTHORIZED', t('로그인이 필요해요.'))

    await backend.updateMe(accessToken, {
      experience: preferences.experience === '처음 배워요' ? 'first' : 'studied',
      stage: engineStages[preferences.stage],
      lastMode: apiModes[preferences.mode],
      onboardingCompleted: true,
    })
    catalog.profiles.clear()
  }
}
