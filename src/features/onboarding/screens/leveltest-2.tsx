import { SubmitButton } from '@/components/ui/SubmitButton'
import { Badge } from '@/components/ui/Badge'
import { Panel } from '@/components/ui/Panel'
import { SejongMessage } from '@/components/SejongGuide/SejongMessage'
import { PracticePaper } from '@/components/WritingBoard/PracticePaper'

import { WritingTools } from '@/components/WritingBoard/WritingTools'

import { AppBar } from '@/components/ui/AppBar'
import styles from '@/styles/screens.module.css'

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
        <SejongMessage
          className={styles.say72}
          title={'‘바다’를 써 볼까요?'}
          description={'따라 쓸 글자 없이, 한 칸에 한 글자씩 써요.'}
          src={'/assets/figma/fc462.png'}
          vertical={false}
          characterWidth={120}
          characterHeight={191.8}
        />
        <PracticePaper count={2} columns={2} cellSize={144} />
        <WritingTools />
        <Panel className={styles.block88} data-node-id="67:1020" data-name="block">
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
              <Badge className={styles.element93} tone="success">
                {'완료'}
              </Badge>
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
        </Panel>
      </div>
      <div className={styles.cta27} data-node-id="67:1036" data-name="cta">
        <SubmitButton className={styles.element28} />
      </div>
    </div>
  )
}
