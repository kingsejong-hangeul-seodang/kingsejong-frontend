import { Thumbnail } from '@/components/ui/Thumbnail'
import { ContentCard } from '@/components/ui/ContentCard'
import { ModeTabs } from '@/components/ui/ModeTabs'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { SejongMessage } from '@/components/SejongGuide/SejongMessage'
import { StatCard } from '@/components/ui/StatCard'
import { MainNavigation } from '@/components/ui/MainNavigation'
import { StageSelector } from '@/components/ui/StageSelector'
import styles from '@/styles/screens.module.css'

const img2 = '/assets/figma/547a2.png'
const img4 = '/assets/figma/8aa02.png'
const img = '/assets/figma/ffde0.svg'

const imgIcon3 = '/assets/figma/daefb.svg'
const img3 = '/assets/figma/ecdca.svg'
const img5 = '/assets/figma/6dbb3.svg'

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
        <SejongMessage
          className={styles.say72}
          title={'동국, 오늘도 한 줄 써 볼까요?'}
          description={'오늘 3개 중 1개를 썼어요. 2개만 더 쓰면 오늘 목표 달성이에요.'}
          src={'/assets/figma/cd9d4.png'}
          vertical={false}
          characterWidth={120}
          characterHeight={195}
        />
        <div className={styles.choices112} data-node-id="67:1414" data-name="stats">
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
        <div className={styles.cards155} data-node-id="67:1442" data-name="cards">
          <ContentCard
            className={styles.cCard176}
            label="나 너 0:21 서당의 봄 · 3화 · 2칸"
            poster={
              <Thumbnail className={styles.poster177} data-node-id="67:1444" data-name="poster">
                <div className={styles.element178} data-node-id="67:1445" data-name="킹세종 얼굴">
                  <img alt="" className={styles.element1} src={img2} />
                </div>
                <div
                  className={styles.posterPlay179}
                  data-node-id="67:1446"
                  data-name="poster-play"
                >
                  <div className={styles.icon161} data-node-id="67:1447" data-name="icon">
                    <img alt="" className={styles.element7} src={imgIcon3} />
                  </div>
                </div>
                <div
                  className={styles.posterTime180}
                  data-node-id="67:1449"
                  data-name="poster-time"
                >
                  <p className={styles.element163} data-node-id="67:1450">
                    0:21
                  </p>
                </div>
              </Thumbnail>
            }
            title={
              <div className={styles.element181} data-node-id="67:1452" data-name="동국체: 나 너">
                <img alt="" className={styles.element7} src={img3} />
              </div>
            }
            description={'서당의 봄 · 3화 · 2칸'}
          />
          <ContentCard
            className={styles.cCard176}
            label="밥은 먹고 0:16 한강 로맨스 · 1화 · 4칸"
            poster={
              <Thumbnail className={styles.poster182} data-node-id="67:1457" data-name="poster">
                <div className={styles.element183} data-node-id="67:1458" data-name="킹세종 얼굴">
                  <img alt="" className={styles.element1} src={img4} />
                </div>
                <div
                  className={styles.posterPlay179}
                  data-node-id="67:1459"
                  data-name="poster-play"
                >
                  <div className={styles.icon161} data-node-id="67:1460" data-name="icon">
                    <img alt="" className={styles.element7} src={imgIcon3} />
                  </div>
                </div>
                <div
                  className={styles.posterTime184}
                  data-node-id="67:1462"
                  data-name="poster-time"
                >
                  <p className={styles.element163} data-node-id="67:1463">
                    0:16
                  </p>
                </div>
              </Thumbnail>
            }
            title={
              <div
                className={styles.element185}
                data-node-id="67:1465"
                data-name="동국체: 밥은 먹고"
              >
                <div className={styles.element186}>
                  <img alt="" className={styles.element123} src={img5} />
                </div>
              </div>
            }
            description={'한강 로맨스 · 1화 · 4칸'}
          />
        </div>
      </div>
      <MainNavigation />
    </div>
  )
}
