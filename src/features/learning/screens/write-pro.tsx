import { SubmitButton } from '@/components/ui/SubmitButton'
import { Thumbnail } from '@/components/ui/Thumbnail'
import { PracticePaper } from '@/components/WritingBoard/PracticePaper'

import { WritingTools } from '@/components/WritingBoard/WritingTools'
import { StageSelector } from '@/components/ui/StageSelector'
import { AppBar } from '@/components/ui/AppBar'
import styles from '@/styles/screens.module.css'
import { Action } from '@/components/ui/Action'

const img = '/assets/figma/547a2.png'
const imgIcon1 = '/assets/figma/199d1.svg'
const img1 = '/assets/figma/77362.svg'
const img2 = '/assets/figma/71271.svg'
const img3 = '/assets/figma/241a2.svg'
const img4 = '/assets/figma/d3f2b.svg'
const img5 = '/assets/figma/13f19.svg'
const img6 = '/assets/figma/46534.svg'
const img7 = '/assets/figma/5ab81.svg'

export default function WritePro() {
  return (
    <div
      className={styles.leveltest1163}
      data-node-id="67:2406"
      data-name="write-pro — 쓰기 · 고수"
    >
      <AppBar title="따라 쓰기" />
      <div className={styles.page67} data-node-id="67:2412" data-name="page">
        <div className={styles.clip299} data-node-id="67:2413" data-name="clip">
          <Thumbnail className={styles.poster323} data-node-id="67:2414" data-name="poster">
            <div className={styles.element324} data-node-id="67:2415" data-name="킹세종 얼굴">
              <img alt="" className={styles.element1} src={img} />
            </div>
            <Action
              className={styles.posterPlay302}
              data-node-id="67:2416"
              data-name="poster-play"
              kind="poster-play"
              label="poster-play"
            >
              <div className={styles.icon303} data-node-id="67:2417" data-name="icon">
                <img alt="" className={styles.element7} src={imgIcon1} />
              </div>
            </Action>
            <div className={styles.posterTime325} data-node-id="67:2419" data-name="poster-time">
              <p className={styles.element163} data-node-id="67:2420">
                0:21
              </p>
            </div>
          </Thumbnail>
          <div className={styles.div326} data-node-id="67:2421" data-name="div">
            <div
              className={styles.element5}
              data-node-id="67:2422"
              data-name="동국체: 나 너 좋아하냐?"
            >
              <div className={styles.element327} data-node-id="67:2423" data-name="나">
                <img alt="" className={styles.element7} src={img1} />
              </div>
              <div className={styles.element328} data-node-id="67:2424" data-name="너">
                <img alt="" className={styles.element7} src={img2} />
              </div>
              <div className={styles.element329} data-node-id="67:2425" data-name="좋">
                <img alt="" className={styles.element7} src={img3} />
              </div>
              <div className={styles.element330} data-node-id="67:2426" data-name="아">
                <img alt="" className={styles.element7} src={img4} />
              </div>
              <div className={styles.element331} data-node-id="67:2427" data-name="하">
                <img alt="" className={styles.element7} src={img5} />
              </div>
              <div className={styles.element332} data-node-id="67:2428" data-name="냐">
                <img alt="" className={styles.element7} src={img6} />
              </div>
              <div className={styles.element333} data-node-id="67:2429" data-name="?">
                <img alt="" className={styles.element7} src={img7} />
              </div>
            </div>
            <p className={styles.element83} data-node-id="67:2430">
              서당의 봄 · 3화
            </p>
          </div>
        </div>
        <div className={styles.bar235} data-node-id="67:2431" data-name="bar">
          <p className={styles.element37} data-node-id="67:2432">
            난이도
          </p>
          <StageSelector />
        </div>
        <div className={styles.task236} data-node-id="67:2440" data-name="task">
          <p className={styles.element205} data-node-id="67:2441">
            들은 문장을 써 보세요
          </p>
          <p className={styles.element206} data-node-id="67:2442">
            띄어 쓸 자리는 한 칸 비워요
          </p>
        </div>
        <PracticePaper count={9} columns={9} cellSize={72} />
        <WritingTools />
      </div>
      <div className={styles.cta27} data-node-id="67:2514" data-name="cta">
        <SubmitButton className={styles.element28} />
      </div>
    </div>
  )
}
