import { ComparisonPaper } from '@/components/WritingBoard/ComparisonPaper'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { SejongMessage } from '@/components/SejongGuide/SejongMessage'
import { AnswerPaper } from '@/components/WritingBoard/AnswerPaper'
import { SubmittedWriting } from '@/components/WritingBoard/SubmittedWriting'

import { AppBar } from '@/components/ui/AppBar'
import styles from '@/styles/screens.module.css'
import { Action } from '@/components/ui/Action'

const imgIcon1 = '/assets/figma/2ab6e.svg'

export default function CompareBeginner() {
  return (
    <div
      className={styles.leveltest1163}
      data-node-id="67:2027"
      data-name="compare-beginner — 정답 비교 · 초보"
    >
      <AppBar title="정답 비교" />
      <div className={styles.page67} data-node-id="67:2033" data-name="page">
        <SejongMessage
          className={styles.say72}
          title={'위는 내가 쓴 글, 아래는 정답이에요'}
          description={'쓰는 순서대로 보여 드려요. 칸을 누르면 그 글자만 볼 수 있어요.'}
          src={'/assets/figma/fc462.png'}
          vertical={false}
          characterWidth={120}
          characterHeight={191.8}
        />
        <ComparisonPaper className={styles.vs268} data-node-id="67:2041" data-name="vs">
          <div className={styles.vsLine269} data-name="vs-line">
            <p className={styles.element37}>내가 쓴 글</p>
            <SubmittedWriting stage="beginner" compact />
          </div>
          <div className={styles.vsLine272} data-name="vs-line">
            <p className={styles.element37}>정답</p>
            <AnswerPaper stage="beginner" />
          </div>
          <div className={styles.player274} data-node-id="67:2071" data-name="player">
            <Action
              className={styles.btn275}
              data-node-id="67:2072"
              data-name="btn"
              kind="btn"
              label="처음부터 다시 보기"
            >
              <div className={styles.icon86} data-node-id="67:2073" data-name="icon">
                <img alt="" className={styles.element7} src={imgIcon1} />
              </div>
              <p className={styles.element276} data-node-id="67:2075">
                처음부터 다시 보기
              </p>
            </Action>
            <ProgressBar className={styles.xp277} value={100} label="정답 보기 진행률" />
            <p className={styles.element37} data-node-id="67:2078">
              2 / 2칸
            </p>
          </div>
        </ComparisonPaper>
      </div>
      <div className={styles.cta27} data-node-id="67:2093" data-name="cta">
        <div className={styles.actions105} data-node-id="67:2094" data-name="actions">
          <Action
            className={styles.element106}
            data-node-id="67:2095"
            data-name="버튼/보조"
            kind="버튼/보조"
            label="다시 쓰기"
          >
            <p className={styles.element107} data-node-id="I67:2095;19:43">
              다시 쓰기
            </p>
          </Action>
          <Action
            className={styles.element108}
            data-node-id="67:2097"
            data-name="버튼/주"
            kind="버튼/주"
            label="다음으로"
          >
            <p className={styles.element29} data-node-id="I67:2097;19:41">
              다음으로
            </p>
          </Action>
        </div>
      </div>
    </div>
  )
}
