import onboardingStyles from '@/features/onboarding/Onboarding.module.css'
import { useSession } from '@/app/useSession'
import { navigate } from '@/app/router'
import { SejongMessage } from '@/components/SejongMessage'
import { ChoiceCard } from '@/components/ui/ChoiceCard'

import { AppBar } from '@/components/ui/AppBar'
import styles from '@/styles/screens.module.css'
import { Button } from '@/components/ui/Button'

export default function StageSelect() {
  const { preferences, update, notify } = useSession()
  function handleBack() {
    notify('')
    navigate('experience')
  }
  function handleContinue() {
    notify('')
    navigate('mode-select')
  }
  function handleLevelTest() {
    notify('')
    navigate('leveltest-1')
  }
  return (
    <div
      className={styles.centeredScreen}
      data-node-id="67:873"
      data-name="stage-select — 난이도 고르기"
    >
      <AppBar title="" onBack={handleBack} />
      <div className={styles.centeredPage} data-node-id="67:878" data-name="page">
        <SejongMessage
          className={styles.verticalGuide}
          title={'어느 단계부터 쓸까요?'}
          description={'언제든 바꿀 수 있어요.'}
          src={'/assets/figma/fc462.png'}
          vertical={true}
          characterWidth={200}
          characterHeight={319.6}
        />
        <div className={onboardingStyles.stageChoices} data-node-id="67:886" data-name="choices">
          <ChoiceCard
            className={onboardingStyles.plainStageChoice}
            data-node-id="19:392"
            data-name="선택 카드/기본"
            kind="선택 카드/기본"
            label="초보 회색 글자를 따라 써요 · 단어 하나"
            selected={preferences.stage === 'beginner'}
            onClick={() => update({ stage: 'beginner' })}
          >
            <p className={onboardingStyles.choiceTitle} data-node-id="19:257">
              초보
            </p>
            <p className={styles.rowDescription} data-node-id="19:258">
              회색 글자를 따라 써요 · 단어 하나
            </p>
          </ChoiceCard>
          <ChoiceCard
            className={onboardingStyles.emphasizedStageChoice}
            data-node-id="19:391"
            data-name="선택 카드/선택"
            kind="선택 카드/선택"
            label="중수 가이드 없이 써요 · 두세 어절"
            selected={preferences.stage === 'mid'}
            onClick={() => update({ stage: 'mid' })}
          >
            <p className={onboardingStyles.choiceTitle} data-node-id="19:253">
              중수
            </p>
            <p className={styles.rowDescription} data-node-id="19:254">
              가이드 없이 써요 · 두세 어절
            </p>
          </ChoiceCard>
          <ChoiceCard
            className={onboardingStyles.plainStageChoice}
            data-node-id="67:893"
            data-name="선택 카드/기본"
            kind="선택 카드/기본"
            label="고수 칸만 보고 문장을 써요 · 띄어쓰기까지"
            selected={preferences.stage === 'pro'}
            onClick={() => update({ stage: 'pro' })}
          >
            <p className={onboardingStyles.choiceTitle} data-node-id="I67:893;19:257">
              고수
            </p>
            <p className={styles.rowDescription} data-node-id="I67:893;19:258">
              칸만 보고 문장을 써요 · 띄어쓰기까지
            </p>
          </ChoiceCard>
        </div>
        <div className={onboardingStyles.testLinkRow} data-node-id="67:896" data-name="center">
          <Button
            className={onboardingStyles.testLink}
            data-node-id="19:363"
            data-name="글자 링크"
            variant="text"
            data-action="글자 링크"
            aria-label="레벨 테스트 해 보기"
            onClick={handleLevelTest}
          >
            <p className={onboardingStyles.testLinkText} data-node-id="19:54">
              레벨 테스트 해 보기
            </p>
          </Button>
        </div>
      </div>
      <div className={styles.footer} data-node-id="67:899" data-name="cta">
        <Button
          className={styles.primaryButton}
          data-node-id="67:900"
          data-name="버튼/주"
          variant="primary"
          data-action="버튼/주"
          aria-label="이 단계로 시작"
          onClick={handleContinue}
        >
          <p className={styles.primaryButtonText} data-node-id="I67:900;19:41">
            이 단계로 시작
          </p>
        </Button>
      </div>
    </div>
  )
}
