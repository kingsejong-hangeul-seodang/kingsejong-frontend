import { useNextContent } from './hooks/useNextContent'
import { SejongMessage } from '@/components/SejongMessage'
import { AppBar } from '@/components/ui/AppBar'
import { Button } from '@/components/ui/Button'
import { SubmittedWriting } from '@/components/writing/SubmittedWriting'
import { useSession, type Stage } from '@/app/useSession'
import { navigate } from '@/app/router'
import { homeScreen } from '@/app/learningFlow'
import { shapeFeedback } from '@/data/writingFeedback'
import styles from '@/styles/screens.module.css'
import layout from './FigmaLearning.module.css'
import learningStyles from './LearningScreens.module.css'

export function WritingResultScreen({ stage }: { stage?: Stage }) {
  const { screen, draft, practiceTarget, preferences, beginAttempt, notify, resultOrigin } =
    useSession()
  const { goNext, label: nextLabel, mode } = useNextContent()
  const currentStage = stage ?? draft?.stage ?? preferences.stage
  const current = draft?.stage === currentStage ? draft : null
  const grade =
    current?.grade && !current.grade.engineVersion.endsWith('stub') ? current.grade : null
  const reward = grade ? current?.reward : undefined
  const finished = Boolean(grade?.perfect)
  const strokeCount = grade?.cells.filter((cell) => cell.mark === 'stroke').length ?? 0
  const strokeOnly = Boolean(
    grade?.correct && !finished && strokeCount && currentStage !== 'beginner',
  )
  const wrongWords = grade?.words.filter((word) => !word.correct).length ?? 0
  const showStatus = grade && (finished || currentStage !== 'beginner')
  const hasShape = finished && shapeFeedback(current).length > 0
  const nextAction = reward?.leveledUp ? () => navigate('levelup') : goNext

  let caption: string | null = null
  if (grade && !finished) {
    if (currentStage === 'beginner') {
      const correctLetters = grade.cells.filter((cell) => cell.charCorrect).length
      caption = `글자 ${correctLetters}개 맞음${strokeCount ? ` · 획순 ${strokeCount}곳` : ''}`
    } else if (currentStage === 'mid') {
      if (strokeOnly) caption = '글자와 띄어쓰기는 모두 맞았어요'
      else if (wrongWords) caption = `어절 ${grade.words.length}개 중 ${wrongWords}개가 달라요`
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
        title="결과"
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
                ? '띄어쓰기까지 다 맞았어요!'
                : '글자는 다 맞았어요!'
              : (grade?.sejong.text ?? '쓴 글씨를 확인해 보세요')
          }
          description={
            strokeOnly
              ? currentStage === 'pro'
                ? '쓰는 순서가 다른 글자가 있어요. 정답 보기에서 확인해 볼까요?'
                : '쓰는 순서가 다른 글자가 있어요. 어느 글자일까요?'
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
                {finished ? '다 맞았어요' : grade.correct ? '맞았어요' : '틀렸어요'}
              </p>
              {strokeOnly && (
                <p className={styles.secondaryText}>
                  쓰는 순서가 다른 글자가 {strokeCount}개 있어요
                  {reward?.expGained ? ` · +${reward.expGained} EXP` : ''}
                </p>
              )}
              {!grade.correct && (
                <p className={styles.secondaryText}>
                  {currentStage === 'mid'
                    ? '빨간 상자가 다른 어절이에요'
                    : '글자나 띄어쓰기 중 다른 곳이 있어요'}
                </p>
              )}
              {finished && reward?.items.length ? (
                <ul className={learningStyles.rewardBadges}>
                  {reward.items.map((item) => (
                    <li key={item.reason}>
                      +{item.exp} EXP{item.reason === 'perfect' ? ' 오류 없음' : ''}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        )}
        <div className={learningStyles.resultPaper}>
          <SubmittedWriting stage={stage} caption={caption} />
          {grade && !finished && currentStage === 'beginner' && (
            <div className={`${layout.legend} ${learningStyles.resultLegend}`}>
              <span>
                <i />
                빨간 상자 — 글자가 달라요
              </span>
              <span>
                <i />
                주황 상자 — 쓰는 순서가 달라요
              </span>
            </div>
          )}
        </div>
      </div>
      <div className={styles.footer} data-name="cta">
        <div className={layout.completionActions}>
          {hasShape && (
            <Button variant="text" onClick={handleCompare}>
              정답 보기
            </Button>
          )}
          <div className={styles.buttonRow}>
            <Button
              className={styles.secondaryAction}
              variant="secondary"
              data-action="버튼/보조"
              onClick={finished ? () => navigate(homeScreen(mode)) : handleCompare}
            >
              {finished ? '홈으로' : '정답 보기'}
            </Button>
            <Button
              className={styles.primaryAction}
              data-action="버튼/주"
              onClick={grade && !finished ? handleRetry : nextAction}
            >
              {grade && !finished ? '다시 쓰기' : nextLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
