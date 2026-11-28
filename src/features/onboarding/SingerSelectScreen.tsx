import { SessionExpiredError, ApiError, studyApi } from '@/api/api'
import { useUiText } from '@/app/useUiText'
import { useRef, useState } from 'react'
import { navigate } from '@/app/router'
import { homeScreen } from '@/app/learningFlow'
import { AppBar } from '@/components/ui/AppBar'
import { Button } from '@/components/ui/Button'
import { ChoiceCard } from '@/components/ui/ChoiceCard'
import { ContentPoster } from '@/components/content/ContentPoster'
import { useSession } from '@/app/useSession'
import { useTastes } from '@/hooks/useStudy'
import { useCompleteOnboarding } from './useCompleteOnboarding'
import onboarding from './Onboarding.module.css'
import styles from '@/styles/screens.module.css'

export default function Taste() {
  const t = useUiText()
  const { preferences, update, notify, settingsOrigin, setSettingsOrigin, accessToken, catalog } =
    useSession()
  const completeOnboarding = useCompleteOnboarding()
  const mode = !settingsOrigin && preferences.mode === 'drama' ? 'kdrama' : 'kpop'
  const { data, error, retry } = useTastes(mode)
  const [choice, setChoice] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)
  const pending = useRef(false)
  const selected = choice ?? data?.find((item) => item.selected)?.id

  function close(back: boolean) {
    notify('')
    if (settingsOrigin) {
      setSettingsOrigin(false)
      navigate('settings')
    } else {
      navigate(back ? 'mode-select' : homeScreen(preferences.mode))
    }
  }

  async function save() {
    if (!data || pending.current) return
    pending.current = true
    setSaving(true)
    try {
      if (studyApi) {
        if (!accessToken) throw new ApiError(401, 'UNAUTHORIZED', t('로그인이 필요해요.'))
        await studyApi.saveTastes(accessToken, mode, selected == null ? [] : [selected])
        catalog.tastes.clear()
        catalog.lists.clear()
      } else {
        const name = data.find((item) => item.id === selected)?.name
        if (name) update(mode === 'kpop' ? { singer: name } : { drama: name })
      }
      if (!settingsOrigin) await completeOnboarding()
      close(false)
    } catch (error) {
      if (error instanceof SessionExpiredError) return
      notify(error instanceof Error ? error.message : t('취향을 저장하지 못했어요.'))
    } finally {
      pending.current = false
      setSaving(false)
    }
  }

  return (
    <div className={styles.screen} data-name="taste">
      <AppBar
        title={t('취향 고르기')}
        onBack={() => {
          if (!saving) close(true)
        }}
      />
      <div className={onboarding.mediaChoicePage}>
        <h1 className={styles.heading}>
          {t(mode === 'kpop' ? '좋아하는 가수를 골라 주세요' : '좋아하는 작품을 골라 주세요')}
        </h1>
        {!data && <p role="status">{error ?? t('취향 목록을 불러오고 있어요.')}</p>}
        {error && <Button onClick={retry}>{t('다시 불러오기')}</Button>}
        {data?.length === 0 && <p>{t('고를 수 있는 취향이 아직 없어요.')}</p>}
        <div className={onboarding.mediaChoices}>
          {data?.map((item) => (
            <ChoiceCard
              key={item.id}
              className={onboarding.tasteChoice}
              kind="taste"
              label={item.name}
              selected={selected === item.id}
              disabled={saving}
              onClick={() => setChoice(item.id)}
            >
              <ContentPoster
                kind={mode === 'kpop' ? 'pop' : 'drama'}
                thumbnailUrl={item.imageUrl}
                compact
              />
              <span>{item.name}</span>
            </ChoiceCard>
          ))}
        </div>
      </div>
      <div className={styles.footer}>
        <Button
          className={styles.primaryButton}
          disabled={!data || saving}
          aria-busy={saving}
          onClick={() => void save()}
        >
          {saving ? t('저장 중…') : settingsOrigin ? t('선택 완료') : t('서당 들어가기')}
        </Button>
      </div>
    </div>
  )
}
