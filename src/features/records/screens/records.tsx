import { ListRow } from '@/components/ui/ListRow'
import { Panel } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { MainNavigation } from '@/components/ui/MainNavigation'
import styles from '@/styles/screens.module.css'

const imgIcon = '/assets/figma/f651f.svg'

export default function Records() {
  return (
    <div className={styles.leveltest1163} data-node-id="67:2920" data-name="records — 쓰기 기록">
      <div className={styles.hero204} data-node-id="67:2921" data-name="hero">
        <p className={styles.element205} data-node-id="67:2922">
          쓰기 기록
        </p>

        <p className={styles.element206} data-node-id="67:2923">
          쓴 글을 누르면 결과를 다시 봐요.
        </p>
      </div>
      <div className={styles.page144} data-node-id="67:2924" data-name="page">
        <Panel className={styles.block187} data-node-id="67:2925" data-name="block">
          <ListRow
            className={styles.row40}
            data-node-id="67:2926"
            data-name="row"
            label="11/10 오늘도 너를 기다려 K팝 · 루나틱 · 달빛 약속"
          >
            <p className={styles.element37} data-node-id="67:2927">
              11/10
            </p>
            <div className={styles.rowMain352} data-node-id="67:2928" data-name="row-main">
              <Badge className={styles.element93} tone="success">
                {'다 맞음'}
              </Badge>
              <p className={styles.element107} data-node-id="67:2931">
                오늘도 너를 기다려
              </p>
              <p className={styles.element83} data-node-id="67:2932">
                K팝 · 루나틱 · 달빛 약속
              </p>
            </div>
            <div className={styles.rowTrail43} data-node-id="67:2933" data-name="row-trail">
              <div className={styles.icon86} data-node-id="67:2934" data-name="icon">
                <img alt="" className={styles.element7} src={imgIcon} />
              </div>
            </div>
          </ListRow>
          <ListRow
            className={styles.row40}
            data-node-id="67:2936"
            data-name="row"
            label="11/9 바다 기본 연습"
          >
            <p className={styles.element37} data-node-id="67:2937">
              11/9
            </p>
            <div className={styles.rowMain352} data-node-id="67:2938" data-name="row-main">
              <Badge className={styles.element103} tone="warning">
                {'획순 1곳'}
              </Badge>
              <p className={styles.element107} data-node-id="67:2941">
                바다
              </p>
              <p className={styles.element83} data-node-id="67:2942">
                기본 연습
              </p>
            </div>
            <div className={styles.rowTrail43} data-node-id="67:2943" data-name="row-trail">
              <div className={styles.icon86} data-node-id="67:2944" data-name="icon">
                <img alt="" className={styles.element7} src={imgIcon} />
              </div>
            </div>
          </ListRow>
          <ListRow
            className={styles.row40}
            data-node-id="67:2946"
            data-name="row"
            label="11/8 좋아 K드라마 · 서당의 봄 3화"
          >
            <p className={styles.element37} data-node-id="67:2947">
              11/8
            </p>
            <div className={styles.rowMain352} data-node-id="67:2948" data-name="row-main">
              <Badge className={styles.element93} tone="success">
                {'다 맞음'}
              </Badge>
              <p className={styles.element107} data-node-id="67:2951">
                좋아
              </p>
              <p className={styles.element83} data-node-id="67:2952">
                K드라마 · 서당의 봄 3화
              </p>
            </div>
            <div className={styles.rowTrail43} data-node-id="67:2953" data-name="row-trail">
              <div className={styles.icon86} data-node-id="67:2954" data-name="icon">
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
