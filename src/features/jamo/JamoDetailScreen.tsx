import { AppBar } from '@/components/ui/AppBar'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Panel } from '@/components/ui/Panel'
import { ListRow } from '@/components/ui/ListRow'
import { useSession } from '@/app/useSession'
import { navigate } from '@/app/router'
import { studyApi } from '@/api/integration'
import { useJamoDetail } from '@/hooks/useStudy'
import { useLearningStats } from '@/hooks/useLearningStats'
import { useOpenWriting } from '@/hooks/useOpenWriting'
import { catalogKey } from '@/hooks/useCatalog'
import { containsJamo } from '@/data/hangul'
import { ReferencePlayer } from '@/features/learning/reference/ReferencePlayer'
import { useGuideFont } from '@/features/learning/reference/guideFont'
import jamoStyles from './Jamo.module.css'
import styles from '@/styles/screens.module.css'

export function JamoDetailScreen() {
  const {
    jamo: selected,
    screen,
    selectContent,
    selectPractice,
    update,
    saveDraft,
    setResultOrigin,
  } = useSession()
  const origin = screen === 'jamo-a' ? 'jamo-a' : 'jamo-digeut'
  const jamo = screen === 'jamo-a' ? 'ㅏ' : selected
  const { data, error, retry } = useJamoDetail(jamo)
  const { family } = useGuideFont()
  const glyphStyle = family ? { fontFamily: family } : undefined
  const { records } = useLearningStats()
  const { open, opening } = useOpenWriting()
  const localRecords = studyApi
    ? []
    : (records ?? []).filter((record) => containsJamo(record.target, jamo)).slice(0, 2)
  const mastery = { none: '아직 안 씀', familiar: '익숙', practice: '연습' } as const

  function practice() {
    if (!data) return
    update({ stage: 'beginner' })
    if (data.practiceContentId != null) {
      selectContent(catalogKey(data.practiceContentId))
    } else {
      selectPractice(jamo)
    }
    navigate('write-beginner')
  }

  return (
    <div className={styles.screen} data-name="jamo-detail">
      <AppBar title="자모 도감" onBack={() => navigate('dogam')} />
      <div className={styles.pageContent}>
        {!data ? (
          <Panel className={styles.panel}>
            <p role="status">{error ?? '자모를 불러오고 있어요.'}</p>
            {error && <Button onClick={retry}>다시 불러오기</Button>}
          </Panel>
        ) : (
          <>
            <div className={jamoStyles.detailHeader}>
              <div className={jamoStyles.largeGlyph} style={glyphStyle}>
                {data.jamo}
              </div>
              <div className={jamoStyles.glyphInfo}>
                <Badge>{mastery[data.mastery]}</Badge>
                <h1 className={styles.heading}>{data.name}</h1>
                <p className={styles.secondaryText}>
                  {data.type === 'vowel' ? '모음' : '자음'}
                  {data.strokeCount > 0 ? ` · ${data.strokeCount}획` : ''}
                </p>
              </div>
            </div>
            <ReferencePlayer key={jamo} target={jamo} />
            {(data.steps.length > 0 || data.commonMistake) && (
              <Panel className={styles.panel}>
                <h2 className={styles.sectionTitle}>획순 설명</h2>
                <ol>
                  {data.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
                {data.commonMistake && <p className={styles.secondaryText}>{data.commonMistake}</p>}
              </Panel>
            )}
            {data.examples.length > 0 && (
              <Panel className={styles.panel}>
                <h2 className={styles.sectionTitle}>이 자모가 든 글자</h2>
                <div className={styles.wrappingGrid}>
                  {data.examples.map((example) => (
                    <span
                      className={jamoStyles.exampleGlyphButton}
                      style={glyphStyle}
                      key={example}
                    >
                      {example}
                    </span>
                  ))}
                </div>
              </Panel>
            )}
            <Panel className={styles.listPanel}>
              <h2 className={styles.sectionTitle}>내 기록</h2>
              {!data.recentWritings.length && !localRecords.length && (
                <p className={styles.secondaryText}>이 자모가 들어간 연습 기록이 아직 없어요.</p>
              )}
              {data.recentWritings.map((record) => (
                <ListRow
                  key={record.writingId}
                  label={`${record.target} 기록 다시 보기`}
                  disabled={opening !== null}
                  onClick={() => void open(record.writingId, origin)}
                >
                  <div className={styles.recordText}>
                    <p className={styles.actionText}>{record.target}</p>
                    <p className={styles.secondaryText}>{record.message}</p>
                  </div>
                </ListRow>
              ))}
              {localRecords.map((record) => (
                <ListRow
                  key={record.id}
                  label={`${record.target} 기록 다시 보기`}
                  onClick={() => {
                    saveDraft(record)
                    update({ stage: record.stage })
                    if (record.contentId) selectContent(record.contentId)
                    if (record.practiceTarget) selectPractice(record.practiceTarget)
                    setResultOrigin(origin)
                    navigate(`result-${record.stage}`)
                  }}
                >
                  <span>{record.target}</span>
                </ListRow>
              ))}
            </Panel>
          </>
        )}
      </div>
      {data && (!studyApi || data.practiceContentId != null) && (
        <div className={styles.footer}>
          <Button className={styles.primaryButton} onClick={practice}>
            {jamo} 연습하기
          </Button>
        </div>
      )}
    </div>
  )
}
