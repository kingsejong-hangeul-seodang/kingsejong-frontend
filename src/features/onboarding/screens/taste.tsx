import { Thumbnail } from '@/components/ui/Thumbnail'
import { ChoiceCard } from '@/components/ui/ChoiceCard'
import { SejongMessage } from '@/components/SejongGuide/SejongMessage'

import { AppBar } from '@/components/ui/AppBar'
import styles from '@/styles/screens.module.css'
import { Action } from '@/components/ui/Action'

const img1 = '/assets/figma/3d07b.png'
const img2 = '/assets/figma/01084.png'

const imgIcon1 = '/assets/figma/4d822.svg'

export default function Taste() {
  return (
    <div className={styles.leveltest1163} data-node-id="67:1224" data-name="taste — 좋아하는 가수">
      <AppBar title="" />
      <div className={styles.page109} data-node-id="67:1229" data-name="page">
        <SejongMessage
          className={styles.say110}
          title={'좋아하는 가수를 골라 주세요'}
          description={'고른 가수의 노래를 먼저 보여 드려요.'}
          src={'/assets/figma/fc462.png'}
          vertical={true}
          characterWidth={200}
          characterHeight={319.6}
        />
        <div className={styles.choices112} data-node-id="67:1237" data-name="choices">
          <ChoiceCard
            className={styles.choice125}
            data-node-id="67:1238"
            data-name="choice"
            kind="choice"
            label="하늘별 봄밤 편지"
          >
            <Thumbnail className={styles.poster126} data-node-id="67:1239" data-name="poster">
              <div className={styles.element127} data-node-id="67:1240" data-name="킹세종 얼굴">
                <img alt="" className={styles.element1} src={img1} />
              </div>
              <div className={styles.icon128} data-node-id="67:1241" data-name="icon">
                <img alt="" className={styles.element7} src={imgIcon1} />
              </div>
            </Thumbnail>
            <p className={styles.element76} data-node-id="67:1245">
              하늘별
            </p>
            <p className={styles.element83} data-node-id="67:1246">
              봄밤 편지
            </p>
          </ChoiceCard>
          <ChoiceCard
            className={styles.choice129}
            data-node-id="67:1247"
            data-name="choice"
            kind="choice"
            label="루나틱 달빛 약속"
          >
            <Thumbnail className={styles.poster130} data-node-id="67:1248" data-name="poster">
              <div className={styles.element131} data-node-id="67:1249" data-name="킹세종 얼굴">
                <img alt="" className={styles.element1} src={img2} />
              </div>
              <div className={styles.icon128} data-node-id="67:1250" data-name="icon">
                <img alt="" className={styles.element7} src={imgIcon1} />
              </div>
            </Thumbnail>
            <p className={styles.element76} data-node-id="67:1254">
              루나틱
            </p>
            <p className={styles.element83} data-node-id="67:1255">
              달빛 약속
            </p>
          </ChoiceCard>
        </div>
      </div>
      <div className={styles.cta27} data-node-id="67:1256" data-name="cta">
        <Action
          className={styles.element28}
          data-node-id="67:1257"
          data-name="버튼/주"
          kind="버튼/주"
          label="서당 들어가기"
        >
          <p className={styles.element29} data-node-id="I67:1257;19:41">
            서당 들어가기
          </p>
        </Action>
      </div>
    </div>
  )
}
