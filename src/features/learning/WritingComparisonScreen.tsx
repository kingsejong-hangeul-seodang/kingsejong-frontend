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
import { retryCellIndexes, shapeFeedback } from '@/data/writingFeedback'
import { useReplay } from '@/features/learning/reference/useReplay'
import { ReplayControls } from '@/features/learning/reference/ReplayControls'
import styles from '@/styles/screens.module.css'
import layout from '@/features/learning/FigmaLearning.module.css'
export function WritingComparisonScreen({ stage }: { stage: Stage }) {
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
  const referenceDuration = chars.reduce((sum, char) => sum + (strokes[char]?.length ?? 0) * 700, 0)
  const userDuration =
    draft?.cells.reduce(
      (max, cell) =>
        cell.strokes.reduce(
          (max, stroke) => stroke.points.reduce((max, point) => Math.max(max, point[2]), max),
          max,
        ),
      0,
    ) ?? 0
  const duration = Math.max(referenceDuration, userDuration)
  const replay = useReplay(duration)
  const referencePosition =
    referenceDuration > 0 ? Math.min(1, (replay.position * duration) / referenceDuration) : 1
  const grade =
    draft?.stage === stage && draft.grade && !draft.grade.engineVersion.endsWith('stub')
      ? draft.grade
      : null
  const shapes = draft?.stage === stage ? shapeFeedback(draft) : []
  const shapeOnly = grade?.perfect && shapes.length > 0
  return (
    <div
      className={styles.screen}
      data-name={`compare-${stage}`}
      data-node-id={shapeOnly ? '129:941' : undefined}
    >
      <AppBar title="정답 비교" onBack={handleBack} />
      <div className={styles.pageContent} data-name="page">
        <SejongMessage
          className={styles.guideMessage}
          title={
            shapeOnly ? '글자와 쓰는 순서는 다 맞았어요' : '위는 내가 쓴 글, 아래는 정답이에요'
          }
          description={
            shapeOnly
              ? '모양을 조금만 다듬으면 더 반듯해져요. 파란 칸을 눌러 보세요.'
              : '쓰는 순서대로 보여 드려요. 칸을 누르면 그 글자만 볼 수 있어요.'
          }
          src="/assets/figma/fc462.png"
          vertical={false}
          characterWidth={120}
          characterHeight={191.8}
        />
        <div className={learningStyles.comparison} data-name="vs">
          {error && retry && <Button onClick={retry}>획순 다시 불러오기</Button>}
          <div className={learningStyles.submittedRow} data-name="vs-line">
            <p className={styles.controlLabel}>내가 쓴 글</p>
            <SubmittedWriting
              stage={stage}
              compact
              caption={null}
              shapeCells={new Set(shapes.map(({ index }) => index))}
              onShapeSelect={handleSelectShape}
              until={replay.position === 1 ? Infinity : replay.position * duration}
            />
          </div>
          <div className={learningStyles.referenceRow} data-name="vs-line">
            <p className={styles.controlLabel}>정답</p>
            <AnswerPaper
              stage={stage}
              target={target}
              strokes={strokes}
              position={referencePosition}
              onSelect={handleSelectCharacter}
            />
          </div>
          <ReplayControls
            replay={replay}
            disabled={duration <= 0}
            count={`${Math.min(chars.length, Math.floor(chars.length * replay.position))} / ${chars.length}칸`}
          />
          {grade && !shapeOnly && (
            <div className={layout.legend}>
              <span>
                <i />
                글자가 달라요
              </span>
              <span>
                <i />
                쓰는 순서가 달라요
              </span>
            </div>
          )}
          {shapes.length > 0 && (
            <p className={learningStyles.shapeLegend}>모양을 다듬으면 좋아요 (틀린 건 아니에요)</p>
          )}
        </div>
        {shapes.length > 0 && (
          <Panel className={styles.panel}>
            <h2 className={styles.sectionTitle}>이렇게 다듬어요</h2>
            {shapes.map(({ char, index, notes }) => (
              <div key={index}>
                <p className={styles.panelBody}>
                  {notes.find((note) => note.message)?.message ??
                    `‘${char}’의 크기와 위치를 정답 글씨와 비교해 보세요.`}
                </p>
                <Button variant="text" onClick={() => handleSelectShape(index)}>
                  ‘{char}’ 모양 크게 보기
                </Button>
              </div>
            ))}
          </Panel>
        )}
        {grade && grade.explanations.length > 0 && (
          <Panel className={styles.panel}>
            <div className={styles.panelHeader}>
              <p className={styles.sectionTitle}>이렇게 고쳐요</p>
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
            다시 쓰기
          </Button>
          <Button
            className={styles.primaryAction}
            variant="primary"
            data-action="버튼/주"
            onClick={goNext}
          >
            다음으로
          </Button>
        </div>
      </div>
    </div>
  )
}
