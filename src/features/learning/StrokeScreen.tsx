import learningStyles from '@/features/learning/LearningScreens.module.css'
import { AppBar } from '@/components/ui/AppBar'
import { Button } from '@/components/ui/Button'
import { Panel } from '@/components/ui/Panel'
import { StrokeDiagram } from '@/components/ui/StrokeDiagram'
import { GradedInk } from '@/components/writing/GradedInk'
import { useSession } from '@/app/useSession'
import { navigate } from '@/app/router'
import { targetCells } from '@/data/content'
import { ReferenceGlyph } from '@/features/learning/reference/ReferenceGlyph'
import { useAnswerStrokes } from './reference/useAnswerStrokes'
import { useReplay } from '@/features/learning/reference/useReplay'
import { ReplayControls } from '@/features/learning/reference/ReplayControls'
import styles from '@/styles/screens.module.css'
import layout from '@/features/learning/FigmaLearning.module.css'
export default function Stroke() {
  const { draft, jamo, comparisonCell, beginAttempt, preferences, notify } = useSession()
  function handleBack() {
    notify('')
    navigate(`compare-${draft?.stage ?? preferences.stage}`)
  }
  const { strokes, error, retry } = useAnswerStrokes(jamo)
  const chars = draft ? targetCells(draft.target, draft.stage) : []
  const index =
    comparisonCell !== null && chars[comparisonCell] === jamo ? comparisonCell : chars.indexOf(jamo)
  const cell = index >= 0 ? draft?.cells[index] : undefined
  const reference = strokes[jamo] ?? []
  const count = reference.length
  const duration =
    cell?.strokes.reduce(
      (max, stroke) => stroke.points.reduce((max, point) => Math.max(max, point[2]), max),
      0,
    ) ?? 0
  const replayDuration = Math.max(count * 700, duration)
  const replay = useReplay(replayDuration)
  return (
    <div className={styles.screen} data-name="stroke — 획순 크게 보기">
      <AppBar title={`${jamo} ${count ? '쓰는 순서' : '글씨 비교'}`} onBack={handleBack} />
      <div className={styles.pageContent}>
        <Panel className={styles.panel}>
          {error && retry && <Button onClick={retry}>획순 다시 불러오기</Button>}
          <div className={layout.diagramRow} style={{ justifyContent: 'space-between' }}>
            <div className={learningStyles.referenceRow}>
              <StrokeDiagram className={styles.strokeBox287}>
                {cell ? (
                  <GradedInk
                    cell={cell}
                    errors={[]}
                    until={replay.position === 1 ? Infinity : replay.position * replayDuration}
                  />
                ) : (
                  <p className={styles.secondaryText}>아직 쓴 글씨가 없어요.</p>
                )}
              </StrokeDiagram>
              <p className={styles.secondaryText}>내가 쓴 순서</p>
            </div>
            <div className={learningStyles.referenceRow}>
              <StrokeDiagram className={styles.strokeBox287}>
                <ReferenceGlyph
                  char={jamo}
                  referenceStrokes={reference}
                  numbers
                  progress={replay.position === 1 ? Infinity : replay.position * count}
                />
              </StrokeDiagram>
              <p className={styles.secondaryText}>{count ? '바른 순서' : '동국체 글씨'}</p>
            </div>
          </div>
          <ReplayControls
            replay={replay}
            disabled={replayDuration <= 0}
            count={
              count ? `${Math.floor(replay.position * count)} / ${count}획` : '내 필기 다시 보기'
            }
          />
          <p className={styles.panelBody}>
            {count
              ? '획의 시작점과 번호를 따라 한 획씩 확인해 보세요.'
              : '동국체 글씨와 모양을 비교해 보세요. 정답 획순은 준비 중이에요.'}
          </p>
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
          다시 쓰기
        </Button>
      </div>
    </div>
  )
}
