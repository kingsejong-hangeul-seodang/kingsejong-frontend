import { useEffect, useState } from 'react'
import { MainNavigation } from '@/components/ui/MainNavigation'
import { ListRow } from '@/components/ui/ListRow'
import { Panel } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { homeScreen } from '@/app/learningFlow'
import type { ScreenName } from '@/app/routes/screens'
import { useSession } from '@/app/useSession'
import { navigate } from '@/app/router'
import { contentById } from '@/data/content'
import { listRecords, type WritingRecord } from '@/data/writingRecords'
import styles from '@/styles/screens.module.css'
import recordsLayout from '@/features/records/Records.module.css'
import { studyApi } from '@/api/integration'
import { ServerRecordsScreen } from './ServerRecordsScreen'
export default function Records() {
  return studyApi ? <ServerRecordsScreen /> : <LocalRecordsScreen />
}

function LocalRecordsScreen() {
  const {
    saveDraft,
    selectContent,
    selectPractice,
    setResultOrigin,
    preferences,
    update,
    screen,
    notify,
  } = useSession()
  function handleNavigate(destination: ScreenName) {
    notify('')
    navigate(destination)
  }
  const [records, setRecords] = useState<WritingRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  useEffect(() => {
    let active = true
    listRecords()
      .then((value) => {
        if (active) setRecords(value)
      })
      .catch(() => {
        if (active) setMessage('이 기기의 기록을 불러오지 못했어요.')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])
  return (
    <div className={styles.screen} data-name="records — 쓰기 기록" data-node-id="67:2920">
      <div className={styles.pageHeader}>
        <p className={styles.heading}>쓰기 기록</p>
        <p className={styles.bodyText}>쓴 글을 누르면 결과를 다시 봐요.</p>
      </div>
      <div className={styles.pageWithNavigation}>
        <Panel className={styles.listPanel}>
          {loading && (
            <p className={styles.secondaryText} role="status">
              기록을 불러오는 중이에요.
            </p>
          )}
          {!loading && !records.length && !message && (
            <div className={recordsLayout.notes}>
              <p className={styles.panelBody}>아직 저장한 글씨가 없어요. 한 줄 써 볼까요?</p>
              <Button onClick={() => navigate(homeScreen(preferences.mode))}>
                연습할 글 고르기
              </Button>
            </div>
          )}
          {records.map((record) => {
            const graded = record.grade && !record.grade.engineVersion.endsWith('stub')
            const label = !graded
              ? '미채점'
              : record.grade!.perfect
                ? '다 맞음'
                : record.grade!.correct
                  ? '획 확인'
                  : '글자 확인'
            const date = new Date(record.createdAt)
            return (
              <ListRow
                key={record.id}
                className={styles.listRow}
                label={`${record.target} 결과 다시 보기`}
                onClick={() => {
                  saveDraft(record)
                  update({ stage: record.stage })
                  if (record.contentId) selectContent(record.contentId)
                  if (record.practiceTarget) selectPractice(record.practiceTarget)
                  setResultOrigin('records')
                  navigate(`result-${record.stage}`)
                }}
              >
                <time className={styles.controlLabel} dateTime={record.createdAt}>
                  {date.getMonth() + 1}/{date.getDate()}
                </time>
                <div className={styles.recordText}>
                  <Badge tone={!graded ? 'neutral' : record.grade!.perfect ? 'success' : 'warning'}>
                    {label}
                  </Badge>
                  <p className={styles.actionText}>{record.target}</p>
                  <p className={styles.secondaryText}>
                    {record.practiceTarget
                      ? '자모 연습'
                      : (record.catalogContent?.source ??
                        (record.contentId ? contentById(record.contentId).source : '기본 연습'))}
                  </p>
                </div>
                <div className={styles.rowTrailing}>
                  <div className={styles.rowIcon}>
                    <img alt="" className={styles.fillImage} src="/assets/figma/f651f.svg" />
                  </div>
                </div>
              </ListRow>
            )
          })}
        </Panel>
        {message && (
          <p className={styles.secondaryText} role="status">
            {message}
          </p>
        )}
      </div>
      <MainNavigation
        screen={screen}
        home={homeScreen(preferences.mode)}
        onNavigate={handleNavigate}
      />
    </div>
  )
}
