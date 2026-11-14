import { MainNavigation } from '@/components/ui/MainNavigation'
import styles from '@/styles/screens.module.css'
import { Action } from '@/components/ui/Action'

const img = '/assets/figma/cd9d4.png'
const imgImg = '/assets/figma/1f5e2.png'
const imgImg1 = '/assets/figma/df22d.png'
const imgImg2 = '/assets/figma/54151.png'
const imgImg3 = '/assets/figma/bacab.png'
const img1 = '/assets/figma/18620.svg'
const imgIcon = '/assets/figma/f651f.svg'

export default function Mypage() {
  return (
    <div className={styles.leveltest1163} data-node-id="67:1742" data-name="mypage — 마이페이지">
      <div className={styles.hero204} data-node-id="67:1743" data-name="hero">
        <p className={styles.element205} data-node-id="67:1744">
          마이페이지
        </p>
        <p className={styles.element206} data-node-id="67:1745">
          쓸수록 내 킹세종이 멋지게 변해요.
        </p>
      </div>
      <div className={styles.page144} data-node-id="67:1746" data-name="page">
        <div className={styles.myHero207} data-node-id="67:1747" data-name="my-hero">
          <div className={styles.element208} data-node-id="67:1748" data-name="킹세종">
            <img alt="" className={styles.element1} src={img} />
          </div>
          <div className={styles.element209} data-node-id="67:1749" data-name="동국체: 서당 입문">
            <div className={styles.element210}>
              <img alt="" className={styles.element123} src={img1} />
            </div>
          </div>
          <p className={styles.element211} data-node-id="67:1754">
            동국 · 연속 학습 3일째
          </p>
          <div className={styles.xp212} data-node-id="67:1755" data-name="xp">
            <div className={styles.span213} data-node-id="67:1756" data-name="span" />
          </div>
          <p className={styles.element211} data-node-id="67:1757">
            120 / 300 EXP — 180 EXP 더 모으면 ‘성균관 유생’이 돼요
          </p>
        </div>
        <div className={styles.block88} data-node-id="67:1758" data-name="block">
          <div className={styles.blockHead188} data-node-id="67:1759" data-name="block-head">
            <p className={styles.element76} data-node-id="67:1760">
              킹세종이 자라는 모습
            </p>
          </div>
          <div className={styles.evo214} data-node-id="67:1761" data-name="evo">
            <div className={styles.evoItem215} data-node-id="67:1762" data-name="evo-item">
              <div className={styles.evoArt216} data-node-id="67:1763" data-name="evo-art">
                <div className={styles.img217} data-node-id="67:1764" data-name="img">
                  <img alt="" className={styles.element1} src={img} />
                </div>
              </div>
              <p className={styles.element196} data-node-id="67:1765">
                서당 입문
              </p>
              <p className={styles.element197} data-node-id="67:1766">
                0 EXP
              </p>
            </div>
            <div className={styles.evoItem218} data-node-id="67:1767" data-name="evo-item">
              <div className={styles.evoArt219} data-node-id="67:1768" data-name="evo-art">
                <div className={styles.img220} data-node-id="67:1769" data-name="img">
                  <img alt="" className={styles.element1} src={imgImg} />
                </div>
              </div>
              <p className={styles.element196} data-node-id="67:1770">
                성균관 유생
              </p>
              <p className={styles.element197} data-node-id="67:1771">
                300 EXP
              </p>
            </div>
            <div className={styles.evoItem218} data-node-id="67:1772" data-name="evo-item">
              <div className={styles.evoArt219} data-node-id="67:1773" data-name="evo-art">
                <div className={styles.img221} data-node-id="67:1774" data-name="img">
                  <img alt="" className={styles.element1} src={imgImg1} />
                </div>
              </div>
              <p className={styles.element196} data-node-id="67:1775">
                집현전 학사
              </p>
              <p className={styles.element197} data-node-id="67:1776">
                800 EXP
              </p>
            </div>
            <div className={styles.evoItem218} data-node-id="67:1777" data-name="evo-item">
              <div className={styles.evoArt219} data-node-id="67:1778" data-name="evo-art">
                <div className={styles.img222} data-node-id="67:1779" data-name="img">
                  <img alt="" className={styles.element1} src={imgImg2} />
                </div>
              </div>
              <p className={styles.element196} data-node-id="67:1780">
                대제학
              </p>
              <p className={styles.element197} data-node-id="67:1781">
                1,500 EXP
              </p>
            </div>
            <div className={styles.evoItem218} data-node-id="67:1782" data-name="evo-item">
              <div className={styles.evoArt219} data-node-id="67:1783" data-name="evo-art">
                <div className={styles.img223} data-node-id="67:1784" data-name="img">
                  <img alt="" className={styles.element1} src={imgImg3} />
                </div>
              </div>
              <p className={styles.element196} data-node-id="67:1785">
                킹세종
              </p>
              <p className={styles.element197} data-node-id="67:1786">
                3,000 EXP
              </p>
            </div>
          </div>
        </div>
        <div className={styles.block187} data-node-id="67:1787" data-name="block">
          <Action
            className={styles.row40}
            data-node-id="67:1788"
            data-name="row"
            kind="row"
            label="설정 난이도 · 언어 · 좋아하는 가수"
          >
            <div className={styles.rowMain41} data-node-id="67:1789" data-name="row-main">
              <p className={styles.element42} data-node-id="67:1790">
                설정
              </p>
              <p className={styles.element25} data-node-id="67:1791">
                난이도 · 언어 · 좋아하는 가수
              </p>
            </div>
            <div className={styles.rowTrail43} data-node-id="67:1792" data-name="row-trail">
              <div className={styles.icon86} data-node-id="67:1793" data-name="icon">
                <img alt="" className={styles.element7} src={imgIcon} />
              </div>
            </div>
          </Action>
        </div>
      </div>
      <MainNavigation />
    </div>
  )
}
