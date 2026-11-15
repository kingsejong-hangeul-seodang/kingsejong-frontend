import { ProgressBar } from '@/components/ui/ProgressBar'
import { ListRow } from '@/components/ui/ListRow'
import { Panel } from '@/components/ui/Panel'
import { useSession } from '@/app/useSession'
import { levels } from '../levels'
import { LevelCollection } from '../LevelCollection'
import { MainNavigation } from '@/components/ui/MainNavigation'
import styles from '@/styles/screens.module.css'

const img1 = '/assets/figma/18620.svg'
const imgIcon = '/assets/figma/f651f.svg'

export default function Mypage() {
  const {
    preferences: { exp },
  } = useSession()
  const current = levels.findLast((level) => exp >= level.exp) ?? levels[0]
  const next = levels.find((level) => exp < level.exp)

  return (
    <div className={styles.leveltest1163} data-node-id="67:1742" data-name="mypage — 마이페이지">
      <div className={styles.hero204} data-node-id="67:1743" data-name="hero">
        <p className={styles.element205} data-node-id="67:1744">
          마이페이지
        </p>
        <p className={styles.element206} data-node-id="67:1745">
          쓸수록 내 킹세종이 멋지게 변해요.
        </p>
      </div>
      <div className={styles.page144} data-node-id="67:1746" data-name="page">
        <div className={styles.myHero207} data-node-id="67:1747" data-name="my-hero">
          <div className={styles.element208} data-node-id="67:1748" data-name="킹세종">
            <img alt="" className={styles.element1} src={current.image} />
          </div>
          {current.exp === 0 ? (
            <div className={styles.element209} data-node-id="67:1749" data-name="동국체: 서당 입문">
              <div className={styles.element210}>
                <img alt="" className={styles.element123} src={img1} />
              </div>
            </div>
          ) : (
            <p className={styles.element71}>{current.name}</p>
          )}
          <p className={styles.element211} data-node-id="67:1754">
            동국 · 연속 학습 3일째
          </p>
          <ProgressBar
            className={styles.xp212}
            value={exp}
            max={next?.exp ?? exp}
            label="다음 레벨 진행률"
          />
          <p className={styles.element211} data-node-id="67:1757">
            {next
              ? `${exp.toLocaleString('ko-KR')} / ${next.exp.toLocaleString('ko-KR')} EXP — ${(next.exp - exp).toLocaleString('ko-KR')} EXP 더 모으면 ‘${next.name}’이 돼요`
              : `${exp.toLocaleString('ko-KR')} EXP · 모든 단계를 달성했어요`}
          </p>
        </div>
        <Panel className={styles.block88} data-node-id="67:1758" data-name="block">
          <div className={styles.blockHead188} data-node-id="67:1759" data-name="block-head">
            <p className={styles.element76} data-node-id="67:1760">
              킹세종이 자라는 모습
            </p>
          </div>
          <LevelCollection exp={exp} />
        </Panel>
        <Panel className={styles.block187} data-node-id="67:1787" data-name="block">
          <ListRow
            className={styles.row40}
            data-node-id="67:1788"
            data-name="row"
            label="설정 난이도 · 언어 · 좋아하는 가수"
          >
            <div className={styles.rowMain41} data-node-id="67:1789" data-name="row-main">
              <p className={styles.element42} data-node-id="67:1790">
                설정
              </p>
              <p className={styles.element25} data-node-id="67:1791">
                난이도 · 언어 · 좋아하는 가수
              </p>
            </div>
            <div className={styles.rowTrail43} data-node-id="67:1792" data-name="row-trail">
              <div className={styles.icon86} data-node-id="67:1793" data-name="icon">
                <img alt="" className={styles.element7} src={imgIcon} />
              </div>
            </div>
          </ListRow>
        </Panel>
      </div>
      <MainNavigation />
    </div>
  )
}
