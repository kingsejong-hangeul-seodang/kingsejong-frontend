import { MainNavigation } from '@/components/ui/MainNavigation'
import { StageSelector } from '@/components/ui/StageSelector'
import styles from '@/styles/screens.module.css'
import { Action } from '@/components/ui/Action'

const img1 = '/assets/figma/1f5e2.png'
const img2 = '/assets/figma/3d07b.png'
const img4 = '/assets/figma/01084.png'
const img = '/assets/figma/ffde0.svg'
const imgIcon = '/assets/figma/3fbea.svg'
const imgIcon1 = '/assets/figma/4a83e.svg'
const imgIcon2 = '/assets/figma/37e74.svg'
const imgIcon3 = '/assets/figma/daefb.svg'
const img3 = '/assets/figma/36dd5.svg'
const img5 = '/assets/figma/74027.svg'
const img6 = '/assets/figma/79f2b.svg'

function BrandBadge({ className }: { className?: string | undefined }) {
  return (
    <div className={className || styles.element132} data-node-id="19:365" data-name="배지/브랜드">
      <p className={styles.element133} data-node-id="19:61">
        고른 가수
      </p>
    </div>
  )
}

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

export default function HomeLv2() {
  return (
    <div
      className={styles.leveltest1163}
      data-node-id="67:1613"
      data-name="home-lv2 — 홈 · 레벨 업 뒤"
    >
      <div className={styles.homeHead135} data-node-id="67:1614" data-name="home-head">
        <div
          className={styles.element136}
          data-node-id="67:1615"
          data-name="동국체: 킹세종 한글서당"
        >
          <div className={styles.element137}>
            <img alt="" className={styles.element123} src={img} />
          </div>
        </div>
        <div className={styles.headRight138} data-node-id="67:1623" data-name="head-right">
          <p className={styles.element37} data-node-id="67:1624">
            난이도
          </p>
          <StageSelector />
        </div>
      </div>
      <div className={styles.page144} data-node-id="67:1632" data-name="page">
        <div className={styles.say72} data-node-id="67:1633" data-name="say">
          <div className={styles.element202} data-node-id="67:1634" data-name="킹세종">
            <img alt="" className={styles.element1} src={img1} />
          </div>
          <div className={styles.bubble74} data-node-id="67:1635" data-name="bubble">
            <div className={styles.element75} data-node-id="67:1636">
              <div className={styles.element18}>
                <div className={styles.before19} data-name="::before" />
              </div>
            </div>
            <p className={styles.element76} data-node-id="67:1637">
              성균관 유생 동국, 오늘도 써 볼까요?
            </p>
            <p className={styles.element77} data-node-id="67:1638">
              오늘 3개 중 1개를 썼어요. 2개만 더 쓰면 오늘 목표 달성이에요.
            </p>
          </div>
        </div>
        <div className={styles.choices112} data-node-id="67:1639" data-name="stats">
          <StudyStat className={styles.element146} />
          <Action
            className={styles.element146}
            data-node-id="67:1643"
            data-name="통계 칸"
            kind="stat"
            label="내 킹세종 보기"
          >
            <p className={styles.element25} data-node-id="I67:1643;19:264">
              레벨 · 내 킹세종 보기
            </p>
            <p className={styles.element24} data-node-id="I67:1643;19:265">
              성균관 유생
            </p>
          </Action>
          <div className={styles.stat147} data-node-id="67:1646" data-name="stat">
            <p className={styles.element83} data-node-id="67:1647">
              다음 레벨까지 500 EXP
            </p>
            <p className={styles.element76} data-node-id="67:1648">
              300 / 800
            </p>
            <div className={styles.xp148} data-node-id="67:1649" data-name="xp">
              <div className={styles.span203} data-node-id="67:1650" data-name="span" />
            </div>
          </div>
        </div>
        <div className={styles.modes150} data-node-id="67:1651" data-name="modes">
          <Action
            className={styles.mode151}
            data-node-id="67:1652"
            data-name="mode"
            kind="mode"
            label="K팝"
          >
            <div className={styles.icon152} data-node-id="67:1653" data-name="icon">
              <img alt="" className={styles.element7} src={imgIcon} />
            </div>
            <p className={styles.element107} data-node-id="67:1657">
              K팝
            </p>
          </Action>
          <Action
            className={styles.mode153}
            data-node-id="67:1658"
            data-name="mode"
            kind="mode"
            label="K드라마"
          >
            <div className={styles.icon152} data-node-id="67:1659" data-name="icon">
              <img alt="" className={styles.element7} src={imgIcon1} />
            </div>
            <p className={styles.element154} data-node-id="67:1662">
              K드라마
            </p>
          </Action>
          <Action
            className={styles.mode153}
            data-node-id="67:1663"
            data-name="mode"
            kind="mode"
            label="기본 연습"
          >
            <div className={styles.icon152} data-node-id="67:1664" data-name="icon">
              <img alt="" className={styles.element7} src={imgIcon2} />
            </div>
            <p className={styles.element154} data-node-id="67:1666">
              기본 연습
            </p>
          </Action>
        </div>
        <div className={styles.cards155} data-node-id="67:1667" data-name="cards">
          <Action
            className={styles.cCard156}
            data-node-id="67:1668"
            data-name="c-card"
            kind="c-card"
            label="보고 싶었어 0:24 하늘별 · 봄밤 편지 · 5칸"
          >
            <div className={styles.poster157} data-node-id="67:1669" data-name="poster">
              <div className={styles.element158} data-node-id="67:1670" data-name="킹세종 얼굴">
                <img alt="" className={styles.element1} src={img2} />
              </div>
              <BrandBadge className={styles.element159} />
              <div className={styles.posterPlay160} data-node-id="67:1673" data-name="poster-play">
                <div className={styles.icon161} data-node-id="67:1674" data-name="icon">
                  <img alt="" className={styles.element7} src={imgIcon3} />
                </div>
              </div>
              <div className={styles.posterTime162} data-node-id="67:1676" data-name="poster-time">
                <p className={styles.element163} data-node-id="67:1677">
                  0:24
                </p>
              </div>
            </div>
            <div className={styles.cBody164} data-node-id="67:1678" data-name="c-body">
              <div
                className={styles.element165}
                data-node-id="67:1679"
                data-name="동국체: 보고 싶었어"
              >
                <div className={styles.element166}>
                  <img alt="" className={styles.element123} src={img3} />
                </div>
              </div>
              <p className={styles.element83} data-node-id="67:1685">
                하늘별 · 봄밤 편지 · 5칸
              </p>
            </div>
          </Action>
          <Action
            className={styles.cCard156}
            data-node-id="67:1686"
            data-name="c-card"
            kind="c-card"
            label="오늘도 너를 완료 0:18 루나틱 · 달빛 약속 · 5칸"
          >
            <div className={styles.poster167} data-node-id="67:1687" data-name="poster">
              <div className={styles.element168} data-node-id="67:1688" data-name="킹세종 얼굴">
                <img alt="" className={styles.element1} src={img4} />
              </div>
              <div className={styles.element169} data-node-id="67:1689" data-name="배지/맞음">
                <p className={styles.element94} data-node-id="I67:1689;19:63">
                  완료
                </p>
              </div>
              <div className={styles.posterPlay160} data-node-id="67:1691" data-name="poster-play">
                <div className={styles.icon161} data-node-id="67:1692" data-name="icon">
                  <img alt="" className={styles.element7} src={imgIcon3} />
                </div>
              </div>
              <div className={styles.posterTime170} data-node-id="67:1694" data-name="poster-time">
                <p className={styles.element163} data-node-id="67:1695">
                  0:18
                </p>
              </div>
            </div>
            <div className={styles.cBody164} data-node-id="67:1696" data-name="c-body">
              <div
                className={styles.element165}
                data-node-id="67:1697"
                data-name="동국체: 오늘도 너를"
              >
                <div className={styles.element171}>
                  <img alt="" className={styles.element123} src={img5} />
                </div>
              </div>
              <p className={styles.element83} data-node-id="67:1703">
                루나틱 · 달빛 약속 · 5칸
              </p>
            </div>
          </Action>
          <Action
            className={styles.cCard156}
            data-node-id="67:1704"
            data-name="c-card"
            kind="c-card"
            label="함께 걸어요 0:27 하늘별 · 봄밤 편지 · 5칸"
          >
            <div className={styles.poster157} data-node-id="67:1705" data-name="poster">
              <div className={styles.element158} data-node-id="67:1706" data-name="킹세종 얼굴">
                <img alt="" className={styles.element1} src={img2} />
              </div>
              <div className={styles.posterPlay160} data-node-id="67:1707" data-name="poster-play">
                <div className={styles.icon161} data-node-id="67:1708" data-name="icon">
                  <img alt="" className={styles.element7} src={imgIcon3} />
                </div>
              </div>
              <div className={styles.posterTime172} data-node-id="67:1710" data-name="poster-time">
                <p className={styles.element163} data-node-id="67:1711">
                  0:27
                </p>
              </div>
            </div>
            <div className={styles.cBody164} data-node-id="67:1712" data-name="c-body">
              <div
                className={styles.element165}
                data-node-id="67:1713"
                data-name="동국체: 함께 걸어요"
              >
                <div className={styles.element171}>
                  <img alt="" className={styles.element123} src={img6} />
                </div>
              </div>
              <p className={styles.element83} data-node-id="67:1719">
                하늘별 · 봄밤 편지 · 5칸
              </p>
            </div>
          </Action>
        </div>
      </div>
      <MainNavigation />
    </div>
  )
}
