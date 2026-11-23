import onboardingStyles from '@/features/onboarding/Onboarding.module.css'
import { AppBar } from '@/components/ui/AppBar'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Panel } from '@/components/ui/Panel'
import { SejongMessage } from '@/components/SejongMessage'
import { PracticePaper } from '@/components/writing/PracticePaper'
import { WritingTools } from '@/components/writing/WritingTools'
import { useWriting } from '@/components/writing/useWriting'
import { useSession, type Stage } from '@/app/useSession'
import { navigate } from '@/app/router'
import { gradeWriting, makeGradeRequest } from '@/api/grading'
import { targetCells, targetGroups } from '@/data/content'
import taskData from './leveltest-tasks.json'
import styles from '@/styles/screens.module.css'
import layout from '@/styles/sharedLayout.module.css'
import { studyApi } from '@/api/integration'
import { ApiError } from '@/api/backend'
import { useLevelTestSteps } from '@/hooks/useStudy'
const demoTasks = (taskData as { stage: Stage; target: string; title: string }[]).map(
  (task, index) => ({
    ...task,
    cellCount: index === 2 ? 9 : targetCells(task.target, task.stage).length,
    wordGroups: targetGroups(task.target, task.stage),
  }),
)
const stages = { beginner: 'beginner', intermediate: 'mid', advanced: 'pro' } as const
export function LevelTestScreen({ step }: { step: number }) {
  const {
    preferences,
    saveTest,
    notify,
    testDrafts,
    accessToken,
    setAccessToken,
    setTestAssessment,
  } = useSession()
  const writing = useWriting()
  const server = useLevelTestSteps()
  const tasks = studyApi
    ? server.data?.map((item) => ({ ...item, stage: stages[item.stage] }))
    : demoTasks
  const task = tasks?.[step]
  function handleBack() {
    notify('')
    navigate(step === 0 ? 'stage-select' : step === 1 ? 'leveltest-1' : 'leveltest-2')
  }
  async function submit() {
    if (!task) return
    await writing.submit(async () => {
      try {
        const cells = writing.snapshot()
        if (!cells.some((cell) => cell.strokes.length)) throw new Error('한 글자 이상 써 주세요.')
        const request = makeGradeRequest(
          task.stage,
          task.target,
          cells,
          preferences.language === 'English' ? 'en' : 'ko',
        )
        if (studyApi) {
          if (!accessToken) throw new ApiError(401, 'UNAUTHORIZED', '로그인이 필요해요.')
          const assessment = await studyApi.submitLevelStep(accessToken, step + 1, request)
          setTestAssessment(assessment)
          notify('')
          navigate(
            assessment.finished ? 'leveltest-result' : step === 0 ? 'leveltest-2' : 'leveltest-3',
          )
          return
        }
        const grade = await gradeWriting(request)
        saveTest(step, {
          source: `leveltest-${step + 1}`,
          stage: task.stage,
          target: task.target,
          cells,
          grade,
        })
        notify('')
        navigate(step === 0 ? 'leveltest-2' : step === 1 ? 'leveltest-3' : 'leveltest-result')
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) {
          setAccessToken(null)
          navigate('login')
        }
        notify(error instanceof Error ? error.message : '채점 요청 실패')
      }
    })
  }
  if (!tasks || !task)
    return (
      <div className={styles.screen}>
        <AppBar title="레벨 테스트" onBack={handleBack} />
        <div className={styles.pageContent}>
          <p role="status">{server.error ?? '문항을 불러오고 있어요.'}</p>
          {server.error && <Button onClick={server.retry}>다시 불러오기</Button>}
        </div>
      </div>
    )
  return (
    <div className={styles.screen} data-name={`leveltest-${step + 1}`}>
      <AppBar title="레벨 테스트" onBack={handleBack} />
      <div className={styles.pageContent} data-name="page">
        <div className={styles.sectionHeader}>
          <div
            className={onboardingStyles.testProgress}
            role="progressbar"
            aria-label="테스트 진행률"
            aria-valuemin={0}
            aria-valuemax={3}
            aria-valuenow={step + 1}
          >
            {tasks.map((task, index) => (
              <div
                key={task.stage}
                className={onboardingStyles.testProgressSegment}
                style={{ background: index <= step ? 'var(--color-text-1)' : undefined }}
              />
            ))}
          </div>
          <p className={styles.controlLabel}>3단계 중 {step + 1}단계</p>
          <p className={styles.singleLineHeading}>{task.title}</p>
        </div>
        <SejongMessage
          className={styles.guideMessage}
          title={`‘${task.target}’를 써 볼까요?`}
          description={
            step === 2
              ? '띄어 쓸 자리는 한 칸 비워요.'
              : '따라 쓸 글자 없이, 한 칸에 한 글자씩 써요.'
          }
          src="/assets/figma/fc462.png"
          vertical={false}
          characterWidth={120}
          characterHeight={191.8}
        />
        <PracticePaper
          count={task.cellCount}
          columns={Math.min(10, task.cellCount)}
          cellSize={step === 2 ? 72 : 144}
          groups={task.wordGroups ?? undefined}
        />
        <WritingTools />
        <Panel className={styles.panel}>
          <div className={layout.steps}>
            {tasks.map((task, index) => (
              <div key={task.stage} className={styles.stepRow}>
                <div className={styles.stepNumber}>
                  <p className={styles.stepNumberText}>{index + 1}</p>
                </div>
                <p className={styles.stepText}>
                  {task.title}
                  {index === step ? ' · 지금' : ''}
                </p>
                {testDrafts[index] && index !== step && <Badge tone="success">완료</Badge>}
              </div>
            ))}
          </div>
        </Panel>
      </div>
      <div className={styles.footer} data-name="cta">
        <Button
          className={styles.primaryButton}
          disabled={writing.submitting}
          aria-busy={writing.submitting}
          onClick={() => {
            void submit()
          }}
        >
          {writing.submitting ? '처리 중' : '다 썼어요'}
        </Button>
      </div>
    </div>
  )
}
