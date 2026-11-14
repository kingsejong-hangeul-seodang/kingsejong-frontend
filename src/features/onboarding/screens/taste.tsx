import { SejongGuide } from '@/components/SejongGuide/SejongGuide'
import { AppBar } from '@/components/ui/AppBar'
import styles from '@/styles/screens.module.css'
import { Action } from '@/components/ui/Action'

const img = '/assets/figma/fc462.png'
const img1 = '/assets/figma/3d07b.png'
const img2 = '/assets/figma/01084.png'

const imgIcon1 = '/assets/figma/4d822.svg'

export default function Taste() {
  return (
    <div className={styles.leveltest1163} data-node-id="67:1224" data-name="taste — 좋아하는 가수">
      <AppBar title="" />
      <div className={styles.page109} data-node-id="67:1229" data-name="page">
        <div className={styles.say110} data-node-id="67:1230" data-name="say">
          <SejongGuide className={styles.element15} src={img} variant="기본" />
          <div className={styles.bubble16} data-node-id="67:1233" data-name="bubble">
            <div className={styles.element124} data-node-id="67:1234">
              <div className={styles.element18}>
                <div className={styles.before19} data-name="::before" />
              </div>
            </div>
            <p className={styles.element20} data-node-id="67:1235">
              좋아하는 가수를 골라 주세요
            </p>
            <p className={styles.element21} data-node-id="67:1236">
              고른 가수의 노래를 먼저 보여 드려요.
            </p>
          </div>
        </div>
        <div className={styles.choices112} data-node-id="67:1237" data-name="choices">
          <Action
            className={styles.choice125}
            data-node-id="67:1238"
            data-name="choice"
            kind="choice"
            label="하늘별 봄밤 편지"
          >
            <div className={styles.poster126} data-node-id="67:1239" data-name="poster">
              <div className={styles.element127} data-node-id="67:1240" data-name="킹세종 얼굴">
                <img alt="" className={styles.element1} src={img1} />
              </div>
              <div className={styles.icon128} data-node-id="67:1241" data-name="icon">
                <img alt="" className={styles.element7} src={imgIcon1} />
              </div>
            </div>
            <p className={styles.element76} data-node-id="67:1245">
              하늘별
            </p>
            <p className={styles.element83} data-node-id="67:1246">
              봄밤 편지
            </p>
          </Action>
          <Action
            className={styles.choice129}
            data-node-id="67:1247"
            data-name="choice"
            kind="choice"
            label="루나틱 달빛 약속"
          >
            <div className={styles.poster130} data-node-id="67:1248" data-name="poster">
              <div className={styles.element131} data-node-id="67:1249" data-name="킹세종 얼굴">
                <img alt="" className={styles.element1} src={img2} />
              </div>
              <div className={styles.icon128} data-node-id="67:1250" data-name="icon">
                <img alt="" className={styles.element7} src={imgIcon1} />
              </div>
            </div>
            <p className={styles.element76} data-node-id="67:1254">
              루나틱
            </p>
            <p className={styles.element83} data-node-id="67:1255">
              달빛 약속
            </p>
          </Action>
        </div>
      </div>
      <div className={styles.cta27} data-node-id="67:1256" data-name="cta">
        <Action
          className={styles.element28}
          data-node-id="67:1257"
          data-name="버튼/주"
          kind="버튼/주"
          label="서당 들어가기"
        >
          <p className={styles.element29} data-node-id="I67:1257;19:41">
            서당 들어가기
          </p>
        </Action>
      </div>
    </div>
  )
}
