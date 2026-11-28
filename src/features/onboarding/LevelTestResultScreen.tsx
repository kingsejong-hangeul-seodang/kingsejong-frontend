import { SessionExpiredError, backend, ApiError, engineStages } from '@/api/api'
import { useUiText } from '@/app/useUiText'
import { AppBar } from '@/components/ui/AppBar'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Panel } from '@/components/ui/Panel'
import { SejongMessage } from '@/components/SejongMessage'
import { useSession, type Stage } from '@/app/useSession'
import { navigate } from '@/app/router'
import taskData from './leveltest-tasks.json'
import styles from '@/styles/screens.module.css'
import layout from '@/styles/sharedLayout.module.css'
const tasks = taskData as { stage: Stage; target: string; title: string }[]

export function LevelTestResultScreen() {
  const t = useUiText()
  const { testDrafts, testAssessment, update, preferences, notify, catalog, accessToken } =
    useSession()
  const pending = useRef(false)
  const [saving, setSaving] = useState(false)
  function handleBack() {
    notify('')
    navigate('stage-select')
  }
  const grades = tasks.map((_, index) => testDrafts[index]?.grade)
  const recommendation = testAssessment?.finished ? testAssessment.recommendedStage : null
  const serverStage =
    recommendation === 'intermediate'
      ? 'mid'
      : recommendation === 'advanced'
        ? 'pro'
        : recommendation
  const graded = backend
    ? Boolean(serverStage)
    : grades.every((grade) => grade && !grade.engineVersion.endsWith('stub'))
  const recommended: Stage = backend
    ? (serverStage ?? preferences.stage)
    : !grades[0]?.correct || !grades[1]?.correct
      ? 'beginner'
      : !grades[2]?.correct
        ? 'mid'
        : 'pro'
  const steps = backend
    ? (testAssessment?.steps ?? []).map(({ step, title, passed }) => ({
        step,
        title,
        label: passed ? t('통과') : t('연습 필요'),
        tone: passed ? ('success' as const) : ('warning' as const),
      }))
    : tasks.map((task, index) => ({
        step: index + 1,
        title: task.title,
        label: !testDrafts[index]
          ? t('미제출')
          : !graded
            ? t('미채점')
            : grades[index]?.correct
              ? t('통과')
              : t('연습 필요'),
        tone: !graded
          ? ('neutral' as const)
          : grades[index]?.correct
            ? ('success' as const)
            : ('warning' as const),
      }))
  const labels = { beginner: t('초보'), mid: t('중수'), pro: t('고수') }
  async function start() {
    if (pending.current) return
    pending.current = true
    setSaving(true)
    try {
      if (backend && graded) {
        if (!accessToken) throw new ApiError(401, 'UNAUTHORIZED', t('로그인이 필요해요.'))
        await backend.updateMe(accessToken, { stage: engineStages[recommended] })
        catalog.profiles.clear()
      }
      if (graded) update({ stage: recommended })
      navigate('mode-select')
    } catch (error) {
      if (error instanceof SessionExpiredError) return
      notify(error instanceof Error ? error.message : t('난이도를 저장하지 못했어요.'))
    } finally {
      pending.current = false
      setSaving(false)
    }
  }
  return (
    <div
      className={styles.centeredScreen}
      data-name="leveltest-result — 레벨 테스트 결과"
      data-node-id="67:1143"
    >
      <AppBar title={t('레벨 테스트 결과')} onBack={handleBack} />
      <div className={styles.centeredPage}>
        <SejongMessage
          className={styles.verticalGuide}
          title={
            graded ? t('‘{0}’를 추천해요', labels[recommended]) : t('썼던 글을 모두 확인했어요')
          }
          description={
            graded
              ? t('내게 맞는 난이도에서 차근차근 연습해 봐요.')
              : t('아직 미채점이에요. 난이도를 직접 골라 시작할 수 있어요.')
          }
          src="/assets/figma/04d6d.png"
          vertical
          characterWidth={200}
          characterHeight={292.3}
        />
        <Panel className={styles.narrowPanel}>
          <div className={layout.steps}>
            {steps.map((task) => (
              <div className={styles.stepRow} key={task.step}>
                <div className={styles.stepNumber}>
                  <p className={styles.stepNumberText}>{task.step}</p>
                </div>
                <p className={styles.stepText}>{task.title}</p>
                <Badge tone={task.tone}>{task.label}</Badge>
              </div>
            ))}
          </div>
          <p className={styles.secondaryText}>{t('난이도는 홈에서 언제든 바꿀 수 있어요.')}</p>
        </Panel>
      </div>
      <div className={styles.footer}>
        <div className={styles.buttonRow}>
          <Button
            variant="secondary"
            className={styles.secondaryAction}
            disabled={saving}
            onClick={() => navigate('stage-select')}
          >
            {t('직접 고르기')}
          </Button>
          <Button className={styles.primaryAction} disabled={saving} onClick={() => void start()}>
            {t('{0}로 시작', t(labels[graded ? recommended : preferences.stage]))}
          </Button>
        </div>
      </div>
    </div>
  )
}
import { useRef, useState } from 'react'
