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

export default function Leveltest22() {
  return (
    <div
      className={styles.leveltest1163}
      data-node-id="67:972"
      data-name="leveltest-2 — 레벨 테스트 2 · 단어"
    >
      <AppBar title="레벨 테스트" />
      <div className={styles.page67} data-node-id="67:978" data-name="page">
        <div className={styles.hero4} data-node-id="67:979" data-name="hero">
          <div className={styles.progress68} data-node-id="67:980" data-name="progress">
            <div className={styles.isOn69} data-node-id="67:981" data-name="is-on" />
            <div className={styles.isOn69} data-node-id="67:982" data-name="is-on" />
            <div className={styles.span70} data-node-id="67:983" data-name="span" />
          </div>
          <p className={styles.element37} data-node-id="67:984">
            3단계 중 2단계
          </p>
          <p className={styles.element71} data-node-id="67:985">
            단어 쓰기
          </p>
        </div>
        <div className={styles.say72} data-node-id="67:986" data-name="say">
          <SejongGuide className={styles.element73} src={img} variant="기본" />
          <div className={styles.bubble74} data-node-id="67:989" data-name="bubble">
            <div className={styles.element75} data-node-id="67:990">
              <div className={styles.element18}>
                <div className={styles.before19} data-name="::before" />
              </div>
            </div>
            <p className={styles.element76} data-node-id="67:991">
              ‘바다’를 써 볼까요?
            </p>
            <p className={styles.element77} data-node-id="67:992">
              따라 쓸 글자 없이, 한 칸에 한 글자씩 써요.
            </p>
          </div>
        </div>
        <div className={styles.wongoji78} data-node-id="67:993" data-name="wongoji">
          <div className={styles.wgRow79} data-node-id="67:994" data-name="wg-row">
            <WritingCell
              className={styles.element80}
              data-node-id="67:995"
              data-name="원고지 칸/쓴 글씨"
            >
              <div className={styles.before60} data-node-id="I67:995;19:107" data-name="::before">
                <div
                  className={styles.Rectangle61}
                  data-node-id="I67:995;19:108"
                  data-name="Rectangle"
                />
                <div
                  className={styles.Rectangle62}
                  data-node-id="I67:995;19:109"
                  data-name="Rectangle"
                />
              </div>
              <p className={styles.element81} data-node-id="I67:995;19:110">
                바
              </p>
            </WritingCell>
            <EmptyCell className={styles.element82} />
          </div>
          <WritingProgress className={styles.element83} data-node-id="67:1004" total={2} />
        </div>
        <WritingTools />
        <div className={styles.block88} data-node-id="67:1020" data-name="block">
          <div className={styles.field36} data-node-id="67:1021" data-name="steps">
            <div className={styles.step89} data-node-id="67:1022" data-name="step">
              <div className={styles.stepNum90} data-node-id="67:1023" data-name="step-num">
                <p className={styles.element91} data-node-id="67:1024">
                  1
                </p>
              </div>
              <p className={styles.element92} data-node-id="67:1025">
                가나다 쓰기
              </p>
              <div className={styles.element93} data-node-id="67:1026" data-name="배지/맞음">
                <p className={styles.element94} data-node-id="I67:1026;19:63">
                  완료
                </p>
              </div>
            </div>
            <div className={styles.step89} data-node-id="67:1028" data-name="step">
              <div className={styles.stepNum90} data-node-id="67:1029" data-name="step-num">
                <p className={styles.element91} data-node-id="67:1030">
                  2
                </p>
              </div>
              <p className={styles.element92} data-node-id="67:1031">
                단어 쓰기 · 지금
              </p>
            </div>
            <div className={styles.step89} data-node-id="67:1032" data-name="step">
              <div className={styles.stepNum90} data-node-id="67:1033" data-name="step-num">
                <p className={styles.element91} data-node-id="67:1034">
                  3
                </p>
              </div>
              <p className={styles.element92} data-node-id="67:1035">
                짧은 문장 쓰기
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.cta27} data-node-id="67:1036" data-name="cta">
        <SubmitButton className={styles.element28} />
      </div>
    </div>
  )
}
