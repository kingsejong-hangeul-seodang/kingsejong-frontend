import { WritingProgress } from '@/components/WritingBoard/WritingProgress'
import { WritingTools } from '@/components/WritingBoard/WritingTools'
import { StageSelector } from '@/components/ui/StageSelector'
import { AppBar } from '@/components/ui/AppBar'
import styles from '@/styles/screens.module.css'
import { Action } from '@/components/ui/Action'
import { WritingCell } from '@/components/WritingBoard/WritingCell'

const img = '/assets/figma/547a2.png'
const imgIcon1 = '/assets/figma/199d1.svg'
const img1 = '/assets/figma/77362.svg'
const img2 = '/assets/figma/71271.svg'
const img3 = '/assets/figma/241a2.svg'
const img4 = '/assets/figma/d3f2b.svg'
const img5 = '/assets/figma/13f19.svg'
const img6 = '/assets/figma/46534.svg'
const img7 = '/assets/figma/5ab81.svg'

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
          <div className={styles.poster323} data-node-id="67:2414" data-name="poster">
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
          </div>
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
        <div className={styles.wongoji78} data-node-id="67:2443" data-name="wongoji">
          <div className={styles.wgRows334} data-node-id="67:2444" data-name="wg-rows">
            <div className={styles.wgRow97} data-node-id="67:2445" data-name="wg-row">
              <WritingCell
                className={styles.element98}
                data-node-id="67:2446"
                data-name="원고지 칸/쓴 글씨"
              >
                <div
                  className={styles.before60}
                  data-node-id="I67:2446;19:107"
                  data-name="::before"
                >
                  <div
                    className={styles.Rectangle61}
                    data-node-id="I67:2446;19:108"
                    data-name="Rectangle"
                  />
                  <div
                    className={styles.Rectangle62}
                    data-node-id="I67:2446;19:109"
                    data-name="Rectangle"
                  />
                </div>
                <p className={styles.element95} data-node-id="I67:2446;19:110">
                  나
                </p>
              </WritingCell>
              <WritingCell
                className={styles.element98}
                data-node-id="67:2451"
                data-name="원고지 칸/쓴 글씨"
              >
                <div
                  className={styles.before60}
                  data-node-id="I67:2451;19:107"
                  data-name="::before"
                >
                  <div
                    className={styles.Rectangle61}
                    data-node-id="I67:2451;19:108"
                    data-name="Rectangle"
                  />
                  <div
                    className={styles.Rectangle62}
                    data-node-id="I67:2451;19:109"
                    data-name="Rectangle"
                  />
                </div>
                <p className={styles.element95} data-node-id="I67:2451;19:110">
                  너
                </p>
              </WritingCell>
              <EmptyCell className={styles.element98} />
              <WritingCell
                className={styles.element98}
                data-node-id="67:2460"
                data-name="원고지 칸/쓴 글씨"
              >
                <div
                  className={styles.before60}
                  data-node-id="I67:2460;19:107"
                  data-name="::before"
                >
                  <div
                    className={styles.Rectangle61}
                    data-node-id="I67:2460;19:108"
                    data-name="Rectangle"
                  />
                  <div
                    className={styles.Rectangle62}
                    data-node-id="I67:2460;19:109"
                    data-name="Rectangle"
                  />
                </div>
                <p className={styles.element95} data-node-id="I67:2460;19:110">
                  좋
                </p>
              </WritingCell>
              <WritingCell
                className={styles.element98}
                data-node-id="67:2465"
                data-name="원고지 칸/쓴 글씨"
              >
                <div
                  className={styles.before60}
                  data-node-id="I67:2465;19:107"
                  data-name="::before"
                >
                  <div
                    className={styles.Rectangle61}
                    data-node-id="I67:2465;19:108"
                    data-name="Rectangle"
                  />
                  <div
                    className={styles.Rectangle62}
                    data-node-id="I67:2465;19:109"
                    data-name="Rectangle"
                  />
                </div>
                <p className={styles.element95} data-node-id="I67:2465;19:110">
                  아
                </p>
              </WritingCell>
              <WritingCell
                className={styles.element98}
                data-node-id="67:2470"
                data-name="원고지 칸/쓴 글씨"
              >
                <div
                  className={styles.before60}
                  data-node-id="I67:2470;19:107"
                  data-name="::before"
                >
                  <div
                    className={styles.Rectangle61}
                    data-node-id="I67:2470;19:108"
                    data-name="Rectangle"
                  />
                  <div
                    className={styles.Rectangle62}
                    data-node-id="I67:2470;19:109"
                    data-name="Rectangle"
                  />
                </div>
                <p className={styles.element95} data-node-id="I67:2470;19:110">
                  하
                </p>
              </WritingCell>
              <WritingCell
                className={styles.element98}
                data-node-id="67:2475"
                data-name="원고지 칸/쓴 글씨"
              >
                <div
                  className={styles.before60}
                  data-node-id="I67:2475;19:107"
                  data-name="::before"
                >
                  <div
                    className={styles.Rectangle61}
                    data-node-id="I67:2475;19:108"
                    data-name="Rectangle"
                  />
                  <div
                    className={styles.Rectangle62}
                    data-node-id="I67:2475;19:109"
                    data-name="Rectangle"
                  />
                </div>
                <p className={styles.element95} data-node-id="I67:2475;19:110">
                  냐
                </p>
              </WritingCell>
              <WritingCell
                className={styles.element98}
                data-node-id="67:2480"
                data-name="원고지 칸/쓴 글씨"
              >
                <div
                  className={styles.before60}
                  data-node-id="I67:2480;19:107"
                  data-name="::before"
                >
                  <div
                    className={styles.Rectangle61}
                    data-node-id="I67:2480;19:108"
                    data-name="Rectangle"
                  />
                  <div
                    className={styles.Rectangle62}
                    data-node-id="I67:2480;19:109"
                    data-name="Rectangle"
                  />
                </div>
                <p className={styles.element95} data-node-id="I67:2480;19:110">
                  ?
                </p>
              </WritingCell>
              <EmptyCell className={styles.element98} />
              <EmptyCell className={styles.element99} />
            </div>
            <div className={styles.wgRow97} data-node-id="67:2493" data-name="wg-row">
              <EmptyCell className={styles.element99} />
            </div>
          </div>
          <WritingProgress className={styles.element83} data-node-id="67:2498" total={11} />
        </div>
        <WritingTools />
      </div>
      <div className={styles.cta27} data-node-id="67:2514" data-name="cta">
        <SubmitButton className={styles.element28} />
      </div>
    </div>
  )
}
