import { useUiText } from '@/app/useUiText'
import onboardingStyles from '@/features/onboarding/Onboarding.module.css'
import { useSession } from '@/app/useSession'
import { navigate } from '@/app/router'
import { ChoiceCard } from '@/components/ui/ChoiceCard'
import { SejongMessage } from '@/components/SejongMessage'

import { AppBar } from '@/components/ui/AppBar'
import styles from '@/styles/screens.module.css'
import { Button } from '@/components/ui/Button'
import { skipCodeLogin } from '@/api/api'

export default function Experience() {
  const t = useUiText()
  const { preferences, update, notify } = useSession()
  function handleBack() {
    notify('')
    navigate(skipCodeLogin ? 'lang' : 'login')
  }
  function handleContinue() {
    notify('')
    if (preferences.experience === '처음 배워요') {
      update({ stage: 'beginner' })
      navigate('mode-select')
    } else navigate('stage-select')
  }
  return (
    <div className={styles.centeredScreen} data-node-id="67:850" data-name="experience — 한글 경험">
      <AppBar title="" onBack={handleBack} />
      <div className={styles.centeredPage} data-node-id="67:855" data-name="page">
        <SejongMessage
          className={styles.verticalGuide}
          title={t('한글을 써 본 적 있나요?')}
          description={t('동국에게 맞는 곳에서 시작할게요.')}
          src={'/assets/figma/fc462.png'}
          vertical={true}
          characterWidth={200}
          characterHeight={319.6}
        />
        <div className={onboardingStyles.stackedChoices} data-node-id="67:863" data-name="choices">
          <ChoiceCard
            className={onboardingStyles.plainChoice}
            data-node-id="67:864"
            data-name="선택 카드/기본"
            kind="선택 카드/기본"
            label={t('처음 배워요 자음·모음부터 따라 써요')}
            selected={preferences.experience === '처음 배워요'}
            onClick={() => update({ experience: '처음 배워요' })}
          >
            <p className={onboardingStyles.choiceTitle} data-node-id="I67:864;19:257">
              {t('처음 배워요')}
            </p>
            <p className={styles.rowDescription} data-node-id="I67:864;19:258">
              {t('자음·모음부터 따라 써요')}
            </p>
          </ChoiceCard>
          <ChoiceCard
            className={onboardingStyles.emphasizedChoice}
            data-node-id="67:867"
            data-name="선택 카드/선택"
            kind="선택 카드/선택"
            label={t('공부해 봤어요 내 단계를 골라요')}
            selected={preferences.experience === '공부해 봤어요'}
            onClick={() => update({ experience: '공부해 봤어요' })}
          >
            <p className={onboardingStyles.choiceTitle} data-node-id="I67:867;19:253">
              {t('공부해 봤어요')}
            </p>
            <p className={styles.rowDescription} data-node-id="I67:867;19:254">
              {t('내 단계를 골라요')}
            </p>
          </ChoiceCard>
        </div>
      </div>
      <div className={styles.footer} data-node-id="67:870" data-name="cta">
        <Button
          className={styles.primaryButton}
          data-node-id="67:871"
          data-name="버튼/주"
          variant="primary"
          data-action="버튼/주"
          aria-label={t('다음')}
          onClick={handleContinue}
        >
          <p className={styles.primaryButtonText} data-node-id="I67:871;19:41">
            {t('다음')}
          </p>
        </Button>
      </div>
    </div>
  )
}
