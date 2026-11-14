import { SejongGuide } from '@/components/SejongGuide/SejongGuide'
import { AppBar } from '@/components/ui/AppBar'
import styles from '@/styles/screens.module.css'
import { Action } from '@/components/ui/Action'

const img = '/assets/figma/fc462.png'

function TextLink({ className }: { className?: string | undefined }) {
  return (
    <Action
      className={className || styles.element48}
      data-node-id="19:363"
      data-name="글자 링크"
      kind="글자 링크"
      label="레벨 테스트 해 보기"
    >
      <p className={styles.element49} data-node-id="19:54">
        레벨 테스트 해 보기
      </p>
    </Action>
  )
}

function SelectedChoice({ className }: { className?: string | undefined }) {
  return (
    <Action
      className={className || styles.element50}
      data-node-id="19:391"
      data-name="선택 카드/선택"
      kind="선택 카드/선택"
      label="중수 가이드 없이 써요 · 두세 어절"
    >
      <p className={styles.element24} data-node-id="19:253">
        중수
      </p>
      <p className={styles.element25} data-node-id="19:254">
        가이드 없이 써요 · 두세 어절
      </p>
    </Action>
  )
}

function Choice({ className }: { className?: string | undefined }) {
  return (
    <Action
      className={className || styles.element51}
      data-node-id="19:392"
      data-name="선택 카드/기본"
      kind="선택 카드/기본"
      label="초보 회색 글자를 따라 써요 · 단어 하나"
    >
      <p className={styles.element24} data-node-id="19:257">
        초보
      </p>
      <p className={styles.element25} data-node-id="19:258">
        회색 글자를 따라 써요 · 단어 하나
      </p>
    </Action>
  )
}

export default function StageSelect() {
  return (
    <div className={styles.lang2} data-node-id="67:873" data-name="stage-select — 난이도 고르기">
      <AppBar title="" />
      <div className={styles.page33} data-node-id="67:878" data-name="page">
        <div className={styles.say14} data-node-id="67:879" data-name="say">
          <SejongGuide className={styles.element15} src={img} variant="기본" />
          <div className={styles.bubble16} data-node-id="67:882" data-name="bubble">
            <div className={styles.element52} data-node-id="67:883">
              <div className={styles.element18}>
                <div className={styles.before19} data-name="::before" />
              </div>
            </div>
            <p className={styles.element20} data-node-id="67:884">
              어느 단계부터 쓸까요?
            </p>
            <p className={styles.element21} data-node-id="67:885">
              언제든 바꿀 수 있어요.
            </p>
          </div>
        </div>
        <div className={styles.choices53} data-node-id="67:886" data-name="choices">
          <Choice className={styles.element54} />
          <SelectedChoice className={styles.element55} />
          <Action
            className={styles.element54}
            data-node-id="67:893"
            data-name="선택 카드/기본"
            kind="선택 카드/기본"
            label="고수 칸만 보고 문장을 써요 · 띄어쓰기까지"
          >
            <p className={styles.element24} data-node-id="I67:893;19:257">
              고수
            </p>
            <p className={styles.element25} data-node-id="I67:893;19:258">
              칸만 보고 문장을 써요 · 띄어쓰기까지
            </p>
          </Action>
        </div>
        <div className={styles.center56} data-node-id="67:896" data-name="center">
          <TextLink className={styles.element57} />
        </div>
      </div>
      <div className={styles.cta27} data-node-id="67:899" data-name="cta">
        <Action
          className={styles.element28}
          data-node-id="67:900"
          data-name="버튼/주"
          kind="버튼/주"
          label="이 단계로 시작"
        >
          <p className={styles.element29} data-node-id="I67:900;19:41">
            이 단계로 시작
          </p>
        </Action>
      </div>
    </div>
  )
}
