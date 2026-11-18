import { SubmitButton } from '@/components/ui/SubmitButton'
import { Badge } from '@/components/ui/Badge'
import { Panel } from '@/components/ui/Panel'
import { SejongMessage } from '@/components/SejongGuide/SejongMessage'
import { PracticePaper } from '@/components/WritingBoard/PracticePaper'

import { WritingTools } from '@/components/WritingBoard/WritingTools'

import { AppBar } from '@/components/ui/AppBar'
import styles from '@/styles/screens.module.css'

export default function Leveltest33() {
  return (
    <div
      className={styles.leveltest1163}
      data-node-id="67:1039"
      data-name="leveltest-3 — 레벨 테스트 3 · 짧은 문장"
    >
      <AppBar title="레벨 테스트" />
      <div className={styles.page67} data-node-id="67:1045" data-name="page">
        <div className={styles.hero4} data-node-id="67:1046" data-name="hero">
          <div className={styles.progress68} data-node-id="67:1047" data-name="progress">
            <div className={styles.isOn69} data-node-id="67:1048" data-name="is-on" />
            <div className={styles.isOn69} data-node-id="67:1049" data-name="is-on" />
            <div className={styles.isOn69} data-node-id="67:1050" data-name="is-on" />
          </div>
          <p className={styles.element37} data-node-id="67:1051">
            3단계 중 3단계
          </p>
          <p className={styles.element71} data-node-id="67:1052">
            짧은 문장 쓰기
          </p>
        </div>
        <SejongMessage
          className={styles.say72}
          title={'‘바다 보러 가요’를 써 볼까요?'}
          description={'띄어 쓸 자리는 한 칸 비워요.'}
          src={'/assets/figma/fc462.png'}
          vertical={false}
          characterWidth={120}
          characterHeight={191.8}
        />
        <PracticePaper count={9} columns={9} cellSize={72} />
        <WritingTools />
        <Panel className={styles.block88} data-node-id="67:1122" data-name="block">
          <div className={styles.field36} data-node-id="67:1123" data-name="steps">
            <div className={styles.step89} data-node-id="67:1124" data-name="step">
              <div className={styles.stepNum90} data-node-id="67:1125" data-name="step-num">
                <p className={styles.element91} data-node-id="67:1126">
                  1
                </p>
              </div>
              <p className={styles.element92} data-node-id="67:1127">
                가나다 쓰기
              </p>
              <Badge className={styles.element93} tone="success">
                {'완료'}
              </Badge>
            </div>
            <div className={styles.step89} data-node-id="67:1130" data-name="step">
              <div className={styles.stepNum90} data-node-id="67:1131" data-name="step-num">
                <p className={styles.element91} data-node-id="67:1132">
                  2
                </p>
              </div>
              <p className={styles.element92} data-node-id="67:1133">
                단어 쓰기
              </p>
              <Badge className={styles.element93} tone="success">
                {'완료'}
              </Badge>
            </div>
            <div className={styles.step89} data-node-id="67:1136" data-name="step">
              <div className={styles.stepNum90} data-node-id="67:1137" data-name="step-num">
                <p className={styles.element91} data-node-id="67:1138">
                  3
                </p>
              </div>
              <p className={styles.element92} data-node-id="67:1139">
                짧은 문장 쓰기 · 지금
              </p>
            </div>
          </div>
        </Panel>
      </div>
      <div className={styles.cta27} data-node-id="67:1140" data-name="cta">
        <SubmitButton className={styles.element28} />
      </div>
    </div>
  )
}
