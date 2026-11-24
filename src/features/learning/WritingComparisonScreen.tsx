import { useUiText } from '@/app/useUiText'
import { useNextContent } from './hooks/useNextContent'
import learningStyles from '@/features/learning/LearningScreens.module.css'
import { AppBar } from '@/components/ui/AppBar'
import { Button } from '@/components/ui/Button'
import { Panel } from '@/components/ui/Panel'
import { SejongMessage } from '@/components/SejongMessage'
import { AnswerPaper } from '@/features/learning/reference/AnswerPaper'
import { SubmittedWriting } from '@/components/writing/SubmittedWriting'
import { useSession, type Stage } from '@/app/useSession'
import { navigate } from '@/app/router'
import { learningContent, targetCells } from '@/data/content'
import { useAnswerStrokes } from './reference/useAnswerStrokes'
import { retryCellIndexes, shapeFeedback, visibleGrade } from '@/data/writingFeedback'
import { createStrokeReplay, strokeProgress, strokeReplayStepMs } from '@/data/strokeReplay'
import { useReplay } from '@/features/learning/reference/useReplay'
import { ReplayControls } from '@/features/learning/reference/ReplayControls'
import styles from '@/styles/screens.module.css'
import layout from '@/features/learning/FigmaLearning.module.css'
export function WritingComparisonScreen({ stage }: { stage: Stage }) {
  const t = useUiText()
  const {
    draft,
    contentId,
    practiceTarget,
    resultOrigin,
    selectJamo,
    selectComparisonCell,
    beginAttempt,
    notify,
  } = useSession()
  const { goNext } = useNextContent()
  function handleRetry(scope: 'all' | 'errors' = 'all') {
    beginAttempt(stage, scope)
    notify('')
    navigate(`write-${stage}`)
  }
  function handleBack() {
    notify('')
    navigate(!resultOrigin && grade?.perfect ? 'result-done' : `result-${stage}`)
  }

  function handleSelectCharacter(char: string, index: number) {
    selectJamo(char)
    selectComparisonCell(index)
    navigate('stroke')
  }
  function handleSelectShape(index: number) {
    selectComparisonCell(index)
    navigate('shape')
  }
  const target =
    draft?.stage === stage
      ? draft.target
      : learningContent(contentId, practiceTarget).targets[stage]
  const { strokes, error, retry } = useAnswerStrokes(target)
  const canRetryErrors = draft?.stage === stage && retryCellIndexes(draft).length > 0
  const chars = targetCells(target, stage)
  const grade = draft?.stage === stage ? visibleGrade(draft.grade) : undefined
  const references = chars.map((char) => strokes[char] ?? [])
  const timeline = createStrokeReplay(
    draft?.stage === stage ? draft.cells : [],
    references,
    grade
      ? { cells: grade.cells, alignment: stage === 'pro' ? grade.alignment : undefined }
      : undefined,
  )
  const replay = useReplay(timeline.length * strokeReplayStepMs)
  const step = replay.position * timeline.length
  const hasReference = references.some((reference) => reference.length > 0)
  const shapes = draft?.stage === stage ? shapeFeedback(draft) : []
  const shapeOnly =
    grade?.correct && shapes.length > 0 && grade.cells.every((cell) => cell.mark === 'none')
  return (
    <div
      className={styles.screen}
      data-name={`compare-${stage}`}
      data-node-id={shapeOnly ? '129:941' : undefined}
    >
      <AppBar title={t('정답 비교')} onBack={handleBack} />
      <div className={styles.pageContent} data-name="page">
        <SejongMessage
          className={styles.guideMessage}
          title={
            shapeOnly
              ? t('글자와 쓰는 순서는 다 맞았어요')
              : t('위는 내가 쓴 글, 아래는 정답이에요')
          }
          description={
            shapeOnly
              ? t('모양을 조금만 다듬으면 더 반듯해져요. 파란 칸을 눌러 보세요.')
              : hasReference
                ? t('재생하면 내가 쓴 획과 대응하는 정답 획을 함께 볼 수 있어요.')
                : t('칸을 누르면 그 글자의 모양을 크게 비교할 수 있어요.')
          }
          src="/assets/figma/fc462.png"
          vertical={false}
          characterWidth={120}
          characterHeight={191.8}
        />
        <div className={learningStyles.comparison} data-name="vs">
          {error && retry && <Button onClick={retry}>{t('획순 다시 불러오기')}</Button>}
          <div className={learningStyles.submittedRow} data-name="vs-line">
            <p className={styles.controlLabel}>{t('내가 쓴 글')}</p>
            <SubmittedWriting
              stage={stage}
              compact
              caption={null}
              shapeCells={new Set(shapes.map(({ index }) => index))}
              onShapeSelect={handleSelectShape}
              progressByCell={timeline.user.map((slots) => strokeProgress(slots, step))}
            />
          </div>
          <div className={learningStyles.referenceRow} data-name="vs-line">
            <p className={styles.controlLabel}>{t('정답')}</p>
            <AnswerPaper
              stage={stage}
              target={target}
              strokes={strokes}
              progressByCell={timeline.answer.map((slots) => strokeProgress(slots, step))}
              onSelect={handleSelectCharacter}
            />
          </div>
          <ReplayControls
            replay={replay}
            disabled={!timeline.length}
            count={t('{0} / {1}단계', Math.floor(step), timeline.length)}
          />
          {grade && !shapeOnly && (
            <div className={layout.legend}>
              <span>
                <i />
                {t('글자가 달라요')}
              </span>
              <span>
                <i />
                {t('쓰는 순서가 달라요')}
              </span>
            </div>
          )}
          {shapes.length > 0 && (
            <p className={learningStyles.shapeLegend}>
              {t('모양을 다듬으면 좋아요 (틀린 건 아니에요)')}
            </p>
          )}
        </div>
        {shapes.length > 0 && (
          <Panel className={styles.panel}>
            <h2 className={styles.sectionTitle}>{t('이렇게 다듬어요')}</h2>
            {shapes.map(({ char, index, notes }) => (
              <div key={index}>
                <p className={styles.panelBody}>
                  {notes.find((note) => note.message)?.message ??
                    t('‘{0}’의 크기와 위치를 정답 글씨와 비교해 보세요.', char)}
                </p>
                <Button variant="text" onClick={() => handleSelectShape(index)}>
                  {t('‘{0}’ 모양 크게 보기', char)}
                </Button>
              </div>
            ))}
          </Panel>
        )}
        {grade && grade.explanations.length > 0 && (
          <Panel className={styles.panel}>
            <div className={styles.panelHeader}>
              <p className={styles.sectionTitle}>{t('이렇게 고쳐요')}</p>
            </div>
            {grade.explanations.map((item, index) => (
              <p className={styles.panelBody} key={index}>
                {item.text}
              </p>
            ))}
          </Panel>
        )}
      </div>
      <div className={styles.footer} data-name="cta">
        <div className={styles.buttonRow}>
          <Button
            className={styles.secondaryAction}
            variant="secondary"
            data-action="버튼/보조"
            onClick={() => handleRetry(canRetryErrors ? 'errors' : 'all')}
          >
            {t('다시 쓰기')}
          </Button>
          <Button
            className={styles.primaryAction}
            variant="primary"
            data-action="버튼/주"
            onClick={resultOrigin === 'records' ? () => navigate('records') : goNext}
          >
            {resultOrigin === 'records' ? t('기록으로') : t('다음으로')}
          </Button>
        </div>
      </div>
    </div>
  )
}
