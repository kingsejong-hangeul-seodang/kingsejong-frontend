import { useUiText } from '@/app/useUiText'
import jamoStyles from '@/features/jamo/Jamo.module.css'
import { useState } from 'react'
import { Panel } from '@/components/ui/Panel'
import { StrokeDiagram } from '@/components/ui/StrokeDiagram'
import { ReferenceGlyph } from './ReferenceGlyph'
import { useAnswerStrokes } from './useAnswerStrokes'
import { useReplay } from './useReplay'
import { ReplayControls } from './ReplayControls'
import styles from '@/styles/screens.module.css'
import layout from '@/features/learning/FigmaLearning.module.css'
export function ReferencePlayer({ target }: { target: string }) {
  const t = useUiText()
  const { strokes: availableStrokes, loading, error, retry } = useAnswerStrokes(target)
  const [index, setIndex] = useState(0)
  const chars = [...target].filter((char) => char !== ' ')
  const char = chars[index] ?? chars[0] ?? ''
  const strokes = availableStrokes[char] ?? []
  const count = strokes?.length ?? 0
  const replay = useReplay(count * 700)
  return (
    <Panel className={styles.panel} data-name="block">
      <div className={styles.panelHeader}>
        <p className={styles.sectionTitle}>{count ? t('쓰는 순서') : t('글씨 모양')}</p>
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
      {loading && !count && (
        <p className={styles.secondaryText} role="status">
          {t('정답 데이터를 불러오는 중이에요.')}
        </p>
      )}
      {!loading && !count && (
        <p className={styles.secondaryText} role="status">
          {t('이 글자는 아직 획순 데이터가 없어요. 글자 모양을 먼저 살펴보세요.')}
        </p>
      )}
      {!count && error && retry && (
        <button type="button" onClick={retry}>
          {t('획순 다시 불러오기')}
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
            {count
              ? t('시작점과 진행 방향을 확인해 보세요.')
              : t('글자의 크기와 모양을 확인해 보세요.')}
          </p>
          {count > 0 && <p className={styles.secondaryText}>{t('번호는 쓰는 순서예요.')}</p>}
        </div>
      </div>
      {count > 0 && (
        <ReplayControls
          replay={replay}
          disabled={!count}
          count={t('{0} / {1}획', Math.floor(replay.position * count), count)}
        />
      )}
    </Panel>
  )
}
