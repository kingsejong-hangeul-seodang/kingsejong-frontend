import { SejongGuide } from '@/components/SejongGuide/SejongGuide'
import { AppBar } from '@/components/ui/AppBar'
import styles from '@/styles/screens.module.css'
import { Action } from '@/components/ui/Action'
import { CodeField } from '@/features/onboarding/CodeField'

const img = '/assets/figma/fc462.png'

const imgIcon1 = '/assets/figma/fb114.svg'

export default function Login() {
  return (
    <div className={styles.lang2} data-node-id="67:820" data-name="login — 로그인 코드">
      <AppBar title="" />
      <div className={styles.page33} data-node-id="67:825" data-name="page">
        <div className={styles.say14} data-node-id="67:826" data-name="say">
          <SejongGuide className={styles.element15} src={img} variant="기본" />
          <div className={styles.bubble16} data-node-id="67:829" data-name="bubble">
            <div className={styles.element34} data-node-id="67:830">
              <div className={styles.element18}>
                <div className={styles.before19} data-name="::before" />
              </div>
            </div>
            <p className={styles.element20} data-node-id="67:831">
              코드를 알려 주세요
            </p>
            <p className={styles.element21} data-node-id="67:832">
              선생님께 받은 코드를 넣어 주세요.
            </p>
          </div>
        </div>
        <div className={styles.block35} data-node-id="67:833" data-name="block">
          <div className={styles.field36} data-node-id="67:834" data-name="field">
            <p className={styles.element37} data-node-id="67:835">
              로그인 코드
            </p>
            <CodeField className={styles.input38} data-node-id="67:836" data-name="input" />
          </div>
          <div className={styles.row40} data-node-id="67:838" data-name="row">
            <div className={styles.rowMain41} data-node-id="67:839" data-name="row-main">
              <p className={styles.element42} data-node-id="67:840">
                쓴 글씨를 저장해도 좋아요
              </p>
              <p className={styles.element25} data-node-id="67:841">
                글씨 교정과 학습 기록에만 써요
              </p>
            </div>
            <div className={styles.rowTrail43} data-node-id="67:842" data-name="row-trail">
              <Action
                className={styles.check44}
                data-node-id="67:843"
                data-name="check"
                kind="check"
                label="check"
              >
                <div className={styles.span45} data-node-id="67:844" data-name="span">
                  <div className={styles.icon46} data-node-id="67:845" data-name="icon">
                    <img alt="" className={styles.element7} src={imgIcon1} />
                  </div>
                </div>
              </Action>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.cta27} data-node-id="67:847" data-name="cta">
        <Action
          className={styles.element28}
          data-node-id="67:848"
          data-name="버튼/주"
          kind="버튼/주"
          label="들어가기"
        >
          <p className={styles.element29} data-node-id="I67:848;19:41">
            들어가기
          </p>
        </Action>
      </div>
    </div>
  )
}
