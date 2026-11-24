import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { isScreen, navigate, useScreen } from '@/app/router'
import { screens } from '@/app/routes/screens'
import { translateUi } from '@/app/uiText'
import styles from './IPadPreview.module.css'

export function IPadPreview({ scale }: { scale: number }) {
  const screen = useScreen()
  const frame = useRef<HTMLIFrameElement>(null)
  const url = new URL(window.location.href)
  url.searchParams.set('preview', 'ipad')
  url.hash = `/${screen}`
  const [source] = useState(() => url.href)
  const [locale, setLocale] = useState<'en' | 'ko'>('ko')
  const language = locale === 'en' ? 'English' : '한국어'
  useEffect(() => {
    document.documentElement.lang = locale
    document.title = [screens[screen].title, '킹세종 한글서당']
      .map((title) => translateUi(language, title))
      .join(' | ')
  }, [screen, locale, language])
  useEffect(() => {
    frame.current?.contentWindow?.postMessage(
      { type: 'hangeul-navigate', screen },
      window.location.origin,
    )
  }, [screen])

  useEffect(() => {
    function sync(event: MessageEvent) {
      if (event.origin !== window.location.origin || event.source !== frame.current?.contentWindow)
        return
      const value = event.data as { type?: string; screen?: string; locale?: string } | null
      if (value?.type === 'hangeul-locale' && (value.locale === 'en' || value.locale === 'ko')) {
        setLocale(value.locale)
      }
      if (
        value?.type === 'hangeul-screen' &&
        typeof value.screen === 'string' &&
        isScreen(value.screen)
      )
        navigate(value.screen)
    }
    window.addEventListener('message', sync)
    return () => window.removeEventListener('message', sync)
  }, [])

  return (
    <div className={styles.workspace}>
      <div className={styles.device} style={{ '--ipad-scale': scale } as CSSProperties}>
        <iframe
          ref={frame}
          className={styles.viewport}
          src={source}
          onLoad={() =>
            frame.current?.contentWindow?.postMessage(
              { type: 'hangeul-navigate', screen },
              window.location.origin,
            )
          }
          title={translateUi(language, '아이패드 화면 — 820 × 1180')}
        />
      </div>
    </div>
  )
}
