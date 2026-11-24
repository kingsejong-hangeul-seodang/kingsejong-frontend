import { useUiText } from '@/app/useUiText'
import { JamoTile } from '@/components/ui/JamoTile'
import { Panel } from '@/components/ui/Panel'
import { MainNavigation } from '@/components/ui/MainNavigation'
import { Button } from '@/components/ui/Button'
import { navigate } from '@/app/router'
import { useSession } from '@/app/useSession'
import { homeScreen } from '@/app/learningFlow'
import { useJamoList } from '@/hooks/useStudy'
import { useJamoMastery } from '@/hooks/useJamoMastery'
import { masteryLabels } from '@/data/jamoMastery'
import { studyApi } from '@/api/integration'
import { useGuideFont } from '@/features/learning/reference/guideFont'
import styles from '@/styles/screens.module.css'

export default function JamoCollectionScreen() {
  const t = useUiText()
  const { screen, preferences, notify, selectJamo } = useSession()
  const { data, error, retry } = useJamoList()
  const { mastery } = useJamoMastery()
  const { family } = useGuideFont()
  const sections = data
    ? [
        { title: t('자음'), items: data.consonants },
        { title: t('모음'), items: data.vowels },
      ]
    : []

  return (
    <div className={styles.screen} data-name="dogam">
      <div className={styles.sectionHeader}>
        <h1 className={styles.singleLineHeading}>{t('자모 도감')}</h1>
        <p className={styles.panelBody}>{t('자모를 누르면 쓰는 순서를 봐요.')}</p>
      </div>
      <div className={styles.pageWithNavigation}>
        {!data && (
          <Panel className={styles.panel}>
            <p role="status">{error ?? t('자모를 불러오고 있어요.')}</p>
            {error && <Button onClick={retry}>{t('다시 불러오기')}</Button>}
          </Panel>
        )}
        {sections.map(({ title, items }) => (
          <Panel className={styles.panel} key={title}>
            <div className={styles.panelHeader}>
              <h2 className={styles.sectionTitle}>
                {title} {items.length}
              </h2>
            </div>
            <div className={styles.wrappingGrid}>
              {items.map((item) => {
                const { jamo, name } = item
                const status = studyApi ? item.mastery : (mastery.get(jamo)?.status ?? 'none')
                return (
                  <JamoTile
                    key={jamo}
                    glyph={jamo}
                    glyphFontFamily={family}
                    label={`${jamo} ${name}, ${t(masteryLabels[status])}`}
                    status={status === 'none' ? 'default' : status}
                    onClick={() => {
                      selectJamo(jamo)
                      notify('')
                      navigate('jamo-digeut')
                    }}
                  />
                )
              })}
              {!items.length && (
                <p className={styles.secondaryText}>{t('표시할 자모가 없어요.')}</p>
              )}
            </div>
          </Panel>
        ))}
      </div>
      <MainNavigation
        screen={screen}
        home={homeScreen(preferences.mode)}
        onNavigate={(destination) => {
          notify('')
          navigate(destination)
        }}
      />
    </div>
  )
}
