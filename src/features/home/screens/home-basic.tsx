import { ListRow } from '@/components/ui/ListRow'
import { Panel } from '@/components/ui/Panel'
import { ModeTabs } from '@/components/ui/ModeTabs'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { SejongMessage } from '@/components/SejongGuide/SejongMessage'
import { StatCard } from '@/components/ui/StatCard'
import { MainNavigation } from '@/components/ui/MainNavigation'
import { StageSelector } from '@/components/ui/StageSelector'
import styles from '@/styles/screens.module.css'

const img = '/assets/figma/ffde0.svg'

const imgIcon3 = '/assets/figma/7a8b5.svg'
const imgIcon4 = '/assets/figma/f651f.svg'

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
        <SejongMessage
          className={styles.say72}
          title={'동국, 오늘도 한 줄 써 볼까요?'}
          description={'오늘 3개 중 1개를 썼어요. 2개만 더 쓰면 오늘 목표 달성이에요.'}
          src={'/assets/figma/cd9d4.png'}
          vertical={false}
          characterWidth={120}
          characterHeight={195}
        />
        <div className={styles.choices112} data-node-id="67:1519" data-name="stats">
          <StatCard className={styles.element146} label={'연속 학습'} value={'3일째'} />
          <StatCard
            className={styles.element146}
            label={'레벨 · 내 킹세종 보기'}
            value={'서당 입문'}
            action
          ></StatCard>
          <StatCard className={styles.stat147} label={'다음 레벨까지 180 EXP'} value={'120 / 300'}>
            <ProgressBar className={styles.xp148} value={120} max={300} label="다음 레벨 진행률" />
          </StatCard>
        </div>
        <ModeTabs />
        <Panel className={styles.block187} data-node-id="67:1547" data-name="block">
          <div className={styles.blockHead188} data-node-id="67:1548" data-name="block-head">
            <p className={styles.element76} data-node-id="67:1549">
              중수 연습
            </p>
          </div>
          <ListRow
            className={styles.row40}
            data-node-id="67:1550"
            data-name="row"
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
          </ListRow>
        </Panel>
        <p className={styles.element83} data-node-id="67:1560">
          초보는 자음·모음부터, 고수는 문장을 써요 — 위에서 단계를 바꿀 수 있어요
        </p>
      </div>
      <MainNavigation />
    </div>
  )
}
