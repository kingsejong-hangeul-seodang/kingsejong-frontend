import { SejongGuide } from '@/components/SejongGuide/SejongGuide'
import { AppBar } from '@/components/ui/AppBar'
import styles from '@/styles/screens.module.css'
import { Action } from '@/components/ui/Action'

const img = '/assets/figma/fc462.png'
const img1 = '/assets/figma/3d07b.png'
const img2 = '/assets/figma/547a2.png'

const imgIcon1 = '/assets/figma/4d822.svg'
const imgIcon2 = '/assets/figma/68c51.svg'
const img3 = '/assets/figma/8b680.svg'

export default function ModeSelect() {
  return (
    <div
      className={styles.leveltest1163}
      data-node-id="67:1184"
      data-name="mode-select — 모드 고르기"
    >
      <AppBar title="" />
      <div className={styles.page109} data-node-id="67:1189" data-name="page">
        <div className={styles.say110} data-node-id="67:1190" data-name="say">
          <SejongGuide className={styles.element15} src={img} variant="기본" />
          <div className={styles.bubble16} data-node-id="67:1193" data-name="bubble">
            <div className={styles.element111} data-node-id="67:1194">
              <div className={styles.element18}>
                <div className={styles.before19} data-name="::before" />
              </div>
            </div>
            <p className={styles.element20} data-node-id="67:1195">
              무엇으로 쓸까요?
            </p>
            <p className={styles.element21} data-node-id="67:1196">
              홈에서 언제든 바꿀 수 있어요.
            </p>
          </div>
        </div>
        <div className={styles.choices112} data-node-id="67:1197" data-name="choices">
          <Action
            className={styles.choice113}
            data-node-id="67:1198"
            data-name="choice"
            kind="choice"
            label="K팝으로 좋아하는 노래 가사"
          >
            <div className={styles.poster114} data-node-id="67:1199" data-name="poster">
              <div className={styles.element115} data-node-id="67:1200" data-name="킹세종 얼굴">
                <img alt="" className={styles.element1} src={img1} />
              </div>
              <div className={styles.icon116} data-node-id="67:1201" data-name="icon">
                <img alt="" className={styles.element7} src={imgIcon1} />
              </div>
            </div>
            <p className={styles.element76} data-node-id="67:1205">
              K팝으로
            </p>
            <p className={styles.element83} data-node-id="67:1206">
              좋아하는 노래 가사
            </p>
          </Action>
          <Action
            className={styles.choice117}
            data-node-id="67:1207"
            data-name="choice"
            kind="choice"
            label="K드라마로 드라마 명대사"
          >
            <div className={styles.poster118} data-node-id="67:1208" data-name="poster">
              <div className={styles.element119} data-node-id="67:1209" data-name="킹세종 얼굴">
                <img alt="" className={styles.element1} src={img2} />
              </div>
              <div className={styles.icon116} data-node-id="67:1210" data-name="icon">
                <img alt="" className={styles.element7} src={imgIcon2} />
              </div>
            </div>
            <p className={styles.element76} data-node-id="67:1213">
              K드라마로
            </p>
            <p className={styles.element83} data-node-id="67:1214">
              드라마 명대사
            </p>
          </Action>
          <Action
            className={styles.choice117}
            data-node-id="67:1215"
            data-name="choice"
            kind="choice"
            label="가 기본 연습 자음·모음·단어·문장"
          >
            <div className={styles.poster120} data-node-id="67:1216" data-name="poster">
              <div className={styles.element121} data-node-id="67:1217" data-name="동국체: 가">
                <div className={styles.element122}>
                  <img alt="" className={styles.element123} src={img3} />
                </div>
              </div>
            </div>
            <p className={styles.element76} data-node-id="67:1219">
              기본 연습
            </p>
            <p className={styles.element83} data-node-id="67:1220">
              자음·모음·단어·문장
            </p>
          </Action>
        </div>
      </div>
      <div className={styles.cta27} data-node-id="67:1221" data-name="cta">
        <Action
          className={styles.element28}
          data-node-id="67:1222"
          data-name="버튼/주"
          kind="버튼/주"
          label="다음"
        >
          <p className={styles.element29} data-node-id="I67:1222;19:41">
            다음
          </p>
        </Action>
      </div>
    </div>
  )
}
