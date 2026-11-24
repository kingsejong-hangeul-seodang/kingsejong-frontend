import { useUiText } from '@/app/useUiText'
import mypageStyles from '@/features/mypage/Mypage.module.css'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { ListRow } from '@/components/ui/ListRow'
import { Panel } from '@/components/ui/Panel'
import { useSession } from '@/app/useSession'
import { LevelCollection } from '@/features/mypage/components/LevelCollection'
import { MainNavigation } from '@/components/ui/MainNavigation'
import { useLearningOverview } from '@/hooks/useLearningOverview'
import { LogoutButton } from '@/features/settings/components/LogoutButton'
import { Button } from '@/components/ui/Button'
import { navigate } from '@/app/router'
import { homeScreen } from '@/app/learningFlow'
import type { ScreenName } from '@/app/routes/screens'
import styles from '@/styles/screens.module.css'

const imgIcon = '/assets/figma/f651f.svg'

export default function MyPageScreen() {
  const t = useUiText()
  const { userLevel, nextLevel, collection, image, name, streak, error, retry } =
    useLearningOverview()
  const { preferences, screen, notify } = useSession()
  function handleNavigate(destination: ScreenName) {
    notify('')
    navigate(destination)
  }
  function handleSettings() {
    handleNavigate('settings')
  }

  return (
    <div className={styles.screen} data-node-id="67:1742" data-name="mypage — 마이페이지">
      <div className={styles.pageHeader} data-node-id="67:1743" data-name="hero">
        <p className={styles.heading} data-node-id="67:1744">
          {t('마이페이지')}
        </p>
        <p className={styles.bodyText} data-node-id="67:1745">
          {t('쓸수록 내 킹세종이 멋지게 변해요.')}
        </p>
      </div>
      <div className={styles.pageWithNavigation} data-node-id="67:1746" data-name="page">
        {userLevel ? (
          <div className={mypageStyles.profileCard}>
            <div className={mypageStyles.profileCharacter}>
              <img alt="" className={styles.containImage} src={image} />
            </div>
            <h1 className={styles.singleLineHeading}>{userLevel.name ?? t('내 레벨')}</h1>
            <p className={mypageStyles.profileCaption}>
              {name ? `${name} · ` : ''}
              {t('연속 학습')} {streak === undefined ? t('확인 중') : t('{0}일째', streak)}
            </p>
            {userLevel.nextLevelExp != null && (
              <ProgressBar
                className={mypageStyles.experienceTrack}
                value={userLevel.exp}
                max={userLevel.nextLevelExp}
                label={t('다음 레벨 진행률')}
              />
            )}
            <p className={mypageStyles.profileCaption}>
              {userLevel.exp.toLocaleString('ko-KR')} EXP
              {userLevel.nextLevelExp != null &&
                ` / ${userLevel.nextLevelExp.toLocaleString('ko-KR')} EXP`}
              {nextLevel && t('· 다음 레벨 {0}', nextLevel.name)}
            </p>
          </div>
        ) : (
          <Panel className={styles.panel}>
            <p role="status">{error ?? t('내 정보를 불러오고 있어요.')}</p>
            {error && <Button onClick={retry}>{t('다시 불러오기')}</Button>}
          </Panel>
        )}
        {userLevel && collection.length > 0 && (
          <Panel className={styles.panel}>
            <h2 className={styles.sectionTitle}>{t('킹세종이 자라는 모습')}</h2>
            <LevelCollection exp={userLevel.exp} currentNo={userLevel.no} collection={collection} />
          </Panel>
        )}
        <Panel className={styles.listPanel} data-node-id="67:1787" data-name="block">
          <ListRow
            className={styles.listRow}
            data-node-id="67:1788"
            data-name="row"
            label={t('설정 난이도 · 언어 · 좋아하는 가수')}
            onClick={handleSettings}
          >
            <div className={styles.rowContent} data-node-id="67:1789" data-name="row-main">
              <p className={styles.rowTitle} data-node-id="67:1790">
                {t('설정')}
              </p>
              <p className={styles.rowDescription} data-node-id="67:1791">
                {t('난이도 · 언어 · 좋아하는 가수')}
              </p>
            </div>
            <div className={styles.rowTrailing} data-node-id="67:1792" data-name="row-trail">
              <div className={styles.rowIcon} data-node-id="67:1793" data-name="icon">
                <img alt="" className={styles.fillImage} src={imgIcon} />
              </div>
            </div>
          </ListRow>
        </Panel>
        <LogoutButton />
      </div>
      <MainNavigation
        screen={screen}
        home={homeScreen(preferences.mode)}
        onNavigate={handleNavigate}
      />
    </div>
  )
}
