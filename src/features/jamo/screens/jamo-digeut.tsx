import { ListRow } from '@/components/ui/ListRow'
import { StrokeDiagram } from '@/components/ui/StrokeDiagram'
import { Panel } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { AppBar } from '@/components/ui/AppBar'
import styles from '@/styles/screens.module.css'
import { Action } from '@/components/ui/Action'

const img = '/assets/figma/62cca.svg'
const imgVector = '/assets/figma/aa17d.svg'
const imgVector1 = '/assets/figma/1ceb1.svg'
const imgVector2 = '/assets/figma/0b7e1.svg'
const imgVector3 = '/assets/figma/9d6ff.svg'
const imgVector4 = '/assets/figma/e3866.svg'
const img1 = '/assets/figma/8ca7a.svg'
const img2 = '/assets/figma/877f5.svg'
const imgIcon1 = '/assets/figma/f651f.svg'

export default function JamoDigeut() {
  return (
    <div
      className={styles.leveltest1163}
      data-node-id="79:802"
      data-name="jamo-digeut — 자모 상세 · ㄷ (연습)"
    >
      <AppBar title="자모 도감" />
      <div className={styles.page67} data-node-id="79:808" data-name="page">
        <div className={styles.jamoHead361} data-node-id="79:809" data-name="jamo-head">
          <div className={styles.jamoBig362} data-node-id="79:810" data-name="jamo-big">
            <div className={styles.element363} data-node-id="79:811" data-name="동국체: ㄷ">
              <img alt="" className={styles.element7} src={img} />
            </div>
          </div>
          <div className={styles.jamoInfo364} data-node-id="79:813" data-name="jamo-info">
            <Badge className={styles.element103} tone="warning">
              {'연습'}
            </Badge>
            <p className={styles.element71} data-node-id="79:816">
              디귿
            </p>
            <p className={styles.element83} data-node-id="79:817">
              자음 · 2획
            </p>
          </div>
        </div>
        <Panel className={styles.block88} data-node-id="79:818" data-name="block">
          <div className={styles.blockHead188} data-node-id="79:819" data-name="block-head">
            <p className={styles.element76} data-node-id="79:820">
              쓰는 순서
            </p>
          </div>
          <div className={styles.strokeRow365} data-node-id="79:821" data-name="stroke-row">
            <StrokeDiagram
              className={styles.strokeBox366}
              data-node-id="79:822"
              data-name="stroke-box"
            >
              <div className={styles.icon367} data-node-id="79:823" data-name="icon">
                <div className={styles.Vector289} data-node-id="79:824" data-name="Vector">
                  <div className={styles.element368}>
                    <img alt="" className={styles.element123} src={imgVector} />
                  </div>
                </div>
                <div className={styles.Vector291} data-node-id="79:825" data-name="Vector">
                  <div className={styles.element292}>
                    <img alt="" className={styles.element123} src={imgVector1} />
                  </div>
                </div>
                <div className={styles.Vector289} data-node-id="79:826" data-name="Vector">
                  <div className={styles.element368}>
                    <img alt="" className={styles.element123} src={imgVector2} />
                  </div>
                </div>
                <div className={styles.Vector291} data-node-id="79:827" data-name="Vector">
                  <div className={styles.element292}>
                    <img alt="" className={styles.element123} src={imgVector3} />
                  </div>
                </div>
                <div className={styles.Vector295} data-node-id="79:828" data-name="Vector">
                  <img alt="" className={styles.element7} src={imgVector4} />
                </div>
                <p className={styles.element369} data-node-id="79:829">
                  1
                </p>
                <div className={styles.Vector293} data-node-id="79:830" data-name="Vector">
                  <img alt="" className={styles.element7} src={imgVector4} />
                </div>
                <p className={styles.element370} data-node-id="79:831">
                  2
                </p>
              </div>
            </StrokeDiagram>
            <div className={styles.steps371} data-node-id="79:832" data-name="steps">
              <div className={styles.step89} data-node-id="79:833" data-name="step">
                <div className={styles.stepNum90} data-node-id="79:834" data-name="step-num">
                  <p className={styles.element91} data-node-id="79:835">
                    1
                  </p>
                </div>
                <p className={styles.element92} data-node-id="79:836">
                  위 가로획을 왼쪽에서 오른쪽으로
                </p>
              </div>
              <div className={styles.step89} data-node-id="79:837" data-name="step">
                <div className={styles.stepNum90} data-node-id="79:838" data-name="step-num">
                  <p className={styles.element91} data-node-id="79:839">
                    2
                  </p>
                </div>
                <p className={styles.element92} data-node-id="79:840">
                  세로로 내려와 아래 가로획까지 한 번에
                </p>
              </div>
            </div>
          </div>

          <p className={styles.element83} data-node-id="79:841">
            자주 헷갈려요: 세로획부터 쓰지 않아요. 위 가로획이 먼저예요.
          </p>
        </Panel>
        <Panel className={styles.block88} data-node-id="79:842" data-name="block">
          <div className={styles.blockHead188} data-node-id="79:843" data-name="block-head">
            <p className={styles.element76} data-node-id="79:844">
              이 자모가 든 글자
            </p>
          </div>
          <div className={styles.p242} data-node-id="79:845" data-name="glyph-list">
            <Action
              className={styles.glyphChip372}
              data-node-id="79:846"
              data-name="glyph-chip"
              kind="glyph-chip"
              label="다"
            >
              <div className={styles.element373} data-node-id="79:847" data-name="동국체: 다">
                <div className={styles.element374}>
                  <img alt="" className={styles.element123} src={img1} />
                </div>
              </div>
            </Action>
            <Action
              className={styles.glyphChip372}
              data-node-id="79:849"
              data-name="glyph-chip"
              kind="glyph-chip"
              label="바다"
            >
              <div className={styles.element375} data-node-id="79:850" data-name="동국체: 바다">
                <div className={styles.element376}>
                  <img alt="" className={styles.element123} src={img2} />
                </div>
              </div>
            </Action>
          </div>
        </Panel>
        <Panel className={styles.block187} data-node-id="79:853" data-name="block">
          <div className={styles.blockHead188} data-node-id="79:854" data-name="block-head">
            <p className={styles.element76} data-node-id="79:855">
              내 기록
            </p>
          </div>
          <ListRow
            className={styles.row40}
            data-node-id="79:856"
            data-name="row"
            label="11/9 바다 기본 연습 · ‘다’의 ㄷ 순서가 달랐어요"
          >
            <p className={styles.element37} data-node-id="79:857">
              11/9
            </p>
            <div className={styles.rowMain352} data-node-id="79:858" data-name="row-main">
              <Badge className={styles.element103} tone="warning">
                {'획순 1곳'}
              </Badge>
              <p className={styles.element107} data-node-id="79:861">
                바다
              </p>
              <p className={styles.element83} data-node-id="79:862">
                기본 연습 · ‘다’의 ㄷ 순서가 달랐어요
              </p>
            </div>
            <div className={styles.rowTrail43} data-node-id="79:863" data-name="row-trail">
              <div className={styles.icon86} data-node-id="79:864" data-name="icon">
                <img alt="" className={styles.element7} src={imgIcon1} />
              </div>
            </div>
          </ListRow>
        </Panel>
      </div>
      <div className={styles.cta27} data-node-id="79:866" data-name="cta">
        <Action
          className={styles.element28}
          data-node-id="79:867"
          data-name="버튼/주"
          kind="버튼/주"
          label="ㄷ 연습하기"
        >
          <p className={styles.element29} data-node-id="I79:867;19:41">
            ㄷ 연습하기
          </p>
        </Action>
      </div>
    </div>
  )
}
