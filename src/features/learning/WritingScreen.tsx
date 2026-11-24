import { useUiText } from '@/app/useUiText'
import { useWritingSubmission } from './hooks/useWritingSubmission'
import { useEffect, useState } from 'react'
import learningStyles from '@/features/learning/LearningScreens.module.css'
import { AppBar } from '@/components/ui/AppBar'
import { StageSelector } from '@/components/ui/StageSelector'
import { Button } from '@/components/ui/Button'
import { WritingTools } from '@/components/writing/WritingTools'
import { PracticePaper } from '@/components/writing/PracticePaper'
import { useSession, type Stage } from '@/app/useSession'
import { listeningTitle, targetCells } from '@/data/content'
import { useLearningTask, type LearningTask } from './hooks/useLearningTask'
import { LearningTaskStatus } from './components/LearningTaskStatus'
import { ContentClip } from '@/components/content/ContentClip'
import { FigmaGuideGlyph } from '@/features/learning/reference/FigmaGuideGlyph'
import { navigate } from '@/app/router'
import { homeScreen } from '@/app/learningFlow'
import { ListeningControls } from '@/components/content/ListeningControls'
import { usePracticeSpeech } from '@/components/content/usePracticeSpeech'
import { useGuideFont } from './reference/guideFont'
import { useSavePreferences } from '@/hooks/useSavePreferences'
import { backend, demoMode } from '@/api/integration'
import type { EngineHealth } from '@/api/backend'
import styles from '@/styles/screens.module.css'

export function WritingScreen({ stage }: { stage: Stage }) {
  const { task, error, retry } = useLearningTask(stage)
  const { preferences, practiceTarget } = useSession()
  if (!task)
    return (
      <LearningTaskStatus
        error={error}
        onRetry={retry}
        onBack={() => navigate(practiceTarget ? 'dogam' : homeScreen(preferences.mode))}
      />
    )
  return <WritingTask stage={stage} task={task} />
}

function EngineNotice() {
  const t = useUiText()
  const [health, setHealth] = useState<EngineHealth | 'unreachable'>()
  useEffect(() => {
    if (!backend) return
    let active = true
    void backend.getEngineHealth().then(
      (result) => {
        if (active) setHealth(result)
      },
      () => {
        if (active) setHealth('unreachable')
      },
    )
    return () => {
      active = false
    }
  }, [])
  const message =
    health === 'unreachable'
      ? t('교정 엔진 상태를 확인하지 못했어요.')
      : health?.status === 'down'
        ? t('교정 엔진에 연결할 수 없어요. 연결이 돌아오면 제출할 수 있어요.')
        : health?.engineVersion?.endsWith('-stub')
          ? t('교정 엔진의 일부 판정은 테스트 단계예요.')
          : null
  return (
    message && (
      <p className={styles.secondaryText} role="status">
        {message}
      </p>
    )
  )
}

function WritingTask({ stage, task }: { stage: Stage; task: LearningTask }) {
  const t = useUiText()
  const { practiceTarget, notify } = useSession()
  const savePreferences = useSavePreferences()
  const { content, target, cellCount, groups, writeMode } = task
  const { handleSubmit, submitting } = useWritingSubmission(stage, task)
  const cells = targetCells(target, stage)
  const isBeginner = writeMode === 'trace'
  const dictation = writeMode === 'dictation'
  const clipKind = content.mode === 'basic' ? null : content.mode
  const speech = usePracticeSpeech(task.speech?.text ?? target, task.speech?.lang)
  const guideFont = useGuideFont()
  const cellSize = isBeginner ? 144 : stage === 'mid' ? 96 : 72
  const instruction = dictation
    ? t('띄어 쓸 자리는 한 칸 비워요')
    : isBeginner
      ? t('회색 글자 위에 따라 써요')
      : t('원고지 한 칸에 한 글자씩 써요. 묶음 사이는 띄어 쓰는 자리예요.')
  const title = practiceTarget
    ? t('자모 연습')
    : dictation
      ? t('듣고 받아쓰기')
      : isBeginner
        ? t('따라 쓰기')
        : clipKind
          ? t('보고 쓰기')
          : content.title
  const nodeId = clipKind
    ? { beginner: '132:894', mid: '67:2144', pro: '67:2406' }[stage]
    : { beginner: '67:1928', mid: '132:1018', pro: '132:1125' }[stage]

  async function handleStageChange(nextStage: Stage) {
    if (submitting || nextStage === stage || !(await savePreferences({ stage: nextStage }))) return
    notify('')
    navigate(`write-${nextStage}`)
  }
  function handleBack() {
    notify('')
    navigate(practiceTarget ? 'dogam' : homeScreen(content.mode))
  }

  return (
    <div className={styles.screen} data-name={`write-${stage}`} data-node-id={nodeId}>
      <AppBar onBack={handleBack} title={title} />
      <div className={styles.pageContent} data-name="page">
        {clipKind && (
          <ContentClip
            key={`${content.id}:${stage}`}
            content={content}
            kind={clipKind}
            target={target}
            dictation={dictation}
            captionFont={guideFont.family}
            illustrated={demoMode}
          />
        )}
        {!clipKind && dictation && (
          <section className={learningStyles.audioPanel} aria-label={t('받아쓰기 음성')}>
            <Button
              className={learningStyles.audioIcon}
              aria-label={t('문장 듣기')}
              disabled={!speech.available}
              onClick={() => speech.play()}
            >
              <img src="/assets/figma/c1012.svg" alt="" width="24" height="24" />
            </Button>
            <div className={learningStyles.audioText}>
              <h2 className={styles.sectionTitle}>
                {listeningTitle(
                  'dictationTitle' in content
                    ? (content.dictationTitle ?? content.title)
                    : content.title,
                  target,
                )}
              </h2>
              <p className={styles.secondaryText}>
                {speech.available
                  ? t('버튼을 누르면 문장을 읽어 드려요')
                  : t('이 브라우저는 문장 읽기를 지원하지 않아요')}
              </p>
            </div>
            <ListeningControls play={speech.play} disabled={!speech.available} />
          </section>
        )}
        {!practiceTarget && (
          <div className={learningStyles.stageRow}>
            <p className={styles.controlLabel}>{t('난이도')}</p>
            <StageSelector value={stage} onChange={handleStageChange} />
          </div>
        )}
        <div className={learningStyles.task}>
          <h2 className={styles.heading}>{dictation ? t('들은 문장을 써 보세요') : target}</h2>
          {!dictation && (
            <div className={learningStyles.taskChips}>
              {isBeginner && content.meaning && (
                <span className={learningStyles.meaning}>
                  <span className={styles.secondaryText}>{t('뜻')}</span> {content.meaning}
                </span>
              )}
              {!clipKind && speech.available && (
                <Button
                  className={learningStyles.soundChip}
                  variant="small"
                  onClick={() => speech.play()}
                >
                  <span className={learningStyles.soundIcon} aria-hidden="true" />
                  {t('소리 듣기')}
                </Button>
              )}
            </div>
          )}
          <p className={styles.bodyText}>{instruction}</p>
        </div>
        <PracticePaper
          count={cellCount}
          columns={Math.min(10, cellCount)}
          cellSize={cellSize}
          groups={groups}
          renderGuide={
            isBeginner
              ? (index) => cells[index] && <FigmaGuideGlyph char={cells[index]} />
              : undefined
          }
        />
        <WritingTools />
        {task.apiId !== null && backend && <EngineNotice />}
      </div>
      <div className={styles.footer} data-name="cta">
        <Button
          className={styles.primaryButton}
          data-action="버튼/주"
          aria-label={t('다 썼어요')}
          aria-busy={submitting}
          disabled={submitting}
          onClick={handleSubmit}
        >
          {submitting ? t('확인 중…') : t('다 썼어요')}
        </Button>
      </div>
    </div>
  )
}
