import { StrokeDiagram } from '@/components/ui/StrokeDiagram'
import { Panel } from '@/components/ui/Panel'
import { AppBar } from '@/components/ui/AppBar'
import styles from '@/styles/screens.module.css'
import { Action } from '@/components/ui/Action'

const imgVector = '/assets/figma/cd3bd.svg'
const imgVector1 = '/assets/figma/7c354.svg'
const imgVector2 = '/assets/figma/21747.svg'
const imgVector3 = '/assets/figma/a55c1.svg'
const imgVector4 = '/assets/figma/13762.svg'
const imgVector5 = '/assets/figma/1fb2c.svg'
const imgVector6 = '/assets/figma/6a49e.svg'

export default function Stroke() {
  return (
    <div
      className={styles.leveltest1163}
      data-node-id="67:2099"
      data-name="stroke — 획순 · 글자 하나"
    >
      <AppBar title="ㄷ 쓰는 순서" />
      <div className={styles.page67} data-node-id="67:2105" data-name="page">
        <Panel className={styles.block88} data-node-id="67:2106" data-name="block">
          <div className={styles.compare2285} data-node-id="67:2107" data-name="compare-2">
            <div className={styles.figure286} data-node-id="67:2108" data-name="figure">
              <StrokeDiagram
                className={styles.strokeBox287}
                data-node-id="67:2109"
                data-name="stroke-box"
              >
                <div className={styles.icon288} data-node-id="67:2110" data-name="icon">
                  <div className={styles.Vector289} data-node-id="67:2111" data-name="Vector">
                    <div className={styles.element290}>
                      <img alt="" className={styles.element123} src={imgVector} />
                    </div>
                  </div>
                  <div className={styles.Vector291} data-node-id="67:2112" data-name="Vector">
                    <div className={styles.element292}>
                      <img alt="" className={styles.element123} src={imgVector1} />
                    </div>
                  </div>
                  <div className={styles.Vector291} data-node-id="67:2113" data-name="Vector">
                    <div className={styles.element292}>
                      <img alt="" className={styles.element123} src={imgVector2} />
                    </div>
                  </div>
                  <div className={styles.Vector289} data-node-id="67:2114" data-name="Vector">
                    <div className={styles.element290}>
                      <img alt="" className={styles.element123} src={imgVector3} />
                    </div>
                  </div>
                  <div className={styles.Vector293} data-node-id="67:2115" data-name="Vector">
                    <img alt="" className={styles.element7} src={imgVector4} />
                  </div>
                  <p className={styles.element294} data-node-id="67:2116">
                    1
                  </p>
                  <div className={styles.Vector295} data-node-id="67:2117" data-name="Vector">
                    <img alt="" className={styles.element7} src={imgVector4} />
                  </div>
                  <p className={styles.element296} data-node-id="67:2118">
                    2
                  </p>
                </div>
              </StrokeDiagram>
              <p className={styles.element37} data-node-id="67:2119">
                내가 쓴 순서
              </p>
            </div>
            <div className={styles.figure286} data-node-id="67:2120" data-name="figure">
              <StrokeDiagram
                className={styles.strokeBox287}
                data-node-id="67:2121"
                data-name="stroke-box"
              >
                <div className={styles.icon288} data-node-id="67:2122" data-name="icon">
                  <div className={styles.Vector289} data-node-id="67:2123" data-name="Vector">
                    <div className={styles.element290}>
                      <img alt="" className={styles.element123} src={imgVector} />
                    </div>
                  </div>
                  <div className={styles.Vector291} data-node-id="67:2124" data-name="Vector">
                    <div className={styles.element292}>
                      <img alt="" className={styles.element123} src={imgVector1} />
                    </div>
                  </div>
                  <div className={styles.Vector289} data-node-id="67:2125" data-name="Vector">
                    <div className={styles.element290}>
                      <img alt="" className={styles.element123} src={imgVector5} />
                    </div>
                  </div>
                  <div className={styles.Vector291} data-node-id="67:2126" data-name="Vector">
                    <div className={styles.element292}>
                      <img alt="" className={styles.element123} src={imgVector2} />
                    </div>
                  </div>
                  <div className={styles.Vector295} data-node-id="67:2127" data-name="Vector">
                    <img alt="" className={styles.element7} src={imgVector6} />
                  </div>
                  <p className={styles.element297} data-node-id="67:2128">
                    1
                  </p>
                  <div className={styles.Vector293} data-node-id="67:2129" data-name="Vector">
                    <img alt="" className={styles.element7} src={imgVector6} />
                  </div>
                  <p className={styles.element298} data-node-id="67:2130">
                    2
                  </p>
                </div>
              </StrokeDiagram>
              <p className={styles.element37} data-node-id="67:2131">
                바른 순서
              </p>
            </div>
          </div>
          <div className={styles.field36} data-node-id="67:2132" data-name="steps">
            <div className={styles.step89} data-node-id="67:2133" data-name="step">
              <div className={styles.stepNum90} data-node-id="67:2134" data-name="step-num">
                <p className={styles.element91} data-node-id="67:2135">
                  1
                </p>
              </div>
              <p className={styles.element92} data-node-id="67:2136">
                위 가로획을 왼쪽에서 오른쪽으로
              </p>
            </div>
            <div className={styles.step89} data-node-id="67:2137" data-name="step">
              <div className={styles.stepNum90} data-node-id="67:2138" data-name="step-num">
                <p className={styles.element91} data-node-id="67:2139">
                  2
                </p>
              </div>
              <p className={styles.element92} data-node-id="67:2140">
                세로로 내려와 아래 가로획까지 한 번에
              </p>
            </div>
          </div>
        </Panel>
      </div>
      <div className={styles.cta27} data-node-id="67:2141" data-name="cta">
        <Action
          className={styles.element28}
          data-node-id="67:2142"
          data-name="버튼/주"
          kind="버튼/주"
          label="‘다’ 다시 쓰기"
        >
          <p className={styles.element29} data-node-id="I67:2142;19:41">
            ‘다’ 다시 쓰기
          </p>
        </Action>
      </div>
    </div>
  )
}
