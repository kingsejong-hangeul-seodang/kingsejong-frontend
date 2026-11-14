import styles from '@/styles/screens.module.css'
import { Action } from '@/components/ui/Action'

const img = '/assets/figma/1f5e2.png'
const imgImg = '/assets/figma/cd9d4.png'
const imgIcon = '/assets/figma/868bf.svg'

export default function Levelup() {
  return (
    <div className={styles.lang2} data-node-id="67:1583" data-name="levelup — 레벨 업">
      <div className={styles.page3} data-node-id="67:1584" data-name="page">
        <div className={styles.say14} data-node-id="67:1585" data-name="say">
          <div className={styles.element190} data-node-id="67:1586" data-name="킹세종">
            <img alt="" className={styles.element1} src={img} />
          </div>
          <div className={styles.bubble16} data-node-id="67:1587" data-name="bubble">
            <div className={styles.element191} data-node-id="67:1588">
              <div className={styles.element18}>
                <div className={styles.before19} data-name="::before" />
              </div>
            </div>
            <p className={styles.element20} data-node-id="67:1589">
              레벨 업! ‘성균관 유생’이 됐어요
            </p>
            <p className={styles.element21} data-node-id="67:1590">
              300 EXP를 모았어요. 킹세종의 붓에서 빛이 나기 시작했어요.
            </p>
          </div>
        </div>
        <div className={styles.block35} data-node-id="67:1591" data-name="block">
          <div className={styles.evo192} data-node-id="67:1592" data-name="evo">
            <div className={styles.evoItem193} data-node-id="67:1593" data-name="evo-item">
              <div className={styles.evoArt194} data-node-id="67:1594" data-name="evo-art">
                <div className={styles.img195} data-node-id="67:1595" data-name="img">
                  <img alt="" className={styles.element1} src={imgImg} />
                </div>
              </div>
              <p className={styles.element196} data-node-id="67:1596">
                서당 입문
              </p>
              <p className={styles.element197} data-node-id="67:1597">
                지금까지
              </p>
            </div>
            <div className={styles.evoArrow198} data-node-id="67:1598" data-name="evo-arrow">
              <div className={styles.icon32} data-node-id="67:1599" data-name="icon">
                <img alt="" className={styles.element7} src={imgIcon} />
              </div>
            </div>
            <div className={styles.evoItem199} data-node-id="67:1601" data-name="evo-item">
              <div className={styles.evoArt200} data-node-id="67:1602" data-name="evo-art">
                <div className={styles.img201} data-node-id="67:1603" data-name="img">
                  <img alt="" className={styles.element1} src={img} />
                </div>
              </div>
              <p className={styles.element196} data-node-id="67:1604">
                성균관 유생
              </p>
              <p className={styles.element197} data-node-id="67:1605">
                이제부터
              </p>
            </div>
          </div>
          <p className={styles.element83} data-node-id="67:1606">
            다음 모습 ‘집현전 학사’까지 500 EXP 남았어요.
          </p>
        </div>
      </div>
      <div className={styles.cta27} data-node-id="67:1607" data-name="cta">
        <div className={styles.actions105} data-node-id="67:1608" data-name="actions">
          <Action
            className={styles.element106}
            data-node-id="67:1609"
            data-name="버튼/보조"
            kind="버튼/보조"
            label="내 킹세종 보기"
          >
            <p className={styles.element107} data-node-id="I67:1609;19:43">
              내 킹세종 보기
            </p>
          </Action>
          <Action
            className={styles.element108}
            data-node-id="67:1611"
            data-name="버튼/주"
            kind="버튼/주"
            label="홈으로"
          >
            <p className={styles.element29} data-node-id="I67:1611;19:41">
              홈으로
            </p>
          </Action>
        </div>
      </div>
    </div>
  )
}
