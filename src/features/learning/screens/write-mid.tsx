import { SubmitButton } from '@/components/ui/SubmitButton'
import { Thumbnail } from '@/components/ui/Thumbnail'
import { PracticePaper } from '@/components/WritingBoard/PracticePaper'

import { WritingTools } from '@/components/WritingBoard/WritingTools'
import { StageSelector } from '@/components/ui/StageSelector'
import { AppBar } from '@/components/ui/AppBar'
import styles from '@/styles/screens.module.css'
import { Action } from '@/components/ui/Action'

const img = '/assets/figma/3d07b.png'
const imgIcon1 = '/assets/figma/199d1.svg'
const img1 = '/assets/figma/14cdb.svg'
const img2 = '/assets/figma/e08e6.svg'

export default function WriteMid() {
  return (
    <div
      className={styles.leveltest1163}
      data-node-id="67:2144"
      data-name="write-mid — 쓰기 · 중수"
    >
      <AppBar title="따라 쓰기" />
      <div className={styles.page67} data-node-id="67:2150" data-name="page">
        <div className={styles.clip299} data-node-id="67:2151" data-name="clip">
          <Thumbnail className={styles.poster300} data-node-id="67:2152" data-name="poster">
            <div className={styles.element301} data-node-id="67:2153" data-name="킹세종 얼굴">
              <img alt="" className={styles.element1} src={img} />
            </div>
            <Action
              className={styles.posterPlay302}
              data-node-id="67:2154"
              data-name="poster-play"
              kind="poster-play"
              label="poster-play"
            >
              <div className={styles.icon303} data-node-id="67:2155" data-name="icon">
                <img alt="" className={styles.element7} src={imgIcon1} />
              </div>
            </Action>
            <div className={styles.posterTime304} data-node-id="67:2157" data-name="poster-time">
              <p className={styles.element163} data-node-id="67:2158">
                0:24
              </p>
            </div>
          </Thumbnail>
          <div className={styles.div305} data-node-id="67:2159" data-name="div">
            <div className={styles.subtitle306} data-node-id="67:2160" data-name="subtitle">
              <div className={styles.mark230} data-node-id="67:2161" data-name="mark">
                <div
                  className={styles.element307}
                  data-node-id="67:2162"
                  data-name="동국체: 보고 싶었어"
                >
                  <div className={styles.element166}>
                    <img alt="" className={styles.element123} src={img1} />
                  </div>
                </div>
              </div>
              <div
                className={styles.element307}
                data-node-id="67:2168"
                data-name="동국체: 함께 걸어요"
              >
                <div className={styles.element171}>
                  <img alt="" className={styles.element123} src={img2} />
                </div>
              </div>
            </div>
            <p className={styles.element83} data-node-id="67:2174">
              하늘별 · 봄밤 편지
            </p>
          </div>
        </div>
        <div className={styles.bar235} data-node-id="67:2175" data-name="bar">
          <p className={styles.element37} data-node-id="67:2176">
            난이도
          </p>
          <StageSelector />
        </div>
        <div className={styles.task236} data-node-id="67:2184" data-name="task">
          <p className={styles.element205} data-node-id="67:2185">
            보고 싶었어
          </p>
          <p className={styles.element206} data-node-id="67:2186">
            원고지 한 칸에 한 글자씩 써요. 묶음 사이는 띄어 쓰는 자리예요.
          </p>
        </div>
        <PracticePaper count={5} columns={5} cellSize={96} groups={[2, 3]} />
        <WritingTools />
      </div>
      <div className={styles.cta27} data-node-id="67:2231" data-name="cta">
        <SubmitButton className={styles.element28} />
      </div>
    </div>
  )
}
