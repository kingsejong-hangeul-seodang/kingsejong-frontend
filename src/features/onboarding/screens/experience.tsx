import { ChoiceCard } from '@/components/ui/ChoiceCard'
import { SejongMessage } from '@/components/SejongGuide/SejongMessage'

import { AppBar } from '@/components/ui/AppBar'
import styles from '@/styles/screens.module.css'
import { Action } from '@/components/ui/Action'

export default function Experience() {
  return (
    <div className={styles.lang2} data-node-id="67:850" data-name="experience — 한글 경험">
      <AppBar title="" />
      <div className={styles.page33} data-node-id="67:855" data-name="page">
        <SejongMessage
          className={styles.say14}
          title={'한글을 써 본 적 있나요?'}
          description={'동국에게 맞는 곳에서 시작할게요.'}
          src={'/assets/figma/fc462.png'}
          vertical={true}
          characterWidth={200}
          characterHeight={319.6}
        />
        <div className={styles.choices22} data-node-id="67:863" data-name="choices">
          <ChoiceCard
            className={styles.element26}
            data-node-id="67:864"
            data-name="선택 카드/기본"
            kind="선택 카드/기본"
            label="처음 배워요 자음·모음부터 따라 써요"
          >
            <p className={styles.element24} data-node-id="I67:864;19:257">
              처음 배워요
            </p>
            <p className={styles.element25} data-node-id="I67:864;19:258">
              자음·모음부터 따라 써요
            </p>
          </ChoiceCard>
          <ChoiceCard
            className={styles.element23}
            data-node-id="67:867"
            data-name="선택 카드/선택"
            kind="선택 카드/선택"
            label="공부해 봤어요 내 단계를 골라요"
          >
            <p className={styles.element24} data-node-id="I67:867;19:253">
              공부해 봤어요
            </p>
            <p className={styles.element25} data-node-id="I67:867;19:254">
              내 단계를 골라요
            </p>
          </ChoiceCard>
        </div>
      </div>
      <div className={styles.cta27} data-node-id="67:870" data-name="cta">
        <Action
          className={styles.element28}
          data-node-id="67:871"
          data-name="버튼/주"
          kind="버튼/주"
          label="다음"
        >
          <p className={styles.element29} data-node-id="I67:871;19:41">
            다음
          </p>
        </Action>
      </div>
    </div>
  )
}
