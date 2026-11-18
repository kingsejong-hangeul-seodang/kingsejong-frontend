import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { ListRow } from '@/components/ui/ListRow'
import { Panel } from '@/components/ui/Panel'
import { StageSelector } from '@/components/ui/StageSelector'
import { AppBar } from '@/components/ui/AppBar'
import styles from '@/styles/screens.module.css'
import { Action } from '@/components/ui/Action'

const imgIcon1 = '/assets/figma/f651f.svg'

export default function Settings() {
  return (
    <div className={styles.leveltest1163} data-node-id="67:2978" data-name="settings — 설정">
      <AppBar title="설정" />
      <div className={styles.page353} data-node-id="67:2984" data-name="page">
        <Panel className={styles.block88} data-node-id="67:2985" data-name="block">
          <div className={styles.blockHead188} data-node-id="67:2986" data-name="block-head">
            <p className={styles.element76} data-node-id="67:2987">
              난이도
            </p>
            <StageSelector />
          </div>

          <p className={styles.element83} data-node-id="67:2995">
            중수는 어절마다 묶인 칸에 가이드 글자 없이 써요.
          </p>
        </Panel>
        <Panel className={styles.block88} data-node-id="67:2996" data-name="block">
          <div className={styles.blockHead188} data-node-id="67:2997" data-name="block-head">
            <p className={styles.element76} data-node-id="67:2998">
              언어
            </p>
          </div>
          <SegmentedControl
            options={['한국어', 'English']}
            kind="seg-item"
            label="언어 선택"
            fullWidth
          />
        </Panel>
        <Panel className={styles.block187} data-node-id="67:3004" data-name="block">
          <ListRow
            className={styles.row357}
            data-node-id="67:3005"
            data-name="row"
            label="좋아하는 가수 다시 고르기 하늘별"
          >
            <div className={styles.rowMain358} data-node-id="67:3006" data-name="row-main">
              <p className={styles.element107} data-node-id="67:3007">
                좋아하는 가수 다시 고르기
              </p>
            </div>
            <div className={styles.rowTrail43} data-node-id="67:3008" data-name="row-trail">
              <p className={styles.element83} data-node-id="67:3009">
                하늘별
              </p>
              <div className={styles.icon86} data-node-id="67:3010" data-name="icon">
                <img alt="" className={styles.element7} src={imgIcon1} />
              </div>
            </div>
          </ListRow>
          <ListRow
            className={styles.row357}
            data-node-id="67:3012"
            data-name="row"
            label="레벨 테스트 다시 보기"
          >
            <div className={styles.rowMain358} data-node-id="67:3013" data-name="row-main">
              <p className={styles.element107} data-node-id="67:3014">
                레벨 테스트 다시 보기
              </p>
            </div>
            <div className={styles.rowTrail43} data-node-id="67:3015" data-name="row-trail">
              <div className={styles.icon86} data-node-id="67:3016" data-name="icon">
                <img alt="" className={styles.element7} src={imgIcon1} />
              </div>
            </div>
          </ListRow>
          <ListRow
            className={styles.row357}
            data-node-id="67:3018"
            data-name="row"
            label="내 정보 동국 · SEJONG-07"
          >
            <div className={styles.rowMain358} data-node-id="67:3019" data-name="row-main">
              <p className={styles.element107} data-node-id="67:3020">
                내 정보
              </p>
            </div>
            <div className={styles.rowTrail359} data-node-id="67:3021" data-name="row-trail">
              <p className={styles.element83} data-node-id="67:3022">
                동국 · SEJONG-07
              </p>
            </div>
          </ListRow>
        </Panel>
        <Action
          className={styles.element360}
          data-node-id="67:3023"
          data-name="버튼/보조"
          kind="버튼/보조"
          label="로그아웃"
        >
          <p className={styles.element107} data-node-id="I67:3023;19:43">
            로그아웃
          </p>
        </Action>
      </div>
    </div>
  )
}
