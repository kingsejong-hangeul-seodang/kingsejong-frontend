import { WritingProgress } from '@/components/WritingBoard/WritingProgress'
import { WritingTools } from '@/components/WritingBoard/WritingTools'
import { StageSelector } from '@/components/ui/StageSelector'
import { AppBar } from '@/components/ui/AppBar'
import styles from '@/styles/screens.module.css'
import { Action } from '@/components/ui/Action'
import { WritingCell } from '@/components/WritingBoard/WritingCell'

const img = '/assets/figma/3d07b.png'
const imgIcon1 = '/assets/figma/199d1.svg'
const img1 = '/assets/figma/14cdb.svg'
const img2 = '/assets/figma/e08e6.svg'

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

function EmptyCell({ className }: { className?: string | undefined }) {
  return (
    <WritingCell
      className={className || styles.element59}
      data-node-id="19:372"
      data-name="원고지 칸/빈 칸"
    >
      <div className={styles.before60} data-node-id="19:102" data-name="::before">
        <div className={styles.Rectangle61} data-node-id="19:103" data-name="Rectangle" />
        <div className={styles.Rectangle62} data-node-id="19:104" data-name="Rectangle" />
      </div>
    </WritingCell>
  )
}

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
          <div className={styles.poster300} data-node-id="67:2152" data-name="poster">
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
          </div>
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
        <div className={styles.wongoji78} data-node-id="67:2187" data-name="wongoji">
          <div className={styles.wgRow244} data-node-id="67:2188" data-name="wg-row">
            <div className={styles.wgWord245} data-node-id="67:2189" data-name="wg-word">
              <WritingCell
                className={styles.element246}
                data-node-id="67:2190"
                data-name="원고지 칸/쓴 글씨"
              >
                <div
                  className={styles.before60}
                  data-node-id="I67:2190;19:107"
                  data-name="::before"
                >
                  <div
                    className={styles.Rectangle61}
                    data-node-id="I67:2190;19:108"
                    data-name="Rectangle"
                  />
                  <div
                    className={styles.Rectangle62}
                    data-node-id="I67:2190;19:109"
                    data-name="Rectangle"
                  />
                </div>
                <p className={styles.element247} data-node-id="I67:2190;19:110">
                  보
                </p>
              </WritingCell>
              <WritingCell
                className={styles.element248}
                data-node-id="67:2195"
                data-name="원고지 칸/쓴 글씨"
              >
                <div
                  className={styles.before60}
                  data-node-id="I67:2195;19:107"
                  data-name="::before"
                >
                  <div
                    className={styles.Rectangle61}
                    data-node-id="I67:2195;19:108"
                    data-name="Rectangle"
                  />
                  <div
                    className={styles.Rectangle62}
                    data-node-id="I67:2195;19:109"
                    data-name="Rectangle"
                  />
                </div>
                <p className={styles.element247} data-node-id="I67:2195;19:110">
                  고
                </p>
              </WritingCell>
            </div>
            <div className={styles.wgWord245} data-node-id="67:2200" data-name="wg-word">
              <WritingCell
                className={styles.element246}
                data-node-id="67:2201"
                data-name="원고지 칸/쓴 글씨"
              >
                <div
                  className={styles.before60}
                  data-node-id="I67:2201;19:107"
                  data-name="::before"
                >
                  <div
                    className={styles.Rectangle61}
                    data-node-id="I67:2201;19:108"
                    data-name="Rectangle"
                  />
                  <div
                    className={styles.Rectangle62}
                    data-node-id="I67:2201;19:109"
                    data-name="Rectangle"
                  />
                </div>
                <p className={styles.element247} data-node-id="I67:2201;19:110">
                  십
                </p>
              </WritingCell>
              <WritingCell
                className={styles.element246}
                data-node-id="67:2206"
                data-name="원고지 칸/쓴 글씨"
              >
                <div
                  className={styles.before60}
                  data-node-id="I67:2206;19:107"
                  data-name="::before"
                >
                  <div
                    className={styles.Rectangle61}
                    data-node-id="I67:2206;19:108"
                    data-name="Rectangle"
                  />
                  <div
                    className={styles.Rectangle62}
                    data-node-id="I67:2206;19:109"
                    data-name="Rectangle"
                  />
                </div>
                <p className={styles.element247} data-node-id="I67:2206;19:110">
                  었
                </p>
              </WritingCell>
              <EmptyCell className={styles.element248} />
            </div>
          </div>
          <WritingProgress className={styles.element83} data-node-id="67:2215" total={5} />
        </div>
        <WritingTools />
      </div>
      <div className={styles.cta27} data-node-id="67:2231" data-name="cta">
        <SubmitButton className={styles.element28} />
      </div>
    </div>
  )
}
