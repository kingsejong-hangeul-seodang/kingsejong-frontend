import { useState } from 'react'
import { MainNavigation } from '@/components/ui/MainNavigation'
import { ListRow } from '@/components/ui/ListRow'
import { Panel } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { homeScreen } from '@/app/learningFlow'
import { useSession } from '@/app/useSession'
import { navigate } from '@/app/router'
import { useWritingPage } from '@/hooks/useStudy'
import { useOpenWriting } from '@/hooks/useOpenWriting'
import styles from '@/styles/screens.module.css'

const dateLabel = new Intl.DateTimeFormat('ko-KR', {
  timeZone: 'Asia/Seoul',
  month: 'numeric',
  day: 'numeric',
})

export function ServerRecordsScreen() {
  const { screen, preferences, notify } = useSession()
  const [pages, setPages] = useState([''])
  const cursor = pages.at(-1)!
  const { data, error, retry } = useWritingPage(cursor)
  const { open, opening } = useOpenWriting()

  return (
    <div className={styles.screen} data-name="records">
      <div className={styles.pageHeader}>
        <h1 className={styles.heading}>쓰기 기록</h1>
        <p className={styles.bodyText}>쓴 글을 누르면 결과를 다시 봐요.</p>
      </div>
      <div className={styles.pageWithNavigation}>
        <Panel className={styles.listPanel}>
          {!data && <p role="status">{error ?? '기록을 불러오고 있어요.'}</p>}
          {error && <Button onClick={retry}>다시 불러오기</Button>}
          {data?.items.length === 0 && <p>아직 저장된 글씨가 없어요.</p>}
          {data?.items.map((record) => (
            <ListRow
              key={record.writingId}
              label={`${record.target} 결과 다시 보기`}
              onClick={() => void open(record.writingId, 'records', record)}
              disabled={opening !== null}
            >
              <time className={styles.controlLabel} dateTime={record.createdAt}>
                {dateLabel.format(new Date(record.createdAt))}
              </time>
              <div className={styles.recordText}>
                <Badge tone={record.perfect ? 'success' : 'warning'}>
                  {record.perfect ? '다 맞음' : record.correct ? '획 확인' : '글자 확인'}
                </Badge>
                <p className={styles.actionText}>{record.target}</p>
                <p className={styles.secondaryText}>{record.source ?? record.title}</p>
              </div>
            </ListRow>
          ))}
        </Panel>
        {pages.length > 1 && (
          <Button onClick={() => setPages((list) => list.slice(0, -1))}>이전 기록</Button>
        )}
        {data?.nextCursor && data.nextCursor !== cursor && (
          <Button onClick={() => setPages((list) => [...list, data.nextCursor!])}>다음 기록</Button>
        )}
      </div>
      <MainNavigation
        screen={screen}
        home={homeScreen(preferences.mode)}
        onNavigate={(destination) => {
          notify('')
          navigate(destination)
        }}
      />
    </div>
  )
}
