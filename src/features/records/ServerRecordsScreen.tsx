import { useUiText } from '@/app/useUiText'
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
  const t = useUiText()
  const { screen, preferences, notify } = useSession()
  const [pages, setPages] = useState([''])
  const cursor = pages.at(-1)!
  const { data, error, retry } = useWritingPage(cursor)
  const { open, opening } = useOpenWriting()

  return (
    <div className={styles.screen} data-name="records">
      <div className={styles.pageHeader}>
        <h1 className={styles.heading}>{t('쓰기 기록')}</h1>
        <p className={styles.bodyText}>{t('쓴 글을 누르면 결과를 다시 봐요.')}</p>
      </div>
      <div className={styles.pageWithNavigation}>
        <Panel className={styles.listPanel}>
          {!data && <p role="status">{error ?? t('기록을 불러오고 있어요.')}</p>}
          {error && <Button onClick={retry}>{t('다시 불러오기')}</Button>}
          {data?.items.length === 0 && <p>{t('아직 저장된 글씨가 없어요.')}</p>}
          {data?.items.map((record) => {
            const stub = record.engineVersion?.endsWith('-stub')
            return (
              <ListRow
                key={record.writingId}
                label={t('{0} 결과 다시 보기', record.target)}
                onClick={() => void open(record.writingId, 'records', record)}
                disabled={opening !== null}
              >
                <time className={styles.controlLabel} dateTime={record.createdAt}>
                  {dateLabel.format(new Date(record.createdAt))}
                </time>
                <div className={styles.recordText}>
                  <Badge tone={stub ? 'neutral' : record.perfect ? 'success' : 'warning'}>
                    {stub
                      ? t('미채점')
                      : record.perfect
                        ? t('다 맞음')
                        : record.correct
                          ? t('획 확인')
                          : t('글자 확인')}
                  </Badge>
                  <p className={styles.actionText}>{record.target}</p>
                  <p className={styles.secondaryText}>{record.source ?? record.title}</p>
                </div>
              </ListRow>
            )
          })}
        </Panel>
        {pages.length > 1 && (
          <Button onClick={() => setPages((list) => list.slice(0, -1))}>{t('이전 기록')}</Button>
        )}
        {data?.nextCursor && data.nextCursor !== cursor && (
          <Button onClick={() => setPages((list) => [...list, data.nextCursor!])}>
            {t('다음 기록')}
          </Button>
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
