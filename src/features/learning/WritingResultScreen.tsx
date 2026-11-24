import { useUiText } from '@/app/useUiText'
import { useNextContent } from './hooks/useNextContent'
import { SejongMessage } from '@/components/SejongMessage'
import { AppBar } from '@/components/ui/AppBar'
import { Button } from '@/components/ui/Button'
import { SubmittedWriting } from '@/components/writing/SubmittedWriting'
import { useSession, type Stage } from '@/app/useSession'
import { navigate } from '@/app/router'
import { homeScreen } from '@/app/learningFlow'
import { visibleGrade } from '@/data/writingFeedback'
import styles from '@/styles/screens.module.css'
import layout from './FigmaLearning.module.css'
import learningStyles from './LearningScreens.module.css'

export function WritingResultScreen({ stage }: { stage?: Stage }) {
  const t = useUiText()
  const { screen, draft, practiceTarget, preferences, beginAttempt, notify, resultOrigin } =
    useSession()
  const { goNext, label: nextLabel, mode, returnsHome } = useNextContent()
  const currentStage = stage ?? draft?.stage ?? preferences.stage
  const current = draft?.stage === currentStage ? draft : null
  const stub = current?.grade?.engineVersion.endsWith('-stub')
  const grade = visibleGrade(current?.grade)
  const reward = current?.reward
  const finished = Boolean(grade?.perfect)
  const strokeCount = grade?.cells.filter((cell) => cell.mark === 'stroke').length ?? 0
  const strokeOnly = Boolean(
    grade?.correct && !finished && strokeCount && currentStage !== 'beginner',
  )
  const wrongWords = grade?.words.filter((word) => !word.correct).length ?? 0
  const showStatus = grade && (finished || currentStage !== 'beginner')
  const fromRecords = resultOrigin === 'records'
  const showCompletionActions = finished && !fromRecords

  let caption: string | null = null
  if (grade && !finished) {
    if (currentStage === 'beginner') {
      const correctLetters = grade.cells.filter((cell) => cell.charCorrect).length
      caption = [
        t('글자 {0}개 맞음', correctLetters),
        strokeCount ? t('· 획순 {0}곳', strokeCount) : '',
      ]
        .filter(Boolean)
        .join(' ')
    } else if (currentStage === 'mid') {
      if (strokeOnly) caption = t('글자와 띄어쓰기는 모두 맞았어요')
      else if (wrongWords)
        caption = t('어절 {0}개 중 {1}개가 달라요', grade.words.length, wrongWords)
    }
  }

  function handleRetry() {
    beginAttempt(currentStage)
    navigate(`write-${currentStage}`)
  }
  function handleCompare() {
    navigate(`compare-${currentStage}`)
  }

  return (
    <div
      className={styles.screen}
      data-name={`${screen} — 결과`}
      data-node-id={
        finished
          ? '67:1868'
          : strokeOnly
            ? currentStage === 'pro'
              ? '129:861'
              : '129:802'
            : { beginner: '67:1984', mid: '67:2234', pro: '67:2517' }[currentStage]
      }
    >
      <AppBar
        title={t('결과')}
        onBack={() => {
          notify('')
          navigate(resultOrigin ?? (practiceTarget ? 'dogam' : homeScreen(mode)))
        }}
      />
      <div className={styles.pageContent} data-name="page">
        <SejongMessage
          className={styles.guideMessage}
          title={
            strokeOnly
              ? currentStage === 'pro'
                ? t('띄어쓰기까지 다 맞았어요!')
                : t('글자는 다 맞았어요!')
              : (grade?.sejong.text ?? t('쓴 글씨를 확인해 보세요'))
          }
          description={
            strokeOnly
              ? currentStage === 'pro'
                ? t('쓰는 순서가 다른 글자가 있어요. 정답 보기에서 확인해 볼까요?')
                : t('쓰는 순서가 다른 글자가 있어요. 어느 글자일까요?')
              : (grade?.sejong.subText ?? '')
          }
          src={
            finished
              ? '/assets/figma/04d6d.png'
              : grade && !grade.correct
                ? '/assets/figma/319f2.png'
                : '/assets/figma/742ae.png'
          }
          vertical={finished}
          characterWidth={finished ? 188 : 120}
          characterHeight={finished ? 288 : 191.8}
        />
        {showStatus && (
          <div className={learningStyles.resultStatus} data-correct={grade.correct} role="status">
            <span aria-hidden="true">
              <img
                alt=""
                src={
                  finished
                    ? '/assets/figma/de09d.svg'
                    : grade.correct
                      ? '/assets/figma/7ad00.svg'
                      : '/assets/figma/79ef2.svg'
                }
              />
            </span>
            <div>
              <p className={styles.sectionTitle}>
                {finished ? t('다 맞았어요') : grade.correct ? t('맞았어요') : t('틀렸어요')}
              </p>
              {strokeOnly && (
                <p className={styles.secondaryText}>
                  {t('쓰는 순서가 다른 글자가 {0}개 있어요', strokeCount)}
                </p>
              )}
              {!grade.correct && (
                <p className={styles.secondaryText}>
                  {currentStage === 'mid'
                    ? t('빨간 상자가 다른 어절이에요')
                    : t('글자나 띄어쓰기 중 다른 곳이 있어요')}
                </p>
              )}
            </div>
          </div>
        )}
        <div className={learningStyles.resultPaper}>
          <SubmittedWriting stage={stage} caption={caption} />
          {grade && !finished && currentStage === 'beginner' && (
            <div className={`${layout.legend} ${learningStyles.resultLegend}`}>
              <span>
                <i />
                {t('빨간 상자 — 글자가 달라요')}
              </span>
              <span>
                <i />
                {t('주황 상자 — 쓰는 순서가 달라요')}
              </span>
            </div>
          )}
        </div>
        {reward && (
          <div className={styles.panel}>
            {stub && <p className={styles.secondaryText}>{t('테스트 제출 보상')}</p>}
            <p className={styles.sectionTitle}>
              {reward.expGained > 0 && `+${reward.expGained} EXP · `}
              {reward.level.name} {t('· 누적 {0} EXP', reward.level.exp)}
            </p>
            {reward.items.length > 0 && (
              <ul className={learningStyles.rewardBadges}>
                {reward.items.map((item) => (
                  <li key={item.reason}>
                    +{item.exp} EXP · {item.reason === 'perfect' ? t('오류 없음') : t('정답')}
                  </li>
                ))}
              </ul>
            )}
            <p className={styles.secondaryText}>
              {t(
                '연속 학습 {0}일 · 오늘 목표 {1}/{2}',
                reward.streakDays,
                reward.today.done,
                reward.today.goal,
              )}
            </p>
            {reward.stageUpSuggested && currentStage !== 'pro' && (
              <p className={styles.bodyText}>
                {t(
                  '이제 {0} 단계도 도전해 보세요.',
                  t(currentStage === 'beginner' ? '중수' : '고수'),
                )}
              </p>
            )}
          </div>
        )}
      </div>
      <div className={styles.footer} data-name="cta">
        <div className={layout.completionActions}>
          {showCompletionActions && (
            <Button variant="text" onClick={handleCompare}>
              {t('정답 보기')}
            </Button>
          )}
          {grade && reward?.leveledUp && (
            <Button variant="text" onClick={() => navigate('levelup')}>
              {t('레벨 업 보기')}
            </Button>
          )}
          <div className={styles.buttonRow}>
            {(!showCompletionActions || !returnsHome) && (
              <Button
                className={styles.secondaryAction}
                variant="secondary"
                data-action="버튼/보조"
                onClick={showCompletionActions ? () => navigate(homeScreen(mode)) : handleCompare}
              >
                {showCompletionActions ? t('홈으로') : t('정답 보기')}
              </Button>
            )}
            <Button
              className={styles.primaryAction}
              data-action="버튼/주"
              onClick={
                fromRecords ? () => navigate('records') : grade && !finished ? handleRetry : goNext
              }
            >
              {fromRecords ? t('기록으로') : grade && !finished ? t('다시 쓰기') : nextLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
