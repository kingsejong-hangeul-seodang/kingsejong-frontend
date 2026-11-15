import { SubmitButton } from '@/components/ui/SubmitButton'
import { Panel } from '@/components/ui/Panel'
import { SejongMessage } from '@/components/SejongGuide/SejongMessage'
import { PracticePaper } from '@/components/WritingBoard/PracticePaper'

import { WritingTools } from '@/components/WritingBoard/WritingTools'

import { AppBar } from '@/components/ui/AppBar'
import styles from '@/styles/screens.module.css'

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
        <SejongMessage
          className={styles.say72}
          title={'‘가 나 다’를 써 볼까요?'}
          description={'따라 쓸 글자 없이, 한 칸에 한 글자씩 써요.'}
          src={'/assets/figma/fc462.png'}
          vertical={false}
          characterWidth={120}
          characterHeight={191.8}
        />
        <PracticePaper count={3} columns={3} cellSize={144} />
        <WritingTools />
        <Panel className={styles.block88} data-node-id="67:955" data-name="block">
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
        </Panel>
      </div>
      <div className={styles.cta27} data-node-id="67:969" data-name="cta">
        <SubmitButton className={styles.element28} />
      </div>
    </div>
  )
}
