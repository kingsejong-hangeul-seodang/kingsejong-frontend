import { AppBar } from '@/components/ui/AppBar'
import { Button } from '@/components/ui/Button'
import { Panel } from '@/components/ui/Panel'
import { GradedInk } from '@/components/writing/GradedInk'
import { useSession } from '@/app/useSession'
import { navigate } from '@/app/router'
import { shapeFeedback } from '@/data/writingFeedback'
import { ReferenceGlyph } from './reference/ReferenceGlyph'
import styles from '@/styles/screens.module.css'
import layout from './LearningScreens.module.css'

export default function ShapeScreen() {
  const { draft, comparisonCell, preferences, beginAttempt } = useSession()
  const shape = shapeFeedback(draft).find(({ index }) => index === comparisonCell)
  const cell = shape && draft?.cells[shape.index]
  const stage = draft?.stage ?? preferences.stage
  const back = () => navigate(`compare-${stage}`)

  return (
    <div className={styles.screen} data-node-id="129:1013">
      <AppBar title={shape ? `‘${shape.char}’의 모양` : '글자 모양'} onBack={back} />
      <div className={styles.pageContent}>
        <Panel className={styles.panel}>
          {shape && cell ? (
            <>
              <div className={layout.shapeExamples}>
                <figure>
                  <div className={layout.shapeFrame}>
                    {cell.strokes.length ? (
                      <GradedInk cell={cell} errors={[]} />
                    ) : (
                      cell.image && <img src={cell.image} alt="내가 쓴 글자" />
                    )}
                  </div>
                  <figcaption>내가 쓴 글자</figcaption>
                </figure>
                <figure>
                  <div className={layout.shapeFrame}>
                    <ReferenceGlyph
                      char={shape.char}
                      referenceStrokes={[]}
                      color="var(--color-brand)"
                    />
                  </div>
                  <figcaption>바른 모양</figcaption>
                </figure>
              </div>
              <ol className={layout.shapeNotes}>
                {shape.notes.map(({ message }, index) => (
                  <li key={index}>{message || '크기와 위치를 바른 모양과 비교해 보세요.'}</li>
                ))}
              </ol>
              <p className={styles.secondaryText}>
                모양은 점수에 들어가지 않아요. 더 반듯하게 쓰는 방법을 알려 드려요.
              </p>
            </>
          ) : (
            <p className={styles.bodyText}>정답 비교에서 파란 칸을 골라 보세요.</p>
          )}
        </Panel>
      </div>
      {shape && (
        <div className={styles.footer}>
          <Button
            className={styles.primaryButton}
            onClick={() => {
              beginAttempt(stage, shape.index)
              navigate(`write-${stage}`)
            }}
          >
            ‘{shape.char}’ 다시 쓰기
          </Button>
        </div>
      )}
    </div>
  )
}
