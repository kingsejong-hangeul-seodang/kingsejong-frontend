import { SejongMessage } from '@/components/SejongGuide/SejongMessage'
import { ChoiceCard } from '@/components/ui/ChoiceCard'

import { AppBar } from '@/components/ui/AppBar'
import styles from '@/styles/screens.module.css'
import { Action } from '@/components/ui/Action'

export default function StageSelect() {
  return (
    <div className={styles.lang2} data-node-id="67:873" data-name="stage-select — 난이도 고르기">
      <AppBar title="" />
      <div className={styles.page33} data-node-id="67:878" data-name="page">
        <SejongMessage
          className={styles.say14}
          title={'어느 단계부터 쓸까요?'}
          description={'언제든 바꿀 수 있어요.'}
          src={'/assets/figma/fc462.png'}
          vertical={true}
          characterWidth={200}
          characterHeight={319.6}
        />
        <div className={styles.choices53} data-node-id="67:886" data-name="choices">
          <ChoiceCard
            className={styles.element54}
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
          </ChoiceCard>
          <ChoiceCard
            className={styles.element55}
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
          </ChoiceCard>
          <ChoiceCard
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
          </ChoiceCard>
        </div>
        <div className={styles.center56} data-node-id="67:896" data-name="center">
          <Action
            className={styles.element57}
            data-node-id="19:363"
            data-name="글자 링크"
            kind="글자 링크"
            label="레벨 테스트 해 보기"
          >
            <p className={styles.element49} data-node-id="19:54">
              레벨 테스트 해 보기
            </p>
          </Action>
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
