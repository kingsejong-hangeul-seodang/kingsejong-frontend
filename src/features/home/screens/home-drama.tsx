import { MainNavigation } from '@/components/ui/MainNavigation'
import { StageSelector } from '@/components/ui/StageSelector'
import styles from '@/styles/screens.module.css'
import { Action } from '@/components/ui/Action'

const img1 = '/assets/figma/cd9d4.png'
const img2 = '/assets/figma/547a2.png'
const img4 = '/assets/figma/8aa02.png'
const img = '/assets/figma/ffde0.svg'
const imgIcon = '/assets/figma/4285a.svg'
const imgIcon1 = '/assets/figma/a6836.svg'
const imgIcon2 = '/assets/figma/37e74.svg'
const imgIcon3 = '/assets/figma/daefb.svg'
const img3 = '/assets/figma/ecdca.svg'
const img5 = '/assets/figma/6dbb3.svg'

function StudyStat({ className }: { className?: string | undefined }) {
  return (
    <div className={className || styles.element134} data-node-id="19:393" data-name="통계 칸">
      <p className={styles.element25} data-node-id="19:264">
        연속 학습
      </p>
      <p className={styles.element24} data-node-id="19:265">
        3일째
      </p>
    </div>
  )
}

export default function HomeDramaK() {
  return (
    <div
      className={styles.leveltest1163}
      data-node-id="67:1388"
      data-name="home-drama — 홈 · K드라마"
    >
      <div className={styles.homeHead135} data-node-id="67:1389" data-name="home-head">
        <div
          className={styles.element136}
          data-node-id="67:1390"
          data-name="동국체: 킹세종 한글서당"
        >
          <div className={styles.element137}>
            <img alt="" className={styles.element123} src={img} />
          </div>
        </div>
        <div className={styles.headRight138} data-node-id="67:1398" data-name="head-right">
          <p className={styles.element37} data-node-id="67:1399">
            난이도
          </p>
          <StageSelector />
        </div>
      </div>
      <div className={styles.page144} data-node-id="67:1407" data-name="page">
        <div className={styles.say72} data-node-id="67:1408" data-name="say">
          <div className={styles.element145} data-node-id="67:1409" data-name="킹세종">
            <img alt="" className={styles.element1} src={img1} />
          </div>
          <div className={styles.bubble74} data-node-id="67:1410" data-name="bubble">
            <div className={styles.element75} data-node-id="67:1411">
              <div className={styles.element18}>
                <div className={styles.before19} data-name="::before" />
              </div>
            </div>
            <p className={styles.element76} data-node-id="67:1412">
              동국, 오늘도 한 줄 써 볼까요?
            </p>
            <p className={styles.element77} data-node-id="67:1413">
              오늘 3개 중 1개를 썼어요. 2개만 더 쓰면 오늘 목표 달성이에요.
            </p>
          </div>
        </div>
        <div className={styles.choices112} data-node-id="67:1414" data-name="stats">
          <StudyStat className={styles.element146} />
          <Action
            className={styles.element146}
            data-node-id="67:1418"
            data-name="통계 칸"
            kind="stat"
            label="내 킹세종 보기"
          >
            <p className={styles.element25} data-node-id="I67:1418;19:264">
              레벨 · 내 킹세종 보기
            </p>
            <p className={styles.element24} data-node-id="I67:1418;19:265">
              서당 입문
            </p>
          </Action>
          <div className={styles.stat147} data-node-id="67:1421" data-name="stat">
            <p className={styles.element83} data-node-id="67:1422">
              다음 레벨까지 180 EXP
            </p>
            <p className={styles.element76} data-node-id="67:1423">
              120 / 300
            </p>
            <div className={styles.xp148} data-node-id="67:1424" data-name="xp">
              <div className={styles.span149} data-node-id="67:1425" data-name="span" />
            </div>
          </div>
        </div>
        <div className={styles.modes150} data-node-id="67:1426" data-name="modes">
          <Action
            className={styles.mode153}
            data-node-id="67:1427"
            data-name="mode"
            kind="mode"
            label="K팝"
          >
            <div className={styles.icon152} data-node-id="67:1428" data-name="icon">
              <img alt="" className={styles.element7} src={imgIcon} />
            </div>
            <p className={styles.element154} data-node-id="67:1432">
              K팝
            </p>
          </Action>
          <Action
            className={styles.mode151}
            data-node-id="67:1433"
            data-name="mode"
            kind="mode"
            label="K드라마"
          >
            <div className={styles.icon152} data-node-id="67:1434" data-name="icon">
              <img alt="" className={styles.element7} src={imgIcon1} />
            </div>
            <p className={styles.element107} data-node-id="67:1437">
              K드라마
            </p>
          </Action>
          <Action
            className={styles.mode153}
            data-node-id="67:1438"
            data-name="mode"
            kind="mode"
            label="기본 연습"
          >
            <div className={styles.icon152} data-node-id="67:1439" data-name="icon">
              <img alt="" className={styles.element7} src={imgIcon2} />
            </div>
            <p className={styles.element154} data-node-id="67:1441">
              기본 연습
            </p>
          </Action>
        </div>
        <div className={styles.cards155} data-node-id="67:1442" data-name="cards">
          <Action
            className={styles.cCard176}
            data-node-id="67:1443"
            data-name="c-card"
            kind="c-card"
            label="나 너 0:21 서당의 봄 · 3화 · 2칸"
          >
            <div className={styles.poster177} data-node-id="67:1444" data-name="poster">
              <div className={styles.element178} data-node-id="67:1445" data-name="킹세종 얼굴">
                <img alt="" className={styles.element1} src={img2} />
              </div>
              <div className={styles.posterPlay179} data-node-id="67:1446" data-name="poster-play">
                <div className={styles.icon161} data-node-id="67:1447" data-name="icon">
                  <img alt="" className={styles.element7} src={imgIcon3} />
                </div>
              </div>
              <div className={styles.posterTime180} data-node-id="67:1449" data-name="poster-time">
                <p className={styles.element163} data-node-id="67:1450">
                  0:21
                </p>
              </div>
            </div>
            <div className={styles.cBody164} data-node-id="67:1451" data-name="c-body">
              <div className={styles.element181} data-node-id="67:1452" data-name="동국체: 나 너">
                <img alt="" className={styles.element7} src={img3} />
              </div>
              <p className={styles.element83} data-node-id="67:1455">
                서당의 봄 · 3화 · 2칸
              </p>
            </div>
          </Action>
          <Action
            className={styles.cCard176}
            data-node-id="67:1456"
            data-name="c-card"
            kind="c-card"
            label="밥은 먹고 0:16 한강 로맨스 · 1화 · 4칸"
          >
            <div className={styles.poster182} data-node-id="67:1457" data-name="poster">
              <div className={styles.element183} data-node-id="67:1458" data-name="킹세종 얼굴">
                <img alt="" className={styles.element1} src={img4} />
              </div>
              <div className={styles.posterPlay179} data-node-id="67:1459" data-name="poster-play">
                <div className={styles.icon161} data-node-id="67:1460" data-name="icon">
                  <img alt="" className={styles.element7} src={imgIcon3} />
                </div>
              </div>
              <div className={styles.posterTime184} data-node-id="67:1462" data-name="poster-time">
                <p className={styles.element163} data-node-id="67:1463">
                  0:16
                </p>
              </div>
            </div>
            <div className={styles.cBody164} data-node-id="67:1464" data-name="c-body">
              <div
                className={styles.element185}
                data-node-id="67:1465"
                data-name="동국체: 밥은 먹고"
              >
                <div className={styles.element186}>
                  <img alt="" className={styles.element123} src={img5} />
                </div>
              </div>
              <p className={styles.element83} data-node-id="67:1470">
                한강 로맨스 · 1화 · 4칸
              </p>
            </div>
          </Action>
        </div>
      </div>
      <MainNavigation />
    </div>
  )
}
