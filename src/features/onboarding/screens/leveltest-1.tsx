import { WritingProgress } from '@/components/WritingBoard/WritingProgress'
import { WritingTools } from '@/components/WritingBoard/WritingTools'
import { SejongGuide } from '@/components/SejongGuide/SejongGuide'
import { AppBar } from '@/components/ui/AppBar'
import styles from '@/styles/screens.module.css'
import { Action } from '@/components/ui/Action'
import { WritingCell } from '@/components/WritingBoard/WritingCell'

const img = '/assets/figma/fc462.png'

function SubmitButton({ className }: { className?: string | undefined }) {
  return (
    <Action
      className={className || styles.element58}
      data-node-id="19:358"
      data-name="버튼/주"
      kind="버튼/주"
      label="다 썼어요"
    >
      <p className={styles.element29} data-node-id="19:41">
        다 썼어요
      </p>
    </Action>
  )
}

function EmptyCell({ className }: { className?: string | undefined }) {
  return (
    <WritingCell
      className={className || styles.element59}
      data-node-id="19:372"
      data-name="원고지 칸/빈 칸"
    >
      <div className={styles.before60} data-node-id="19:102" data-name="::before">
        <div className={styles.Rectangle61} data-node-id="19:103" data-name="Rectangle" />
        <div className={styles.Rectangle62} data-node-id="19:104" data-name="Rectangle" />
      </div>
    </WritingCell>
  )
}

export default function Leveltest11() {
  return (
    <div
      className={styles.leveltest1163}
      data-node-id="67:902"
      data-name="leveltest-1 — 레벨 테스트 1 · 가나다"
    >
      <AppBar title="레벨 테스트" />
      <div className={styles.page67} data-node-id="67:908" data-name="page">
        <div className={styles.hero4} data-node-id="67:909" data-name="hero">
          <div className={styles.progress68} data-node-id="67:910" data-name="progress">
            <div className={styles.isOn69} data-node-id="67:911" data-name="is-on" />
            <div className={styles.span70} data-node-id="67:912" data-name="span" />
            <div className={styles.span70} data-node-id="67:913" data-name="span" />
          </div>
          <p className={styles.element37} data-node-id="67:914">
            3단계 중 1단계
          </p>
          <p className={styles.element71} data-node-id="67:915">
            가나다 쓰기
          </p>
        </div>
        <div className={styles.say72} data-node-id="67:916" data-name="say">
          <SejongGuide className={styles.element73} src={img} variant="기본" />
          <div className={styles.bubble74} data-node-id="67:919" data-name="bubble">
            <div className={styles.element75} data-node-id="67:920">
              <div className={styles.element18}>
                <div className={styles.before19} data-name="::before" />
              </div>
            </div>
            <p className={styles.element76} data-node-id="67:921">
              ‘가 나 다’를 써 볼까요?
            </p>
            <p className={styles.element77} data-node-id="67:922">
              따라 쓸 글자 없이, 한 칸에 한 글자씩 써요.
            </p>
          </div>
        </div>
        <div className={styles.wongoji78} data-node-id="67:923" data-name="wongoji">
          <div className={styles.wgRow79} data-node-id="67:924" data-name="wg-row">
            <WritingCell
              className={styles.element80}
              data-node-id="67:925"
              data-name="원고지 칸/쓴 글씨"
            >
              <div className={styles.before60} data-node-id="I67:925;19:107" data-name="::before">
                <div
                  className={styles.Rectangle61}
                  data-node-id="I67:925;19:108"
                  data-name="Rectangle"
                />
                <div
                  className={styles.Rectangle62}
                  data-node-id="I67:925;19:109"
                  data-name="Rectangle"
                />
              </div>
              <p className={styles.element81} data-node-id="I67:925;19:110">
                가
              </p>
            </WritingCell>
            <WritingCell
              className={styles.element80}
              data-node-id="67:930"
              data-name="원고지 칸/쓴 글씨"
            >
              <div className={styles.before60} data-node-id="I67:930;19:107" data-name="::before">
                <div
                  className={styles.Rectangle61}
                  data-node-id="I67:930;19:108"
                  data-name="Rectangle"
                />
                <div
                  className={styles.Rectangle62}
                  data-node-id="I67:930;19:109"
                  data-name="Rectangle"
                />
              </div>
              <p className={styles.element81} data-node-id="I67:930;19:110">
                나
              </p>
            </WritingCell>
            <EmptyCell className={styles.element82} />
          </div>
          <WritingProgress className={styles.element83} data-node-id="67:939" total={3} />
        </div>
        <WritingTools />
        <div className={styles.block88} data-node-id="67:955" data-name="block">
          <div className={styles.field36} data-node-id="67:956" data-name="steps">
            <div className={styles.step89} data-node-id="67:957" data-name="step">
              <div className={styles.stepNum90} data-node-id="67:958" data-name="step-num">
                <p className={styles.element91} data-node-id="67:959">
                  1
                </p>
              </div>
              <p className={styles.element92} data-node-id="67:960">
                가나다 쓰기 · 지금
              </p>
            </div>
            <div className={styles.step89} data-node-id="67:961" data-name="step">
              <div className={styles.stepNum90} data-node-id="67:962" data-name="step-num">
                <p className={styles.element91} data-node-id="67:963">
                  2
                </p>
              </div>
              <p className={styles.element92} data-node-id="67:964">
                단어 쓰기
              </p>
            </div>
            <div className={styles.step89} data-node-id="67:965" data-name="step">
              <div className={styles.stepNum90} data-node-id="67:966" data-name="step-num">
                <p className={styles.element91} data-node-id="67:967">
                  3
                </p>
              </div>
              <p className={styles.element92} data-node-id="67:968">
                짧은 문장 쓰기
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.cta27} data-node-id="67:969" data-name="cta">
        <SubmitButton className={styles.element28} />
      </div>
    </div>
  )
}
