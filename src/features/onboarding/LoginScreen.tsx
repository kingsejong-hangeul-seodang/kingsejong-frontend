import { useRef, useState } from 'react'
import onboardingStyles from '@/features/onboarding/Onboarding.module.css'
import { useSession } from '@/app/useSession'
import { navigate } from '@/app/router'
import { Panel } from '@/components/ui/Panel'
import { SejongMessage } from '@/components/SejongMessage'

import { AppBar } from '@/components/ui/AppBar'
import styles from '@/styles/screens.module.css'
import { Button } from '@/components/ui/Button'
import { CodeField } from '@/features/onboarding/components/CodeField'
import { backend, demoMode } from '@/api/integration'
import { demoLogin } from '@/api/demo'
import { homeScreen } from '@/app/learningFlow'

const imgIcon1 = '/assets/figma/fb114.svg'

export default function Login() {
  const { preferences, update, notify, setAccessToken } = useSession()
  const [pending, setPending] = useState(false)
  const submitting = useRef(false)
  function handleBack() {
    notify('')
    navigate('lang')
  }
  async function handleContinue() {
    if (submitting.current) return
    if (!/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/.test(preferences.code.trim())) {
      notify('선생님께 받은 로그인 코드를 입력해 주세요.')
      return
    }
    const code = preferences.code.trim()
    if (!backend && !demoMode) {
      notify('')
      navigate('experience')
      return
    }
    submitting.current = true
    setPending(true)
    notify('')
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
      setAccessToken(accessToken)
      navigate(saved.onboardingCompleted ? homeScreen(mode ?? preferences.mode) : 'experience')
    } catch (error) {
      notify(error instanceof Error ? error.message : '로그인하지 못했어요. 다시 시도해 주세요.')
    } finally {
      submitting.current = false
      setPending(false)
    }
  }
  function handleConsentChange() {
    update({ consent: !preferences.consent })
  }
  return (
    <div className={styles.centeredScreen} data-node-id="67:820" data-name="login — 로그인 코드">
      <AppBar title="" onBack={handleBack} />
      <div className={styles.centeredPage} data-node-id="67:825" data-name="page">
        <SejongMessage
          className={styles.verticalGuide}
          title={'코드를 알려 주세요'}
          description={'선생님께 받은 코드를 넣어 주세요.'}
          src={'/assets/figma/fc462.png'}
          vertical={true}
          characterWidth={200}
          characterHeight={319.6}
        />
        <Panel className={styles.narrowPanel} data-node-id="67:833" data-name="block">
          <div className={onboardingStyles.codeField} data-node-id="67:834" data-name="field">
            <p className={styles.controlLabel} data-node-id="67:835">
              로그인 코드
            </p>
            <CodeField
              className={onboardingStyles.codeInput}
              data-node-id="67:836"
              data-name="input"
            />
          </div>
          <div className={styles.listRow} data-node-id="67:838" data-name="row">
            <div className={styles.rowContent} data-node-id="67:839" data-name="row-main">
              <p className={styles.rowTitle} data-node-id="67:840">
                쓴 글씨를 저장해도 좋아요
              </p>
              <p className={styles.rowDescription} data-node-id="67:841">
                글씨 교정과 학습 기록에만 써요
              </p>
            </div>
            <div className={styles.rowTrailing} data-node-id="67:842" data-name="row-trail">
              <button
                className={onboardingStyles.consentButton}
                data-node-id="67:843"
                data-name="check"
                type="button"
                data-action="check"
                aria-label="쓴 글씨 저장 동의"
                data-selected={preferences.consent}
                aria-pressed={preferences.consent}
                onClick={handleConsentChange}
              >
                <div
                  className={onboardingStyles.consentMark}
                  data-node-id="67:844"
                  data-name="span"
                >
                  <div
                    className={onboardingStyles.consentIcon}
                    data-node-id="67:845"
                    data-name="icon"
                  >
                    <img alt="" className={styles.fillImage} src={imgIcon1} />
                  </div>
                </div>
              </button>
            </div>
          </div>
        </Panel>
      </div>
      <div className={styles.footer} data-node-id="67:847" data-name="cta">
        <Button
          className={styles.primaryButton}
          data-node-id="67:848"
          data-name="버튼/주"
          variant="primary"
          data-action="버튼/주"
          aria-label="들어가기"
          disabled={pending}
          aria-busy={pending}
          onClick={handleContinue}
        >
          <p className={styles.primaryButtonText} data-node-id="I67:848;19:41">
            {pending ? '확인 중…' : '들어가기'}
          </p>
        </Button>
      </div>
    </div>
  )
}
