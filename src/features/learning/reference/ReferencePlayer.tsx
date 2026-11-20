import jamoStyles from '@/features/jamo/Jamo.module.css'
import { useState } from 'react'
import { Panel } from '@/components/ui/Panel'
import { StrokeDiagram } from '@/components/ui/StrokeDiagram'
import { ReferenceGlyph } from './ReferenceGlyph'
import { useReference } from './reference'
import { useReplay } from './useReplay'
import { ReplayControls } from './ReplayControls'
import styles from '@/styles/screens.module.css'
import layout from '@/features/learning/FigmaLearning.module.css'
import { useStrokeReference } from '@/hooks/useStudy'
import { studyApi } from '@/api/integration'
export function ReferencePlayer({ target }: { target: string }) {
  const local = useReference()
  const remote = useStrokeReference(target)
  const loading = studyApi ? !remote.data && !remote.error : local.loading
  const error = studyApi ? remote.error : local.error
  const [index, setIndex] = useState(0)
  const chars = [...target].filter((char) => char !== ' ')
  const char = chars[index] ?? chars[0] ?? ''
  const strokes = studyApi
    ? (remote.data?.items.find((item) => item.char === char)?.strokes ?? [])
    : local.data?.characters[char]
  const count = strokes?.length ?? 0
  const replay = useReplay(count * 700)
  return (
    <Panel className={styles.panel} data-name="block">
      <div className={styles.panelHeader}>
        <p className={styles.sectionTitle}>{count ? '쓰는 순서' : '글씨 모양'}</p>
      </div>
      {chars.length > 1 && (
        <div className={styles.wrappingGrid}>
          {chars.map((char, i) => (
            <button
              type="button"
              key={i}
              className={jamoStyles.exampleGlyphButton}
              aria-pressed={index === i}
              onClick={() => {
                setIndex(i)
                replay.seek(1)
              }}
            >
              {char}
            </button>
          ))}
        </div>
      )}
      {loading && (
        <p className={styles.secondaryText} role="status">
          정답 데이터를 불러오는 중이에요.
        </p>
      )}
      {!loading && (error || !count) && (
        <p className={styles.secondaryText} role="status">
          획순은 준비 중이에요. 동국체 글씨 모양을 먼저 살펴보세요.
        </p>
      )}
      {remote.error && (
        <button type="button" onClick={remote.retry}>
          획순 다시 불러오기
        </button>
      )}
      <div className={layout.diagramRow}>
        <StrokeDiagram className={jamoStyles.strokeDiagram}>
          <ReferenceGlyph
            char={char}
            referenceStrokes={strokes}
            numbers
            progress={replay.position === 1 ? Infinity : replay.position * count}
          />
        </StrokeDiagram>
        <div className={jamoStyles.strokeSteps}>
          <p className={styles.panelBody}>
            {count ? '시작점과 진행 방향을 확인해 보세요.' : '글자의 크기와 모양을 확인해 보세요.'}
          </p>
          {count > 0 && <p className={styles.secondaryText}>빨간 숫자는 쓰는 순서예요.</p>}
        </div>
      </div>
      {count > 0 && (
        <ReplayControls
          replay={replay}
          disabled={!count}
          count={`${Math.floor(replay.position * count)} / ${count}획`}
        />
      )}
    </Panel>
  )
}
