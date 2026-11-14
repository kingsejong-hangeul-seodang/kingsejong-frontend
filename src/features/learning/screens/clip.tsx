import { StageSelector } from '@/components/ui/StageSelector'
import { AppBar } from '@/components/ui/AppBar'
import styles from '@/styles/screens.module.css'
import { Action } from '@/components/ui/Action'

const img = '/assets/figma/3d07b.png'

const imgIcon1 = '/assets/figma/daefb.svg'
const img1 = '/assets/figma/7d348.svg'
const img2 = '/assets/figma/f92bb.svg'

export default function Clip() {
  return (
    <div className={styles.leveltest1163} data-node-id="67:1817" data-name="clip — 클립 보기">
      <AppBar title="클립 보기" />
      <div className={styles.page67} data-node-id="67:1823" data-name="page">
        <div className={styles.clip224} data-node-id="67:1824" data-name="clip">
          <div className={styles.poster225} data-node-id="67:1825" data-name="poster">
            <div className={styles.element226} data-node-id="67:1826" data-name="킹세종 얼굴">
              <img alt="" className={styles.element1} src={img} />
            </div>
            <Action
              className={styles.posterPlay227}
              data-node-id="67:1827"
              data-name="poster-play"
              kind="poster-play"
              label="poster-play"
            >
              <div className={styles.icon161} data-node-id="67:1828" data-name="icon">
                <img alt="" className={styles.element7} src={imgIcon1} />
              </div>
            </Action>
            <div className={styles.posterTime228} data-node-id="67:1830" data-name="poster-time">
              <p className={styles.element163} data-node-id="67:1831">
                0:24
              </p>
            </div>
          </div>
          <div className={styles.subtitle229} data-node-id="67:1832" data-name="subtitle">
            <div className={styles.mark230} data-node-id="67:1833" data-name="mark">
              <div
                className={styles.element231}
                data-node-id="67:1834"
                data-name="동국체: 보고 싶었어"
              >
                <div className={styles.element232}>
                  <img alt="" className={styles.element123} src={img1} />
                </div>
              </div>
            </div>
            <div
              className={styles.element231}
              data-node-id="67:1840"
              data-name="동국체: 함께 걸어요"
            >
              <div className={styles.element233}>
                <img alt="" className={styles.element123} src={img2} />
              </div>
            </div>
          </div>
          <div className={styles.source234} data-node-id="67:1846" data-name="source">
            <p className={styles.element197} data-node-id="67:1847">
              하늘별 · 봄밤 편지
            </p>
          </div>
        </div>
        <div className={styles.block88} data-node-id="67:1848" data-name="block">
          <div className={styles.blockHead188} data-node-id="67:1849" data-name="block-head">
            <p className={styles.element76} data-node-id="67:1850">
              뜻
            </p>
          </div>
          <p
            className={styles.element77}
            data-node-id="67:1851"
          >{`I missed you — let's walk together`}</p>
          <p className={styles.element83} data-node-id="67:1852">
            하늘별이 부르는 ‘봄밤 편지’의 한 줄이에요.
          </p>
        </div>
        <div className={styles.bar235} data-node-id="67:1853" data-name="bar">
          <p className={styles.element37} data-node-id="67:1854">
            난이도
          </p>
          <StageSelector />
        </div>
        <div className={styles.task236} data-node-id="67:1862" data-name="task">
          <p className={styles.element206} data-node-id="67:1863">
            지금 단계에서 쓸 글
          </p>
          <p className={styles.element205} data-node-id="67:1864">
            보고 싶었어
          </p>
        </div>
      </div>
      <div className={styles.cta27} data-node-id="67:1865" data-name="cta">
        <Action
          className={styles.element28}
          data-node-id="67:1866"
          data-name="버튼/주"
          kind="버튼/주"
          label="따라 쓰기"
        >
          <p className={styles.element29} data-node-id="I67:1866;19:41">
            따라 쓰기
          </p>
        </Action>
      </div>
    </div>
  )
}
