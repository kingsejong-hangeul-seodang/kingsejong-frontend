import { SessionExpiredError, backend, studyApi } from '@/api/api'
import { useUiText } from '@/app/useUiText'
import { useRef, useState } from 'react'
import { useCompleteOnboarding } from './useCompleteOnboarding'
import onboardingStyles from '@/features/onboarding/Onboarding.module.css'
import { useSession } from '@/app/useSession'
import { navigate } from '@/app/router'
import { homeScreen } from '@/app/learningFlow'
import { Thumbnail } from '@/components/ui/Thumbnail'
import { ChoiceCard } from '@/components/ui/ChoiceCard'
import { SejongMessage } from '@/components/SejongMessage'

import { AppBar } from '@/components/ui/AppBar'
import styles from '@/styles/screens.module.css'
import { Button } from '@/components/ui/Button'

const img1 = '/assets/figma/3d07b.png'
const img2 = '/assets/figma/547a2.png'

const imgIcon1 = '/assets/figma/4d822.svg'
const imgIcon2 = '/assets/figma/68c51.svg'
const img3 = '/assets/figma/8b680.svg'

export default function ModeSelect() {
  const t = useUiText()
  const { preferences, update, notify } = useSession()
  const completeOnboarding = useCompleteOnboarding()
  const [saving, setSaving] = useState(false)
  const pending = useRef(false)
  function handleBack() {
    if (pending.current) return
    notify('')
    navigate(preferences.experience === '처음 배워요' ? 'experience' : 'stage-select')
  }
  async function handleContinue() {
    if (pending.current) return
    notify('')
    if (preferences.mode !== 'basic' && (!backend || studyApi)) {
      navigate('taste')
      return
    }
    pending.current = true
    setSaving(true)
    try {
      await completeOnboarding()
      navigate(homeScreen(preferences.mode))
    } catch (error) {
      if (error instanceof SessionExpiredError) return
      notify(error instanceof Error ? error.message : t('학습 설정을 저장하지 못했어요.'))
    } finally {
      pending.current = false
      setSaving(false)
    }
  }
  return (
    <div className={styles.screen} data-node-id="67:1184" data-name="mode-select — 모드 고르기">
      <AppBar title="" onBack={handleBack} />
      <div className={onboardingStyles.mediaChoicePage} data-node-id="67:1189" data-name="page">
        <SejongMessage
          className={onboardingStyles.mediaChoiceGuide}
          title={t('무엇으로 쓸까요?')}
          description={t('홈에서 언제든 바꿀 수 있어요.')}
          src={'/assets/figma/fc462.png'}
          vertical={true}
          characterWidth={200}
          characterHeight={319.6}
        />
        <div className={onboardingStyles.mediaChoices} data-node-id="67:1197" data-name="choices">
          <ChoiceCard
            className={onboardingStyles.emphasizedModeChoice}
            data-node-id="67:1198"
            data-name="choice"
            kind="choice"
            label={t('K팝으로 좋아하는 노래 가사')}
            selected={preferences.mode === 'pop'}
            disabled={saving}
            onClick={() => update({ mode: 'pop' })}
          >
            <Thumbnail
              className={onboardingStyles.popPoster}
              data-node-id="67:1199"
              data-name="poster"
            >
              <div
                className={onboardingStyles.popCharacter}
                data-node-id="67:1200"
                data-name="킹세종 얼굴"
              >
                <img alt="" className={styles.containImage} src={img1} />
              </div>
              <div
                className={onboardingStyles.modeSelectionIcon}
                data-node-id="67:1201"
                data-name="icon"
              >
                <img alt="" className={styles.fillImage} src={imgIcon1} />
              </div>
            </Thumbnail>
            <p className={styles.sectionTitle} data-node-id="67:1205">
              {t('K팝으로')}
            </p>
            <p className={styles.secondaryText} data-node-id="67:1206">
              {t('좋아하는 노래 가사')}
            </p>
          </ChoiceCard>
          <ChoiceCard
            className={onboardingStyles.plainModeChoice}
            data-node-id="67:1207"
            data-name="choice"
            kind="choice"
            label={t('K드라마로 드라마 명대사')}
            selected={preferences.mode === 'drama'}
            disabled={saving}
            onClick={() => update({ mode: 'drama' })}
          >
            <Thumbnail
              className={onboardingStyles.dramaPoster}
              data-node-id="67:1208"
              data-name="poster"
            >
              <div
                className={onboardingStyles.dramaCharacter}
                data-node-id="67:1209"
                data-name="킹세종 얼굴"
              >
                <img alt="" className={styles.containImage} src={img2} />
              </div>
              <div
                className={onboardingStyles.modeSelectionIcon}
                data-node-id="67:1210"
                data-name="icon"
              >
                <img alt="" className={styles.fillImage} src={imgIcon2} />
              </div>
            </Thumbnail>
            <p className={styles.sectionTitle} data-node-id="67:1213">
              {t('K드라마로')}
            </p>
            <p className={styles.secondaryText} data-node-id="67:1214">
              {t('드라마 명대사')}
            </p>
          </ChoiceCard>
          <ChoiceCard
            className={onboardingStyles.plainModeChoice}
            data-node-id="67:1215"
            data-name="choice"
            kind="choice"
            label={t('가 기본 연습 자음·모음·단어·문장')}
            selected={preferences.mode === 'basic'}
            disabled={saving}
            onClick={() => update({ mode: 'basic' })}
          >
            <Thumbnail
              className={onboardingStyles.basicPoster}
              data-node-id="67:1216"
              data-name="poster"
            >
              <div
                className={onboardingStyles.basicGlyph}
                data-node-id="67:1217"
                data-name="동국체: 가"
              >
                <div className={onboardingStyles.basicGlyphInset}>
                  <img alt="" className={styles.fullSizeImage} src={img3} />
                </div>
              </div>
            </Thumbnail>
            <p className={styles.sectionTitle} data-node-id="67:1219">
              {t('기본 연습')}
            </p>
            <p className={styles.secondaryText} data-node-id="67:1220">
              {t('자음·모음·단어·문장')}
            </p>
          </ChoiceCard>
        </div>
      </div>
      <div className={styles.footer} data-node-id="67:1221" data-name="cta">
        <Button
          className={styles.primaryButton}
          data-node-id="67:1222"
          data-name="버튼/주"
          variant="primary"
          data-action="버튼/주"
          aria-label={t('다음')}
          disabled={saving}
          aria-busy={saving}
          onClick={() => void handleContinue()}
        >
          <p className={styles.primaryButtonText} data-node-id="I67:1222;19:41">
            {t('다음')}
          </p>
        </Button>
      </div>
    </div>
  )
}
