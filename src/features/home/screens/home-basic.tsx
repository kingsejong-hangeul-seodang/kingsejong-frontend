import { MainNavigation } from '@/components/ui/MainNavigation'
import { StageSelector } from '@/components/ui/StageSelector'
import styles from '@/styles/screens.module.css'
import { Action } from '@/components/ui/Action'

const img1 = '/assets/figma/cd9d4.png'
const img = '/assets/figma/ffde0.svg'
const imgIcon = '/assets/figma/4285a.svg'
const imgIcon1 = '/assets/figma/4a83e.svg'
const imgIcon2 = '/assets/figma/a7e7d.svg'
const imgIcon3 = '/assets/figma/7a8b5.svg'
const imgIcon4 = '/assets/figma/f651f.svg'

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

export default function HomeBasic() {
  return (
    <div
      className={styles.leveltest1163}
      data-node-id="67:1493"
      data-name="home-basic — 홈 · 기본 연습"
    >
      <div className={styles.homeHead135} data-node-id="67:1494" data-name="home-head">
        <div
          className={styles.element136}
          data-node-id="67:1495"
          data-name="동국체: 킹세종 한글서당"
        >
          <div className={styles.element137}>
            <img alt="" className={styles.element123} src={img} />
          </div>
        </div>
        <div className={styles.headRight138} data-node-id="67:1503" data-name="head-right">
          <p className={styles.element37} data-node-id="67:1504">
            난이도
          </p>
          <StageSelector />
        </div>
      </div>
      <div className={styles.page144} data-node-id="67:1512" data-name="page">
        <div className={styles.say72} data-node-id="67:1513" data-name="say">
          <div className={styles.element145} data-node-id="67:1514" data-name="킹세종">
            <img alt="" className={styles.element1} src={img1} />
          </div>
          <div className={styles.bubble74} data-node-id="67:1515" data-name="bubble">
            <div className={styles.element75} data-node-id="67:1516">
              <div className={styles.element18}>
                <div className={styles.before19} data-name="::before" />
              </div>
            </div>
            <p className={styles.element76} data-node-id="67:1517">
              동국, 오늘도 한 줄 써 볼까요?
            </p>
            <p className={styles.element77} data-node-id="67:1518">
              오늘 3개 중 1개를 썼어요. 2개만 더 쓰면 오늘 목표 달성이에요.
            </p>
          </div>
        </div>
        <div className={styles.choices112} data-node-id="67:1519" data-name="stats">
          <StudyStat className={styles.element146} />
          <Action
            className={styles.element146}
            data-node-id="67:1523"
            data-name="통계 칸"
            kind="stat"
            label="내 킹세종 보기"
          >
            <p className={styles.element25} data-node-id="I67:1523;19:264">
              레벨 · 내 킹세종 보기
            </p>
            <p className={styles.element24} data-node-id="I67:1523;19:265">
              서당 입문
            </p>
          </Action>
          <div className={styles.stat147} data-node-id="67:1526" data-name="stat">
            <p className={styles.element83} data-node-id="67:1527">
              다음 레벨까지 180 EXP
            </p>
            <p className={styles.element76} data-node-id="67:1528">
              120 / 300
            </p>
            <div className={styles.xp148} data-node-id="67:1529" data-name="xp">
              <div className={styles.span149} data-node-id="67:1530" data-name="span" />
            </div>
          </div>
        </div>
        <div className={styles.modes150} data-node-id="67:1531" data-name="modes">
          <Action
            className={styles.mode153}
            data-node-id="67:1532"
            data-name="mode"
            kind="mode"
            label="K팝"
          >
            <div className={styles.icon152} data-node-id="67:1533" data-name="icon">
              <img alt="" className={styles.element7} src={imgIcon} />
            </div>
            <p className={styles.element154} data-node-id="67:1537">
              K팝
            </p>
          </Action>
          <Action
            className={styles.mode153}
            data-node-id="67:1538"
            data-name="mode"
            kind="mode"
            label="K드라마"
          >
            <div className={styles.icon152} data-node-id="67:1539" data-name="icon">
              <img alt="" className={styles.element7} src={imgIcon1} />
            </div>
            <p className={styles.element154} data-node-id="67:1542">
              K드라마
            </p>
          </Action>
          <Action
            className={styles.mode151}
            data-node-id="67:1543"
            data-name="mode"
            kind="mode"
            label="기본 연습"
          >
            <div className={styles.icon152} data-node-id="67:1544" data-name="icon">
              <img alt="" className={styles.element7} src={imgIcon2} />
            </div>
            <p className={styles.element107} data-node-id="67:1546">
              기본 연습
            </p>
          </Action>
        </div>
        <div className={styles.block187} data-node-id="67:1547" data-name="block">
          <div className={styles.blockHead188} data-node-id="67:1548" data-name="block-head">
            <p className={styles.element76} data-node-id="67:1549">
              중수 연습
            </p>
          </div>
          <Action
            className={styles.row40}
            data-node-id="67:1550"
            data-name="row"
            kind="row"
            label="바다 보러 2어절 · 4칸"
          >
            <div className={styles.rowLead189} data-node-id="67:1551" data-name="row-lead">
              <div className={styles.icon32} data-node-id="67:1552" data-name="icon">
                <img alt="" className={styles.element7} src={imgIcon3} />
              </div>
            </div>
            <div className={styles.rowMain41} data-node-id="67:1554" data-name="row-main">
              <p className={styles.element42} data-node-id="67:1555">
                바다 보러
              </p>
              <p className={styles.element25} data-node-id="67:1556">
                2어절 · 4칸
              </p>
            </div>
            <div className={styles.rowTrail43} data-node-id="67:1557" data-name="row-trail">
              <div className={styles.icon86} data-node-id="67:1558" data-name="icon">
                <img alt="" className={styles.element7} src={imgIcon4} />
              </div>
            </div>
          </Action>
        </div>
        <p className={styles.element83} data-node-id="67:1560">
          초보는 자음·모음부터, 고수는 문장을 써요 — 위에서 단계를 바꿀 수 있어요
        </p>
      </div>
      <MainNavigation />
    </div>
  )
}
