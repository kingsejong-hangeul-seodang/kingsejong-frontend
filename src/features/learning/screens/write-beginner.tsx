import { WritingProgress } from '@/components/WritingBoard/WritingProgress'
import { WritingTools } from '@/components/WritingBoard/WritingTools'
import { StageSelector } from '@/components/ui/StageSelector'
import { AppBar } from '@/components/ui/AppBar'
import styles from '@/styles/screens.module.css'
import { Action } from '@/components/ui/Action'
import { WritingCell } from '@/components/WritingBoard/WritingCell'

const img = '/assets/figma/530cd.svg'
const img1 = '/assets/figma/2667d.svg'

function SubmitButton({ className }: { className?: string | undefined }) {
  return (
    <Action
      className={className || styles.element58}
      data-node-id="19:358"
      data-name="버튼/주"
      kind="버튼/주"
      label="다 썼어요"
    >
      <p className={styles.element29} data-node-id="19:41">
        다 썼어요
      </p>
    </Action>
  )
}

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
        <div className={styles.wongoji78} data-node-id="67:1950" data-name="wongoji">
          <div className={styles.wgRow79} data-node-id="67:1951" data-name="wg-row">
            <WritingCell className={styles.element80} data-node-id="67:1952" data-name="wg-cell">
              <div className={styles.before253} data-node-id="67:1953" data-name="::before">
                <div className={styles.Rectangle254} data-node-id="67:1954" data-name="Rectangle" />
                <div className={styles.Rectangle255} data-node-id="67:1955" data-name="Rectangle" />
              </div>
              <div className={styles.element256} data-node-id="67:1956" data-name="동국체: 바">
                <div className={styles.element257}>
                  <img alt="" className={styles.element123} src={img} />
                </div>
              </div>
              <p className={styles.element81} data-node-id="67:1958">
                바
              </p>
            </WritingCell>
            <WritingCell className={styles.element82} data-node-id="67:1959" data-name="wg-cell">
              <div className={styles.before253} data-node-id="67:1960" data-name="::before">
                <div className={styles.Rectangle254} data-node-id="67:1961" data-name="Rectangle" />
                <div className={styles.Rectangle255} data-node-id="67:1962" data-name="Rectangle" />
              </div>
              <div className={styles.element256} data-node-id="67:1963" data-name="동국체: 다">
                <div className={styles.element257}>
                  <img alt="" className={styles.element123} src={img1} />
                </div>
              </div>
            </WritingCell>
          </div>
          <WritingProgress className={styles.element83} data-node-id="67:1965" total={2} />
        </div>
        <WritingTools />
      </div>
      <div className={styles.cta27} data-node-id="67:1981" data-name="cta">
        <SubmitButton className={styles.element28} />
      </div>
    </div>
  )
}
