import { Thumbnail } from '@/components/ui/Thumbnail'
import { ContentCard } from '@/components/ui/ContentCard'
import { ModeTabs } from '@/components/ui/ModeTabs'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { SejongMessage } from '@/components/SejongGuide/SejongMessage'
import { StatCard } from '@/components/ui/StatCard'
import { Badge } from '@/components/ui/Badge'
import { MainNavigation } from '@/components/ui/MainNavigation'
import { StageSelector } from '@/components/ui/StageSelector'
import styles from '@/styles/screens.module.css'

const img2 = '/assets/figma/3d07b.png'
const img4 = '/assets/figma/01084.png'
const img = '/assets/figma/ffde0.svg'

const imgIcon3 = '/assets/figma/daefb.svg'
const img3 = '/assets/figma/36dd5.svg'
const img5 = '/assets/figma/74027.svg'
const img6 = '/assets/figma/79f2b.svg'

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
        <SejongMessage
          className={styles.say72}
          title={'성균관 유생 동국, 오늘도 써 볼까요?'}
          description={'오늘 3개 중 1개를 썼어요. 2개만 더 쓰면 오늘 목표 달성이에요.'}
          src={'/assets/figma/1f5e2.png'}
          vertical={false}
          characterWidth={120}
          characterHeight={179.2}
        />
        <div className={styles.choices112} data-node-id="67:1639" data-name="stats">
          <StatCard className={styles.element146} label={'연속 학습'} value={'3일째'} />
          <StatCard
            className={styles.element146}
            label={'레벨 · 내 킹세종 보기'}
            value={'성균관 유생'}
            action
          ></StatCard>
          <StatCard className={styles.stat147} label={'다음 레벨까지 500 EXP'} value={'300 / 800'}>
            <ProgressBar className={styles.xp148} value={300} max={800} label="다음 레벨 진행률" />
          </StatCard>
        </div>
        <ModeTabs />
        <div className={styles.cards155} data-node-id="67:1667" data-name="cards">
          <ContentCard
            className={styles.cCard156}
            label="보고 싶었어 0:24 하늘별 · 봄밤 편지 · 5칸"
            poster={
              <Thumbnail className={styles.poster157} data-node-id="67:1669" data-name="poster">
                <div className={styles.element158} data-node-id="67:1670" data-name="킹세종 얼굴">
                  <img alt="" className={styles.element1} src={img2} />
                </div>
                <Badge className={styles.element159} tone="brand">
                  {'고른 가수'}
                </Badge>
                <div
                  className={styles.posterPlay160}
                  data-node-id="67:1673"
                  data-name="poster-play"
                >
                  <div className={styles.icon161} data-node-id="67:1674" data-name="icon">
                    <img alt="" className={styles.element7} src={imgIcon3} />
                  </div>
                </div>
                <div
                  className={styles.posterTime162}
                  data-node-id="67:1676"
                  data-name="poster-time"
                >
                  <p className={styles.element163} data-node-id="67:1677">
                    0:24
                  </p>
                </div>
              </Thumbnail>
            }
            title={
              <div
                className={styles.element165}
                data-node-id="67:1679"
                data-name="동국체: 보고 싶었어"
              >
                <div className={styles.element166}>
                  <img alt="" className={styles.element123} src={img3} />
                </div>
              </div>
            }
            description={'하늘별 · 봄밤 편지 · 5칸'}
          />
          <ContentCard
            className={styles.cCard156}
            label="오늘도 너를 완료 0:18 루나틱 · 달빛 약속 · 5칸"
            poster={
              <Thumbnail className={styles.poster167} data-node-id="67:1687" data-name="poster">
                <div className={styles.element168} data-node-id="67:1688" data-name="킹세종 얼굴">
                  <img alt="" className={styles.element1} src={img4} />
                </div>
                <Badge className={styles.element169} tone="success">
                  {'완료'}
                </Badge>
                <div
                  className={styles.posterPlay160}
                  data-node-id="67:1691"
                  data-name="poster-play"
                >
                  <div className={styles.icon161} data-node-id="67:1692" data-name="icon">
                    <img alt="" className={styles.element7} src={imgIcon3} />
                  </div>
                </div>
                <div
                  className={styles.posterTime170}
                  data-node-id="67:1694"
                  data-name="poster-time"
                >
                  <p className={styles.element163} data-node-id="67:1695">
                    0:18
                  </p>
                </div>
              </Thumbnail>
            }
            title={
              <div
                className={styles.element165}
                data-node-id="67:1697"
                data-name="동국체: 오늘도 너를"
              >
                <div className={styles.element171}>
                  <img alt="" className={styles.element123} src={img5} />
                </div>
              </div>
            }
            description={'루나틱 · 달빛 약속 · 5칸'}
          />
          <ContentCard
            className={styles.cCard156}
            label="함께 걸어요 0:27 하늘별 · 봄밤 편지 · 5칸"
            poster={
              <Thumbnail className={styles.poster157} data-node-id="67:1705" data-name="poster">
                <div className={styles.element158} data-node-id="67:1706" data-name="킹세종 얼굴">
                  <img alt="" className={styles.element1} src={img2} />
                </div>
                <div
                  className={styles.posterPlay160}
                  data-node-id="67:1707"
                  data-name="poster-play"
                >
                  <div className={styles.icon161} data-node-id="67:1708" data-name="icon">
                    <img alt="" className={styles.element7} src={imgIcon3} />
                  </div>
                </div>
                <div
                  className={styles.posterTime172}
                  data-node-id="67:1710"
                  data-name="poster-time"
                >
                  <p className={styles.element163} data-node-id="67:1711">
                    0:27
                  </p>
                </div>
              </Thumbnail>
            }
            title={
              <div
                className={styles.element165}
                data-node-id="67:1713"
                data-name="동국체: 함께 걸어요"
              >
                <div className={styles.element171}>
                  <img alt="" className={styles.element123} src={img6} />
                </div>
              </div>
            }
            description={'하늘별 · 봄밤 편지 · 5칸'}
          />
        </div>
      </div>
      <MainNavigation />
    </div>
  )
}
