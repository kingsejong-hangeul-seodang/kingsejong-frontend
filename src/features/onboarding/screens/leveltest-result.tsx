import { SejongGuide } from '@/components/SejongGuide/SejongGuide'
import { AppBar } from '@/components/ui/AppBar'
import styles from '@/styles/screens.module.css'
import { Action } from '@/components/ui/Action'

const img = '/assets/figma/04d6d.png'

export default function LeveltestResult() {
  return (
    <div
      className={styles.lang2}
      data-node-id="67:1143"
      data-name="leveltest-result — 레벨 테스트 결과"
    >
      <AppBar title="레벨 테스트 결과" />
      <div className={styles.page33} data-node-id="67:1149" data-name="page">
        <div className={styles.say14} data-node-id="67:1150" data-name="say">
          <SejongGuide className={styles.element101} src={img} variant="칭찬" />
          <div className={styles.bubble16} data-node-id="67:1153" data-name="bubble">
            <div className={styles.element102} data-node-id="67:1154">
              <div className={styles.element18}>
                <div className={styles.before19} data-name="::before" />
              </div>
            </div>
            <p className={styles.element20} data-node-id="67:1155">
              ‘중수’를 추천해요
            </p>
            <p className={styles.element21} data-node-id="67:1156">
              단어까지는 잘 썼어요. 문장은 조금 더 연습해 봐요.
            </p>
          </div>
        </div>
        <div className={styles.block35} data-node-id="67:1157" data-name="block">
          <div className={styles.field36} data-node-id="67:1158" data-name="steps">
            <div className={styles.step89} data-node-id="67:1159" data-name="step">
              <div className={styles.stepNum90} data-node-id="67:1160" data-name="step-num">
                <p className={styles.element91} data-node-id="67:1161">
                  1
                </p>
              </div>
              <p className={styles.element92} data-node-id="67:1162">
                가나다 쓰기
              </p>
              <div className={styles.element93} data-node-id="67:1163" data-name="배지/맞음">
                <p className={styles.element94} data-node-id="I67:1163;19:63">
                  통과
                </p>
              </div>
            </div>
            <div className={styles.step89} data-node-id="67:1165" data-name="step">
              <div className={styles.stepNum90} data-node-id="67:1166" data-name="step-num">
                <p className={styles.element91} data-node-id="67:1167">
                  2
                </p>
              </div>
              <p className={styles.element92} data-node-id="67:1168">
                단어 쓰기
              </p>
              <div className={styles.element93} data-node-id="67:1169" data-name="배지/맞음">
                <p className={styles.element94} data-node-id="I67:1169;19:63">
                  통과
                </p>
              </div>
            </div>
            <div className={styles.step89} data-node-id="67:1171" data-name="step">
              <div className={styles.stepNum90} data-node-id="67:1172" data-name="step-num">
                <p className={styles.element91} data-node-id="67:1173">
                  3
                </p>
              </div>
              <p className={styles.element92} data-node-id="67:1174">
                짧은 문장 쓰기
              </p>
              <div className={styles.element103} data-node-id="67:1175" data-name="배지/획순">
                <p className={styles.element104} data-node-id="I67:1175;19:65">
                  연습 필요
                </p>
              </div>
            </div>
          </div>
          <p className={styles.element83} data-node-id="67:1177">
            난이도는 홈에서 언제든 바꿀 수 있어요.
          </p>
        </div>
      </div>
      <div className={styles.cta27} data-node-id="67:1178" data-name="cta">
        <div className={styles.actions105} data-node-id="67:1179" data-name="actions">
          <Action
            className={styles.element106}
            data-node-id="67:1180"
            data-name="버튼/보조"
            kind="버튼/보조"
            label="직접 고르기"
          >
            <p className={styles.element107} data-node-id="I67:1180;19:43">
              직접 고르기
            </p>
          </Action>
          <Action
            className={styles.element108}
            data-node-id="67:1182"
            data-name="버튼/주"
            kind="버튼/주"
            label="중수로 시작"
          >
            <p className={styles.element29} data-node-id="I67:1182;19:41">
              중수로 시작
            </p>
          </Action>
        </div>
      </div>
    </div>
  )
}
