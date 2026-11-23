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
import { backend } from '@/api/integration'
import { ApiError } from '@/api/backend'
import { engineStages } from '@/api/grading'
const tasks = taskData as { stage: Stage; target: string; title: string }[]

export function LevelTestResultScreen() {
  const {
    testDrafts,
    testAssessment,
    update,
    preferences,
    notify,
    catalog,
    accessToken,
    setAccessToken,
  } = useSession()
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
        label: passed ? '통과' : '연습 필요',
        tone: passed ? ('success' as const) : ('warning' as const),
      }))
    : tasks.map((task, index) => ({
        step: index + 1,
        title: task.title,
        label: !testDrafts[index]
          ? '미제출'
          : !graded
            ? '미채점'
            : grades[index]?.correct
              ? '통과'
              : '연습 필요',
        tone: !graded
          ? ('neutral' as const)
          : grades[index]?.correct
            ? ('success' as const)
            : ('warning' as const),
      }))
  const labels = { beginner: '초보', mid: '중수', pro: '고수' }
  async function start() {
    if (pending.current) return
    pending.current = true
    setSaving(true)
    try {
      if (backend && graded) {
        if (!accessToken) throw new ApiError(401, 'UNAUTHORIZED', '로그인이 필요해요.')
        await backend.updateMe(accessToken, { stage: engineStages[recommended] })
        catalog.profiles.clear()
      }
      if (graded) update({ stage: recommended })
      navigate('mode-select')
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        setAccessToken(null)
        navigate('login')
      }
      notify(error instanceof Error ? error.message : '난이도를 저장하지 못했어요.')
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
      <AppBar title="레벨 테스트 결과" onBack={handleBack} />
      <div className={styles.centeredPage}>
        <SejongMessage
          className={styles.verticalGuide}
          title={graded ? `‘${labels[recommended]}’를 추천해요` : '썼던 글을 모두 확인했어요'}
          description={
            graded
              ? '내게 맞는 난이도에서 차근차근 연습해 봐요.'
              : '아직 미채점이에요. 난이도를 직접 골라 시작할 수 있어요.'
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
          <p className={styles.secondaryText}>난이도는 홈에서 언제든 바꿀 수 있어요.</p>
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
            직접 고르기
          </Button>
          <Button className={styles.primaryAction} disabled={saving} onClick={() => void start()}>
            {labels[graded ? recommended : preferences.stage]}로 시작
          </Button>
        </div>
      </div>
    </div>
  )
}
import { useRef, useState } from 'react'
