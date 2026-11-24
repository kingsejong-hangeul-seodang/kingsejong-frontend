import { useUiText } from '@/app/useUiText'
import { AppBar } from '@/components/ui/AppBar'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Panel } from '@/components/ui/Panel'
import { ListRow } from '@/components/ui/ListRow'
import { useSession } from '@/app/useSession'
import { navigate } from '@/app/router'
import { backend, studyApi } from '@/api/integration'
import { useJamoDetail } from '@/hooks/useStudy'
import { useJamoMastery } from '@/hooks/useJamoMastery'
import { useOpenWriting } from '@/hooks/useOpenWriting'
import { catalogKey, useCatalogList } from '@/hooks/useCatalog'
import { attemptLabels, consecutivePasses, masteryLabels } from '@/data/jamoMastery'
import { ReferencePlayer } from '@/features/learning/reference/ReferencePlayer'
import { useGuideFont } from '@/features/learning/reference/guideFont'
import jamoStyles from './Jamo.module.css'
import styles from '@/styles/screens.module.css'
import type { WritingRecord } from '@/data/writingRecords'

const practiceDate = new Intl.DateTimeFormat('ko-KR', {
  month: 'long',
  day: 'numeric',
  timeZone: 'Asia/Seoul',
})

export function JamoDetailScreen() {
  const t = useUiText()
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
  const basic = useCatalogList('basic', 'beginner', Boolean(backend && !studyApi))
  const practiceContentId =
    data?.practiceContentId ??
    basic.data?.find((item) => item.kind === 'jamo' && item.target === jamo)?.id
  const { family } = useGuideFont()
  const glyphStyle = family ? { fontFamily: family } : undefined
  const { practices, mastery } = useJamoMastery()
  const { open, opening } = useOpenWriting()
  const progress = mastery.get(jamo)
  const status = studyApi ? (data?.mastery ?? 'none') : (progress?.status ?? 'none')
  const recent = practices
    .flatMap((entry) => {
      const outcome = entry.outcomes[jamo]
      return outcome && Object.hasOwn(attemptLabels, outcome) ? [{ ...entry, outcome }] : []
    })
    .slice(0, 3)

  function openLocal(record: WritingRecord) {
    saveDraft(record)
    update({ stage: record.stage })
    if (record.contentId) selectContent(record.contentId)
    if (record.practiceTarget) selectPractice(record.practiceTarget)
    setResultOrigin(origin)
    navigate(`result-${record.stage}`)
  }

  function practice() {
    if (!data) return
    update({ stage: 'beginner' })
    if (practiceContentId != null) {
      selectContent(catalogKey(practiceContentId))
    } else {
      selectPractice(jamo)
    }
    navigate('write-beginner')
  }

  return (
    <div className={styles.screen} data-name="jamo-detail">
      <AppBar title={t('자모 도감')} onBack={() => navigate('dogam')} />
      <div className={styles.pageContent}>
        {!data ? (
          <Panel className={styles.panel}>
            <p role="status">{error ?? t('자모를 불러오고 있어요.')}</p>
            {error && <Button onClick={retry}>{t('다시 불러오기')}</Button>}
          </Panel>
        ) : (
          <>
            <div className={jamoStyles.detailHeader}>
              <div className={jamoStyles.largeGlyph} style={glyphStyle}>
                {data.jamo}
              </div>
              <div className={jamoStyles.glyphInfo}>
                <Badge>{t(masteryLabels[status])}</Badge>
                <h1 className={styles.heading}>{data.name}</h1>
                <p className={styles.secondaryText}>
                  {data.type === 'vowel' ? t('모음') : t('자음')}
                  {data.strokeCount > 0 ? t('· {0}획', data.strokeCount) : ''}
                </p>
              </div>
            </div>
            <ReferencePlayer key={jamo} target={jamo} />
            {(data.steps.length > 0 || data.commonMistake) && (
              <Panel className={styles.panel}>
                <h2 className={styles.sectionTitle}>{t('획순 설명')}</h2>
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
                <h2 className={styles.sectionTitle}>{t('이 자모가 든 글자')}</h2>
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
            {studyApi ? (
              <Panel className={styles.listPanel}>
                <h2 className={styles.sectionTitle}>{t('최근 연습')}</h2>
                {!data.recentWritings.length && (
                  <p className={styles.secondaryText}>
                    {t('이 자모가 들어간 연습 기록이 아직 없어요.')}
                  </p>
                )}
                {data.recentWritings.map((record) => (
                  <ListRow
                    key={record.writingId}
                    label={t('{0} 기록 다시 보기', record.target)}
                    disabled={opening !== null}
                    onClick={() => void open(record.writingId, origin)}
                  >
                    <div className={styles.recordText}>
                      <p className={styles.actionText}>{record.target}</p>
                      <p className={styles.secondaryText}>{record.message}</p>
                    </div>
                  </ListRow>
                ))}
              </Panel>
            ) : (
              <Panel className={styles.panel}>
                <h2 className={styles.sectionTitle}>{t('최근 연습')}</h2>
                <p className={styles.secondaryText}>
                  {t(
                    '이 기기에 연습 {0}회가 저장됐어요. 최근 실채점 {1}회가 모두 통과하면 ‘익숙’이 돼요.',
                    progress?.practiceCount ?? 0,
                    consecutivePasses,
                  )}
                </p>
                {progress?.recentGrades.length ? (
                  <p className={styles.secondaryText}>
                    {t(
                      '최근 실채점 {0}회 중 {1}회 통과',
                      progress.recentGrades.length,
                      progress.recentGrades.filter((grade) => grade === 'pass').length,
                    )}
                  </p>
                ) : (
                  progress && (
                    <p className={styles.secondaryText}>{t('아직 실채점 기록이 없어요.')}</p>
                  )
                )}
                {recent.length > 0 && (
                  <ul className={jamoStyles.recentPractice}>
                    {recent.map(({ outcome, createdAt, target, record }, index) => {
                      const date = createdAt ? new Date(createdAt) : null
                      const heading = target ?? t('이전 연습')
                      const summary = [
                        date && Number.isFinite(date.getTime()) ? practiceDate.format(date) : null,
                        t(attemptLabels[outcome]),
                      ]
                        .filter(Boolean)
                        .join(' · ')
                      return (
                        <li key={record?.id ?? index}>
                          <div className={styles.recordText}>
                            <p className={styles.actionText}>{heading}</p>
                            <p className={styles.secondaryText}>{summary}</p>
                          </div>
                          {record && (
                            <Button variant="text" onClick={() => openLocal(record)}>
                              {t('기록 보기')}
                            </Button>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                )}
              </Panel>
            )}
          </>
        )}
      </div>
      {data && (!backend || practiceContentId != null) && (
        <div className={styles.footer}>
          <Button className={styles.primaryButton} onClick={practice}>
            {t('{0} 연습', jamo)}
          </Button>
        </div>
      )}
    </div>
  )
}
