import { ChoiceCard } from '@/components/ui/ChoiceCard'
import { SejongMessage } from '@/components/SejongGuide/SejongMessage'

import styles from '@/styles/screens.module.css'
import { Action } from '@/components/ui/Action'

const img1 = '/assets/figma/45b63.svg'
const img2 = '/assets/figma/4d2e5.svg'
const img3 = '/assets/figma/ebd09.svg'
const img4 = '/assets/figma/b8c52.svg'
const img5 = '/assets/figma/ea1da.svg'
const img6 = '/assets/figma/3d94a.svg'
const img7 = '/assets/figma/3159d.svg'

export default function Lang() {
  return (
    <div className={styles.lang2} data-node-id="67:792" data-name="lang — 언어 선택">
      <div className={styles.page3} data-node-id="67:793" data-name="page">
        <div className={styles.hero4} data-node-id="67:794" data-name="hero">
          <div
            className={styles.element5}
            data-node-id="67:795"
            data-name="동국체: 킹세종 한글서당"
          >
            <div className={styles.element6} data-node-id="67:796" data-name="킹">
              <img alt="" className={styles.element7} src={img1} />
            </div>
            <div className={styles.element8} data-node-id="67:797" data-name="세">
              <img alt="" className={styles.element7} src={img2} />
            </div>
            <div className={styles.element9} data-node-id="67:798" data-name="종">
              <img alt="" className={styles.element7} src={img3} />
            </div>
            <div className={styles.element10} data-node-id="67:799" data-name="한">
              <img alt="" className={styles.element7} src={img4} />
            </div>
            <div className={styles.element11} data-node-id="67:800" data-name="글">
              <img alt="" className={styles.element7} src={img5} />
            </div>
            <div className={styles.element12} data-node-id="67:801" data-name="서">
              <img alt="" className={styles.element7} src={img6} />
            </div>
            <div className={styles.element13} data-node-id="67:802" data-name="당">
              <img alt="" className={styles.element7} src={img7} />
            </div>
          </div>
        </div>
        <SejongMessage
          className={styles.say14}
          title={'어서 오세요, 한글서당이에요'}
          description={'어떤 말로 안내할까요?'}
          src={'/assets/figma/fc462.png'}
          vertical={true}
          characterWidth={200}
          characterHeight={319.6}
        />
        <div className={styles.choices22} data-node-id="67:810" data-name="choices">
          <ChoiceCard
            className={styles.element23}
            data-node-id="67:811"
            data-name="선택 카드/선택"
            kind="선택 카드/선택"
            label="한국어 한국어로 안내해요"
          >
            <p className={styles.element24} data-node-id="I67:811;19:253">
              한국어
            </p>
            <p className={styles.element25} data-node-id="I67:811;19:254">
              한국어로 안내해요
            </p>
          </ChoiceCard>
          <ChoiceCard
            className={styles.element26}
            data-node-id="67:814"
            data-name="선택 카드/기본"
            kind="선택 카드/기본"
            label="English 영어로 안내해요"
          >
            <p className={styles.element24} data-node-id="I67:814;19:257">
              English
            </p>
            <p className={styles.element25} data-node-id="I67:814;19:258">
              영어로 안내해요
            </p>
          </ChoiceCard>
        </div>
      </div>
      <div className={styles.cta27} data-node-id="67:817" data-name="cta">
        <Action
          className={styles.element28}
          data-node-id="67:818"
          data-name="버튼/주"
          kind="버튼/주"
          label="시작하기"
        >
          <p className={styles.element29} data-node-id="I67:818;19:41">
            시작하기
          </p>
        </Action>
      </div>
    </div>
  )
}
