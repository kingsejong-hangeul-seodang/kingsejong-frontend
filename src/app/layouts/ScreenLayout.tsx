import { Suspense, useEffect, useRef } from 'react'
import { screens, type ScreenName } from '@/app/routes/screens'
import { useSession } from '@/app/useSession'
import styles from './ScreenLayout.module.css'
import { isScreen, navigate } from '@/app/router'
export function ScreenLayout({ screen }: { screen: ScreenName }) {
  const { notice } = useSession()
  const entry = screens[screen]
  const Page = entry.component
  const main = useRef<HTMLElement>(null)
  useEffect(() => {
    function onNavigate(event: MessageEvent) {
      if (
        window.parent === window ||
        event.source !== window.parent ||
        event.origin !== window.location.origin
      )
        return
      const message = event.data as { type?: string; screen?: string } | null
      if (
        message?.type === 'hangeul-navigate' &&
        typeof message.screen === 'string' &&
        isScreen(message.screen)
      )
        navigate(message.screen)
    }
    window.addEventListener('message', onNavigate)
    return () => window.removeEventListener('message', onNavigate)
  }, [])
  useEffect(() => {
    document.title = `${entry.title} | 킹세종 한글서당`
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'hangeul-screen', screen }, window.location.origin)
    }
    window.scrollTo({ top: 0 })
    main.current?.focus({ preventScroll: true })
  }, [screen, entry.title])
  return (
    <>
      <a
        className={styles.skip}
        href="#screen-content"
        onClick={(event) => {
          event.preventDefault()
          main.current?.focus()
        }}
      >
        본문으로 바로가기
      </a>
      <main
        id="screen-content"
        ref={main}
        tabIndex={-1}
        className={styles.screen}
        data-screen={screen}
        aria-label={entry.title}
      >
        <Suspense
          fallback={
            <p className={styles.loading} role="status">
              화면을 불러오고 있어요…
            </p>
          }
        >
          <Page />
        </Suspense>
      </main>
      {notice && (
        <div className={styles.notice} id="app-notice" role="status">
          {notice}
        </div>
      )}
    </>
  )
}
