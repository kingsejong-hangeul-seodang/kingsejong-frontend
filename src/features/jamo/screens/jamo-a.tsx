import { ListRow } from '@/components/ui/ListRow'
import { StrokeDiagram } from '@/components/ui/StrokeDiagram'
import { Panel } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { AppBar } from '@/components/ui/AppBar'
import styles from '@/styles/screens.module.css'
import { Action } from '@/components/ui/Action'

const img = '/assets/figma/3dee9.svg'
const imgVector = '/assets/figma/171c0.svg'
const imgVector1 = '/assets/figma/5cd4d.svg'
const imgVector2 = '/assets/figma/7f360.svg'
const imgVector3 = '/assets/figma/48db8.svg'
const imgVector4 = '/assets/figma/e3866.svg'
const img1 = '/assets/figma/f91f3.svg'
const img2 = '/assets/figma/877f5.svg'
const img3 = '/assets/figma/3f3c8.svg'
const imgIcon1 = '/assets/figma/f651f.svg'

export default function JamoA() {
  return (
    <div
      className={styles.leveltest1163}
      data-node-id="79:869"
      data-name="jamo-a — 자모 상세 · ㅏ (익숙)"
    >
      <AppBar title="자모 도감" />
      <div className={styles.page67} data-node-id="79:875" data-name="page">
        <div className={styles.jamoHead361} data-node-id="79:876" data-name="jamo-head">
          <div className={styles.jamoBig362} data-node-id="79:877" data-name="jamo-big">
            <div className={styles.element363} data-node-id="79:878" data-name="동국체: ㅏ">
              <img alt="" className={styles.element7} src={img} />
            </div>
          </div>
          <div className={styles.jamoInfo364} data-node-id="79:880" data-name="jamo-info">
            <Badge className={styles.element93} tone="success">
              {'익숙'}
            </Badge>
            <p className={styles.element71} data-node-id="79:883">
              아
            </p>
            <p className={styles.element83} data-node-id="79:884">
              모음 · 2획
            </p>
          </div>
        </div>
        <Panel className={styles.block88} data-node-id="79:885" data-name="block">
          <div className={styles.blockHead188} data-node-id="79:886" data-name="block-head">
            <p className={styles.element76} data-node-id="79:887">
              쓰는 순서
            </p>
          </div>
          <div className={styles.strokeRow365} data-node-id="79:888" data-name="stroke-row">
            <StrokeDiagram
              className={styles.strokeBox366}
              data-node-id="79:889"
              data-name="stroke-box"
            >
              <div className={styles.icon367} data-node-id="79:890" data-name="icon">
                <div className={styles.Vector377} data-node-id="79:891" data-name="Vector">
                  <div className={styles.element378}>
                    <img alt="" className={styles.element123} src={imgVector} />
                  </div>
                </div>
                <div className={styles.Vector379} data-node-id="79:892" data-name="Vector">
                  <div className={styles.element380}>
                    <img alt="" className={styles.element123} src={imgVector1} />
                  </div>
                </div>
                <div className={styles.Vector377} data-node-id="79:893" data-name="Vector">
                  <div className={styles.element378}>
                    <img alt="" className={styles.element123} src={imgVector2} />
                  </div>
                </div>
                <div className={styles.Vector379} data-node-id="79:894" data-name="Vector">
                  <div className={styles.element380}>
                    <img alt="" className={styles.element123} src={imgVector3} />
                  </div>
                </div>
                <div className={styles.Vector381} data-node-id="79:895" data-name="Vector">
                  <img alt="" className={styles.element7} src={imgVector4} />
                </div>
                <p className={styles.element382} data-node-id="79:896">
                  1
                </p>
                <div className={styles.Vector383} data-node-id="79:897" data-name="Vector">
                  <img alt="" className={styles.element7} src={imgVector4} />
                </div>
                <p className={styles.element384} data-node-id="79:898">
                  2
                </p>
              </div>
            </StrokeDiagram>
            <div className={styles.steps371} data-node-id="79:899" data-name="steps">
              <div className={styles.step89} data-node-id="79:900" data-name="step">
                <div className={styles.stepNum90} data-node-id="79:901" data-name="step-num">
                  <p className={styles.element91} data-node-id="79:902">
                    1
                  </p>
                </div>
                <p className={styles.element92} data-node-id="79:903">
                  세로획을 위에서 아래로
                </p>
              </div>
              <div className={styles.step89} data-node-id="79:904" data-name="step">
                <div className={styles.stepNum90} data-node-id="79:905" data-name="step-num">
                  <p className={styles.element91} data-node-id="79:906">
                    2
                  </p>
                </div>
                <p className={styles.element92} data-node-id="79:907">
                  가운데에서 오른쪽으로 짧은 가로획
                </p>
              </div>
            </div>
          </div>

          <p className={styles.element83} data-node-id="79:908">
            세로획을 먼저 쓰고, 가로획은 가운데에서 시작해요.
          </p>
        </Panel>
        <Panel className={styles.block88} data-node-id="79:909" data-name="block">
          <div className={styles.blockHead188} data-node-id="79:910" data-name="block-head">
            <p className={styles.element76} data-node-id="79:911">
              이 자모가 든 글자
            </p>
          </div>
          <div className={styles.p242} data-node-id="79:912" data-name="glyph-list">
            <Action
              className={styles.glyphChip372}
              data-node-id="79:913"
              data-name="glyph-chip"
              kind="glyph-chip"
              label="아"
            >
              <div className={styles.element373} data-node-id="79:914" data-name="동국체: 아">
                <div className={styles.element374}>
                  <img alt="" className={styles.element123} src={img1} />
                </div>
              </div>
            </Action>
            <Action
              className={styles.glyphChip372}
              data-node-id="79:916"
              data-name="glyph-chip"
              kind="glyph-chip"
              label="바다"
            >
              <div className={styles.element375} data-node-id="79:917" data-name="동국체: 바다">
                <div className={styles.element376}>
                  <img alt="" className={styles.element123} src={img2} />
                </div>
              </div>
            </Action>
            <Action
              className={styles.glyphChip372}
              data-node-id="79:920"
              data-name="glyph-chip"
              kind="glyph-chip"
              label="좋아"
            >
              <div className={styles.element375} data-node-id="79:921" data-name="동국체: 좋아">
                <div className={styles.element376}>
                  <img alt="" className={styles.element123} src={img3} />
                </div>
              </div>
            </Action>
          </div>
        </Panel>
        <Panel className={styles.block187} data-node-id="79:924" data-name="block">
          <div className={styles.blockHead188} data-node-id="79:925" data-name="block-head">
            <p className={styles.element76} data-node-id="79:926">
              내 기록
            </p>
          </div>
          <ListRow
            className={styles.row40}
            data-node-id="79:927"
            data-name="row"
            label="11/8 좋아 K드라마 · 서당의 봄 3화"
          >
            <p className={styles.element37} data-node-id="79:928">
              11/8
            </p>
            <div className={styles.rowMain352} data-node-id="79:929" data-name="row-main">
              <Badge className={styles.element93} tone="success">
                {'다 맞음'}
              </Badge>
              <p className={styles.element107} data-node-id="79:932">
                좋아
              </p>
              <p className={styles.element83} data-node-id="79:933">
                K드라마 · 서당의 봄 3화
              </p>
            </div>
            <div className={styles.rowTrail43} data-node-id="79:934" data-name="row-trail">
              <div className={styles.icon86} data-node-id="79:935" data-name="icon">
                <img alt="" className={styles.element7} src={imgIcon1} />
              </div>
            </div>
          </ListRow>
        </Panel>
      </div>
      <div className={styles.cta27} data-node-id="79:937" data-name="cta">
        <Action
          className={styles.element28}
          data-node-id="79:938"
          data-name="버튼/주"
          kind="버튼/주"
          label="ㅏ 연습하기"
        >
          <p className={styles.element29} data-node-id="I79:938;19:41">
            ㅏ 연습하기
          </p>
        </Action>
      </div>
    </div>
  )
}
