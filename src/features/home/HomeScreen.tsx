import { useUiText } from '@/app/useUiText'
import homeStyles from '@/features/home/HomeScreen.module.css'
import { StageSelector } from '@/components/ui/StageSelector'
import { ModeTabs } from '@/components/ui/ModeTabs'
import { MainNavigation } from '@/components/ui/MainNavigation'
import { SejongMessage } from '@/components/SejongMessage'
import { ContentCard } from '@/components/ui/ContentCard'
import { StatCard } from '@/components/ui/StatCard'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { Panel } from '@/components/ui/Panel'
import { ListRow } from '@/components/ui/ListRow'
import { useSession, type Mode } from '@/app/useSession'
import { listeningTitle, practiceContents, targetCells } from '@/data/content'
import { ContentPoster } from '@/components/content/ContentPoster'
import { catalogEnabled, catalogKey, screenModes, useCatalogList } from '@/hooks/useCatalog'
import { Button } from '@/components/ui/Button'
import { useLearningOverview } from '@/hooks/useLearningOverview'
import { useSavePreferences } from '@/hooks/useSavePreferences'
import { navigate } from '@/app/router'
import { homeScreen } from '@/app/learningFlow'
import { writeModes } from '@/api/backend'
import { engineStages } from '@/api/grading'
import type { ScreenName } from '@/app/routes/screens'
import styles from '@/styles/screens.module.css'

const basicPractice = {
  beginner: {
    title: '초보 연습',
    note: '초보는 자음·모음부터 단어까지, 회색 글자를 따라 써요.',
    nodeId: '133:998',
  },
  mid: { title: '중수 연습', note: '원고지 한 칸에 한 글자씩 써요.', nodeId: '67:1493' },
  pro: {
    title: '고수 연습 · 듣고 받아쓰기',
    note: '고수는 제목만 보고 들어가요. 문장은 소리로만 들려줘요.',
    nodeId: '132:1264',
  },
}

export function HomeScreen({ mode }: { mode: Mode }) {
  const t = useUiText()
  const { preferences, screen, notify, selectContent } = useSession()
  const savePreferences = useSavePreferences()
  function handleNavigate(destination: ScreenName) {
    notify('')
    navigate(destination)
  }
  async function handleModeChange(nextMode: Mode) {
    if (mode !== nextMode && (await savePreferences({ mode: nextMode }))) {
      handleNavigate(homeScreen(nextMode))
    }
  }
  async function handleOpenContent(id: string, thumbnailUrl: string | null = null) {
    if (mode !== preferences.mode && !(await savePreferences({ mode }))) return
    selectContent(id, thumbnailUrl)
    handleNavigate(`write-${preferences.stage}`)
  }
  function handleMypage() {
    handleNavigate('mypage')
  }
  const overview = useLearningOverview()
  const { records, today, streak, userLevel } = overview
  const basic = basicPractice[preferences.stage]
  const list = useCatalogList(mode, preferences.stage)
  const choices = catalogEnabled
    ? (list.data ?? []).map((item) => ({
        ...item,
        id: catalogKey(item.id),
        mode: screenModes[item.mode],
        source: item.source ?? (item.mode === 'basic' ? '기본 연습' : ''),
        selected: item.tasteMatched,
        completed: item.completed,
      }))
    : practiceContents(mode, preferences.stage)
        .sort(
          (a, b) =>
            Number(b.source.startsWith(preferences.singer)) -
            Number(a.source.startsWith(preferences.singer)),
        )
        .map((content) => ({
          ...content,
          writeMode: writeModes[engineStages[preferences.stage]],
          title:
            preferences.stage === 'pro' ? (content.dictationTitle ?? content.title) : content.title,
          target: content.targets[preferences.stage],
          thumbnailUrl: null,
          durationSec: null,
          cellCount: targetCells(content.targets[preferences.stage], preferences.stage).length,
          wordCount: content.targets[preferences.stage].split(' ').length,
          selected: mode === 'pop' && content.source.startsWith(preferences.singer),
          completed: records?.some(
            (record) =>
              record.contentId === content.id &&
              record.grade?.correct &&
              !record.grade.engineVersion.endsWith('stub'),
          ),
        }))
  return (
    <div
      className={styles.screen}
      data-name={`home — ${mode}`}
      data-node-id={mode === 'pop' ? '67:1259' : mode === 'drama' ? '67:1388' : basic.nodeId}
    >
      <div className={homeStyles.header} data-name="home-head">
        <div className={homeStyles.logo}>
          <div className={homeStyles.logoInset}>
            <img
              alt={t('킹세종 한글서당')}
              className={styles.fullSizeImage}
              src="/assets/figma/ffde0.svg"
            />
          </div>
        </div>
        <div className={homeStyles.stageControl}>
          <p className={styles.controlLabel}>{t('난이도')}</p>
          <StageSelector
            value={preferences.stage}
            onChange={(stage) => void savePreferences({ stage })}
          />
        </div>
      </div>
      <div className={styles.pageWithNavigation} data-name="page">
        <SejongMessage
          className={styles.guideMessage}
          title={
            overview.name
              ? t('{0}님, 오늘도 한 줄 써 볼까요?', overview.name)
              : t('오늘도 한 줄 써 볼까요?')
          }
          description={
            today
              ? [
                  t('오늘 {0}개를 썼어요.', today.done),
                  today.done >= today.goal
                    ? t('오늘 목표를 달성했어요!')
                    : t('{0}개만 더 쓰면 오늘 목표 달성이에요.', today.goal - today.done),
                ].join(' ')
              : t('오늘도 한 글자씩 차근차근 써 봐요.')
          }
          src={overview.image}
          vertical={false}
          characterWidth={120}
          characterHeight={195}
        />
        <div className={homeStyles.stats} data-name="stats">
          <StatCard
            className={homeStyles.statCard}
            label={t('연속 학습')}
            value={streak === undefined ? '—' : t('{0}일째', streak)}
          />
          <StatCard
            className={homeStyles.statCard}
            label={t('레벨 · 내 킹세종 보기')}
            value={userLevel?.name ?? '—'}
            onClick={handleMypage}
          />
          {userLevel && (
            <StatCard
              className={homeStyles.progressCard}
              label={
                userLevel.nextLevelExp != null
                  ? t('다음 레벨까지 {0} EXP', Math.max(0, userLevel.nextLevelExp - userLevel.exp))
                  : t('누적 경험치')
              }
              value={
                userLevel.nextLevelExp != null
                  ? `${userLevel.exp} / ${userLevel.nextLevelExp}`
                  : `${userLevel.exp} EXP`
              }
            >
              {userLevel.nextLevelExp != null && (
                <ProgressBar
                  className={homeStyles.progressTrack}
                  value={userLevel.exp}
                  max={userLevel.nextLevelExp}
                  label={t('다음 레벨 진행률')}
                />
              )}
            </StatCard>
          )}
        </div>
        {overview.error && (
          <Panel className={styles.panel}>
            <p role="status">{t('학습 현황을 불러오지 못했어요.')}</p>
            <Button onClick={overview.retry}>{t('다시 불러오기')}</Button>
          </Panel>
        )}
        <ModeTabs value={mode} onChange={handleModeChange} />
        {catalogEnabled && (!list.data || !list.data.length) && (
          <Panel className={styles.panel}>
            <p role="status">
              {list.error ??
                (list.data ? t('이 단계의 콘텐츠가 아직 없어요.') : t('콘텐츠를 불러오고 있어요.'))}
            </p>
            {list.error && <Button onClick={list.retry}>{t('다시 불러오기')}</Button>}
          </Panel>
        )}
        {mode === 'basic' ? (
          choices.length > 0 && (
            <>
              <Panel className={styles.listPanel}>
                <div className={styles.panelHeader}>
                  <p className={styles.sectionTitle}>{t(basic.title)}</p>
                </div>
                {choices.map((content, index) => {
                  const isListening = content.writeMode === 'dictation'
                  const title = isListening
                    ? listeningTitle(
                        content.title,
                        content.target ?? '',
                        t('기본 듣기 연습 {0}', index + 1),
                      )
                    : content.title
                  const description =
                    preferences.stage === 'beginner'
                      ? [
                          content.source === '기본 연습' ? t('단어') : content.source,
                          t('{0}칸', content.cellCount),
                          content.completed ? t('완료') : content.meaning,
                        ]
                          .filter(Boolean)
                          .join(' · ')
                      : t('{0}어절 · {1}칸', content.wordCount, content.cellCount)
                  return (
                    <ListRow
                      key={content.id}
                      className={styles.listRow}
                      label={t('{0} 연습', title)}
                      onClick={() => handleOpenContent(content.id)}
                    >
                      <div className={styles.rowLeading}>
                        <div className={styles.smallIcon}>
                          <img alt="" className={styles.fillImage} src="/assets/figma/7a8b5.svg" />
                        </div>
                      </div>
                      <div className={styles.rowContent}>
                        <p className={styles.rowTitle}>{title}</p>
                        <p className={styles.rowDescription}>
                          {isListening ? t('문장 1개 · 듣고 쓰기') : description}
                        </p>
                      </div>
                      <div className={styles.rowTrailing}>
                        <div className={styles.rowIcon}>
                          <img alt="" className={styles.fillImage} src="/assets/figma/f651f.svg" />
                        </div>
                      </div>
                    </ListRow>
                  )
                })}
              </Panel>
              <p className={styles.secondaryText}>{t(basic.note)}</p>
            </>
          )
        ) : (
          <div className={homeStyles.contentCards} data-name="cards">
            {choices.map((content) => (
              <ContentCard
                key={content.id}
                className={mode === 'drama' ? homeStyles.dramaCard : homeStyles.popCard}
                label={[content.title, content.source].filter(Boolean).join(' ')}
                onClick={() => handleOpenContent(content.id, content.thumbnailUrl)}
                poster={
                  <ContentPoster
                    kind={mode}
                    thumbnailUrl={content.thumbnailUrl}
                    durationSec={content.durationSec}
                    tasteLabel={
                      content.selected
                        ? mode === 'drama'
                          ? t('고른 작품')
                          : t('고른 가수')
                        : undefined
                    }
                    completed={content.completed}
                  />
                }
                title={<p className={styles.sectionTitle}>{content.title}</p>}
                description={[
                  content.source,
                  content.writeMode === 'dictation'
                    ? t('듣고 쓰기')
                    : t('{0}칸', content.cellCount),
                ]
                  .filter(Boolean)
                  .join(' · ')}
              />
            ))}
          </div>
        )}
      </div>
      <MainNavigation
        screen={screen}
        home={homeScreen(preferences.mode)}
        onNavigate={handleNavigate}
      />
    </div>
  )
}
