import { SubmitButton } from '@/components/ui/SubmitButton'
import { PracticePaper } from '@/components/WritingBoard/PracticePaper'

import { WritingTools } from '@/components/WritingBoard/WritingTools'
import { StageSelector } from '@/components/ui/StageSelector'
import { AppBar } from '@/components/ui/AppBar'
import styles from '@/styles/screens.module.css'

export default function WriteBeginner() {
  return (
    <div
      className={styles.leveltest1163}
      data-node-id="67:1928"
      data-name="write-beginner — 쓰기 · 초보"
    >
      <AppBar title="따라 쓰기" />
      <div className={styles.page67} data-node-id="67:1934" data-name="page">
        <div className={styles.bar235} data-node-id="67:1935" data-name="bar">
          <p className={styles.element37} data-node-id="67:1936">
            난이도
          </p>
          <StageSelector />
        </div>
        <div className={styles.task236} data-node-id="67:1944" data-name="task">
          <p className={styles.element205} data-node-id="67:1945">
            바다
          </p>
          <div className={styles.meaning250} data-node-id="67:1946" data-name="meaning">
            <p className={styles.element251} data-node-id="67:1947">
              뜻
            </p>
            <p className={styles.element252} data-node-id="67:1948">
              sea
            </p>
          </div>
          <p className={styles.element206} data-node-id="67:1949">
            회색 글자 위에 따라 써요
          </p>
        </div>
        <PracticePaper
          count={2}
          columns={2}
          cellSize={144}
          guides={['/assets/figma/530cd.svg', '/assets/figma/2667d.svg']}
        />
        <WritingTools />
      </div>
      <div className={styles.cta27} data-node-id="67:1981" data-name="cta">
        <SubmitButton className={styles.element28} />
      </div>
    </div>
  )
}
