import { SejongMessage } from '@/components/SejongGuide/SejongMessage'
import { AppBar } from '@/components/ui/AppBar'
import { Action } from '@/components/ui/Action'
import { SubmittedWriting } from '@/components/WritingBoard/SubmittedWriting'

import { useSession } from '@/app/useSession'
import type { Stage } from '@/app/session'
import styles from '@/styles/screens.module.css'

export function WritingResult({ stage }: { stage?: Stage }) {
  const { screen } = useSession()
  return (
    <div className={styles.leveltest1163} data-name={`${screen} — 결과`}>
      <AppBar title="결과" />
      <div className={styles.page67} data-name="page">
        <SejongMessage
          className={styles.say72}
          title={'쓴 글씨를 확인해 보세요'}
          description={'정답과 나란히 비교해 볼까요?'}
          src={'/assets/figma/fc462.png'}
          vertical={false}
          characterWidth={120}
          characterHeight={191.8}
        />
        <div style={{ width: 740, maxWidth: 'calc(100% - 2 * var(--space-page-x))' }}>
          <SubmittedWriting stage={stage} />
        </div>
      </div>
      <div className={styles.cta27} data-name="cta">
        <div className={styles.actions105}>
          <Action className={styles.element106} kind="버튼/보조" label="정답 보기">
            정답 보기
          </Action>
          <Action className={styles.element108} kind="버튼/주" label="다시 쓰기">
            다시 쓰기
          </Action>
        </div>
      </div>
    </div>
  )
}
