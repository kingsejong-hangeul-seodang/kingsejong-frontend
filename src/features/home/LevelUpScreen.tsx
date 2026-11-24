import { useUiText } from '@/app/useUiText'
import { useSession } from '@/app/useSession'
import { navigate } from '@/app/router'
import { useNextContent } from '@/features/learning/hooks/useNextContent'
import { levels } from '@/data/levels'
import { Panel } from '@/components/ui/Panel'
import { SejongMessage } from '@/components/SejongMessage'
import { Button } from '@/components/ui/Button'
import styles from '@/styles/screens.module.css'

export default function LevelUpScreen() {
  const t = useUiText()
  const { draft, saveDraft, preferences } = useSession()
  const { goNext, label } = useNextContent()
  const reward = draft?.reward
  const active = reward?.leveledUp ?? false
  const levelNo =
    reward?.level.no ?? levels.findLastIndex((item) => item.exp <= preferences.exp) + 1
  const character = levels[levelNo - 1]?.image ?? levels[0].image
  const previous =
    active && reward?.previousLevelNo ? levels[reward.previousLevelNo - 1]?.image : undefined

  function acknowledge() {
    if (draft?.reward?.leveledUp)
      saveDraft({ ...draft, reward: { ...draft.reward, leveledUp: false } })
  }

  return (
    <div className={styles.centeredScreen} data-name="levelup">
      <div className={styles.fullHeightCenteredPage}>
        <SejongMessage
          className={styles.verticalGuide}
          title={active ? t('레벨 업! ‘{0}’이 됐어요', reward?.level.name) : t('내 킹세종의 성장')}
          description={t('누적 {0} EXP', reward?.level.exp ?? preferences.exp)}
          src={character}
          vertical
          characterWidth={200}
          characterHeight={298.6}
        />
        {previous && (
          <Panel className={styles.narrowPanel}>
            <div className={styles.wrappingGrid}>
              <img src={previous} alt={t('이전 킹세종')} width={80} height={100} />
              <span aria-hidden="true">→</span>
              <img src={character} alt={t('성장한 킹세종')} width={80} height={100} />
            </div>
          </Panel>
        )}
      </div>
      <div className={styles.footer}>
        <div className={styles.buttonRow}>
          <Button
            className={styles.secondaryAction}
            variant="secondary"
            onClick={() => {
              acknowledge()
              navigate('mypage')
            }}
          >
            {t('내 킹세종 보기')}
          </Button>
          <Button
            className={styles.primaryAction}
            onClick={() => {
              acknowledge()
              goNext()
            }}
          >
            {label}
          </Button>
        </div>
      </div>
    </div>
  )
}
