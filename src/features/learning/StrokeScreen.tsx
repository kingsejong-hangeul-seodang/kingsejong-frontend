import { useUiText } from '@/app/useUiText'
import learningStyles from '@/features/learning/LearningScreens.module.css'
import { AppBar } from '@/components/ui/AppBar'
import { Button } from '@/components/ui/Button'
import { Panel } from '@/components/ui/Panel'
import { StrokeDiagram } from '@/components/ui/StrokeDiagram'
import { GradedInk } from '@/components/writing/GradedInk'
import { useSession } from '@/app/useSession'
import { navigate } from '@/app/router'
import { targetCells } from '@/data/content'
import { visibleGrade } from '@/data/writingFeedback'
import { createStrokeReplay, strokeProgress, strokeReplayStepMs } from '@/data/strokeReplay'
import { ReferenceGlyph } from '@/features/learning/reference/ReferenceGlyph'
import { useAnswerStrokes } from './reference/useAnswerStrokes'
import { useReplay } from '@/features/learning/reference/useReplay'
import { ReplayControls } from '@/features/learning/reference/ReplayControls'
import styles from '@/styles/screens.module.css'
import layout from '@/features/learning/FigmaLearning.module.css'
export default function Stroke() {
  const t = useUiText()
  const { draft, jamo, comparisonCell, beginAttempt, preferences, notify } = useSession()
  function handleBack() {
    notify('')
    navigate(`compare-${draft?.stage ?? preferences.stage}`)
  }
  const { strokes, error, retry } = useAnswerStrokes(jamo)
  const chars = draft ? targetCells(draft.target, draft.stage) : []
  const targetIndex =
    comparisonCell !== null && chars[comparisonCell] === jamo ? comparisonCell : chars.indexOf(jamo)
  const grade = visibleGrade(draft?.grade)
  const aligned =
    draft?.stage === 'pro'
      ? grade?.alignment.find((item) => item.targetIndex === targetIndex)
      : undefined
  const index = aligned ? aligned.cellIndex : targetIndex
  const cell = index != null && index >= 0 ? draft?.cells[index] : undefined
  const gradedCell = cell ? grade?.cells.find((item) => item.index === index) : undefined
  const reference = strokes[jamo] ?? []
  const count = reference.length
  const timeline = createStrokeReplay(
    cell ? [cell] : [],
    [reference],
    gradedCell && { cells: [{ index: 0, strokeMap: gradedCell.strokeMap }] },
  )
  const replay = useReplay(timeline.length * strokeReplayStepMs)
  const step = replay.position * timeline.length
  const answerProgress = strokeProgress(timeline.answer[0] ?? [], step)
  return (
    <div className={styles.screen} data-name="stroke — 획순 크게 보기">
      <AppBar title={`${jamo} ${count ? t('쓰는 순서') : t('글씨 비교')}`} onBack={handleBack} />
      <div className={styles.pageContent}>
        <Panel className={styles.panel}>
          {error && retry && <Button onClick={retry}>{t('획순 다시 불러오기')}</Button>}
          <div className={layout.diagramRow} style={{ justifyContent: 'space-between' }}>
            <div className={learningStyles.referenceRow}>
              <StrokeDiagram className={styles.strokeBox287}>
                {cell ? (
                  <GradedInk
                    cell={cell}
                    errors={gradedCell?.errors ?? []}
                    progressByStroke={strokeProgress(timeline.user[0] ?? [], step)}
                  />
                ) : (
                  <p className={styles.secondaryText}>{t('아직 쓴 글씨가 없어요.')}</p>
                )}
              </StrokeDiagram>
              <p className={styles.secondaryText}>{t('내가 쓴 순서')}</p>
            </div>
            <div className={learningStyles.referenceRow}>
              <StrokeDiagram className={styles.strokeBox287}>
                <ReferenceGlyph
                  char={jamo}
                  referenceStrokes={reference}
                  numbers
                  progressByStroke={answerProgress}
                />
              </StrokeDiagram>
              <p className={styles.secondaryText}>
                {count
                  ? cell?.strokes.length
                    ? t('대응하는 정답 획')
                    : t('바른 순서')
                  : t('동국체 글씨')}
              </p>
            </div>
          </div>
          <ReplayControls
            replay={replay}
            disabled={!timeline.length}
            count={
              count
                ? t(
                    '{0} / {1}획',
                    answerProgress.filter((progress) => progress === 1).length,
                    count,
                  )
                : t('내 필기 다시 보기')
            }
          />
          <p className={styles.panelBody}>
            {count
              ? t('주황색은 지금 그리는 획이고, 번호는 바른 획순이에요.')
              : t('동국체 글씨와 모양을 비교해 보세요. 정답 획순은 준비 중이에요.')}
          </p>
          {gradedCell?.errors.map(({ type, expected, actual }, index) =>
            type === 'ORDER' && expected != null && actual != null ? (
              <p className={styles.panelBody} key={index}>
                {t('{0}번째로 쓴 획은 {1}번째에 써야 해요.', actual, expected)}
              </p>
            ) : null,
          )}
        </Panel>
      </div>
      <div className={styles.footer}>
        <Button
          className={styles.primaryButton}
          onClick={() => {
            const stage = draft?.stage ?? preferences.stage
            beginAttempt(stage)
            navigate(`write-${stage}`)
          }}
        >
          {t('다시 쓰기')}
        </Button>
      </div>
    </div>
  )
}
