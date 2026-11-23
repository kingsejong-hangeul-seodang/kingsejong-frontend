import settingsStyles from '@/features/settings/Settings.module.css'
import { navigate } from '@/app/router'
import { SegmentedControl } from '@/components/ui/SegmentedControl'
import { ListRow } from '@/components/ui/ListRow'
import { Panel } from '@/components/ui/Panel'
import { StageSelector } from '@/components/ui/StageSelector'
import { AppBar } from '@/components/ui/AppBar'
import styles from '@/styles/screens.module.css'
import { Button } from '@/components/ui/Button'
import { useSession } from '@/app/useSession'
import { useProfile } from '@/hooks/useStudy'

const imgIcon1 = '/assets/figma/f651f.svg'

export default function Settings() {
  const { preferences, update, reset, notify, setSettingsOrigin } = useSession()
  const profile = useProfile()
  const information = [profile.data?.name, profile.data?.loginCode ?? preferences.code]
    .filter(Boolean)
    .join(' · ')
  function handleBack() {
    notify('')
    navigate('mypage')
  }
  function handleChooseSinger() {
    setSettingsOrigin(true)
    notify('')
    navigate('taste')
  }
  function handleLevelTest() {
    notify('')
    navigate('leveltest-1')
  }
  function handleLogout() {
    reset()
    notify('')
    navigate('lang')
  }
  return (
    <div className={styles.screen} data-node-id="67:2978" data-name="settings — 설정">
      <AppBar title="설정" onBack={handleBack} />
      <div className={settingsStyles.settingsPage} data-node-id="67:2984" data-name="page">
        <Panel className={styles.panel} data-node-id="67:2985" data-name="block">
          <div className={styles.panelHeader} data-node-id="67:2986" data-name="block-head">
            <p className={styles.sectionTitle} data-node-id="67:2987">
              난이도
            </p>
            <StageSelector value={preferences.stage} onChange={(stage) => update({ stage })} />
          </div>

          <p className={styles.secondaryText} data-node-id="67:2995">
            {
              {
                beginner: '초보는 회색 글자 위에 따라 써요.',
                mid: '중수는 어절마다 묶인 칸에 가이드 글자 없이 써요.',
                pro: '고수는 문장을 보고 띄어쓰기까지 직접 써요.',
              }[preferences.stage]
            }
          </p>
        </Panel>
        <Panel className={styles.panel} data-node-id="67:2996" data-name="block">
          <div className={styles.panelHeader} data-node-id="67:2997" data-name="block-head">
            <p className={styles.sectionTitle} data-node-id="67:2998">
              언어
            </p>
          </div>
          <SegmentedControl
            options={['한국어', 'English'] as const}
            value={preferences.language}
            onChange={(language) => update({ language })}
            kind="seg-item"
            label="언어 선택"
            fullWidth
          />
        </Panel>
        <Panel className={styles.listPanel} data-node-id="67:3004" data-name="block">
          <ListRow
            className={settingsStyles.settingsRow}
            data-node-id="67:3005"
            data-name="row"
            label={`좋아하는 가수 다시 고르기 ${preferences.singer}`}
            onClick={handleChooseSinger}
          >
            <div
              className={settingsStyles.settingsRowContent}
              data-node-id="67:3006"
              data-name="row-main"
            >
              <p className={styles.actionText} data-node-id="67:3007">
                좋아하는 가수 다시 고르기
              </p>
            </div>
            <div className={styles.rowTrailing} data-node-id="67:3008" data-name="row-trail">
              <p className={styles.secondaryText} data-node-id="67:3009">
                {preferences.singer}
              </p>
              <div className={styles.rowIcon} data-node-id="67:3010" data-name="icon">
                <img alt="" className={styles.fillImage} src={imgIcon1} />
              </div>
            </div>
          </ListRow>
          <ListRow
            className={settingsStyles.settingsRow}
            data-node-id="67:3012"
            data-name="row"
            label="레벨 테스트 다시 보기"
            onClick={handleLevelTest}
          >
            <div
              className={settingsStyles.settingsRowContent}
              data-node-id="67:3013"
              data-name="row-main"
            >
              <p className={styles.actionText} data-node-id="67:3014">
                레벨 테스트 다시 보기
              </p>
            </div>
            <div className={styles.rowTrailing} data-node-id="67:3015" data-name="row-trail">
              <div className={styles.rowIcon} data-node-id="67:3016" data-name="icon">
                <img alt="" className={styles.fillImage} src={imgIcon1} />
              </div>
            </div>
          </ListRow>
          <div className={settingsStyles.settingsRow} data-node-id="67:3018" data-name="row">
            <div
              className={settingsStyles.settingsRowContent}
              data-node-id="67:3019"
              data-name="row-main"
            >
              <p className={styles.actionText} data-node-id="67:3020">
                내 정보
              </p>
            </div>
            <div
              className={settingsStyles.settingsRowTrailing}
              data-node-id="67:3021"
              data-name="row-trail"
            >
              <p className={styles.secondaryText} data-node-id="67:3022">
                {information}
              </p>
            </div>
          </div>
        </Panel>
        <Button
          className={settingsStyles.logoutButton}
          data-node-id="67:3023"
          data-name="버튼/보조"
          variant="secondary"
          data-action="버튼/보조"
          aria-label="로그아웃"
          onClick={handleLogout}
        >
          <p className={styles.actionText} data-node-id="I67:3023;19:43">
            로그아웃
          </p>
        </Button>
      </div>
    </div>
  )
}
