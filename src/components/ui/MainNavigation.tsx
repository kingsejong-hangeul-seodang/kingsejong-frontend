import type { ScreenName } from '@/app/routes/screens'
import styles from './controls.module.css'
const tabs = [
  { label: '홈', icon: '962fe.svg', activeIcon: 'bbf67.svg', screen: 'home' },
  { label: '자모 도감', icon: 'b2045.svg', activeIcon: 'b971f.svg', screen: 'dogam' },
  { label: '쓰기 기록', icon: '8445f.svg', activeIcon: 'bd18e.svg', screen: 'records' },
  { label: '마이', icon: '5b623.svg', activeIcon: '1f111.svg', screen: 'mypage' },
] as const
export function MainNavigation({
  screen,
  home,
  onNavigate,
}: {
  screen: ScreenName
  home: ScreenName
  onNavigate: (screen: ScreenName) => void
}) {
  return (
    <nav className={styles.navigation} data-name="tabbar" aria-label="주 메뉴">
      {tabs.map((tab) => {
        const active = tab.screen === 'home' ? screen.startsWith('home') : screen === tab.screen
        return (
          <button
            key={tab.label}
            type="button"
            data-action="tab"
            aria-label={tab.label}
            onClick={() => onNavigate(tab.screen === 'home' ? home : tab.screen)}
            data-name="tab"
            className={styles.tab}
            aria-current={active ? 'page' : undefined}
          >
            <img src={`/assets/figma/${active ? tab.activeIcon : tab.icon}`} alt="" />
            <span>{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
