import { useUiText } from '@/app/useUiText'
import { useEffect, useImperativeHandle, useRef, useState, type Ref } from 'react'
import styles from './ContentArtwork.module.css'

type Player = {
  loadVideoById(video: { videoId: string; startSeconds: number; endSeconds: number }): void
  getCurrentTime(): number
  getPlayerState(): number
  seekTo(seconds: number, allowSeekAhead: boolean): void
  setPlaybackRate(rate: number): void
  getAvailablePlaybackRates(): number[]
  playVideo(): void
  pauseVideo(): void
  destroy(): void
  unloadModule?(module: string): void
}
export type ClipSegment = { start: number; end: number; rate: number }
export type ClipPlayback = { playSegment: (segment: ClipSegment) => void }
type YouTubeApi = {
  Player: new (
    element: HTMLElement,
    options: {
      playerVars: Record<string, string | number>
      events: {
        onReady: (event: { target: Player }) => void
        onStateChange: (event: { target: Player; data: number }) => void
        onError: () => void
      }
    },
  ) => Player
}
declare global {
  interface Window {
    YT?: YouTubeApi
    onYouTubeIframeAPIReady?: () => void
  }
}

let loading: Promise<YouTubeApi> | undefined
function loadApi() {
  if (window.YT?.Player) return Promise.resolve(window.YT)
  if (loading) return loading

  loading = new Promise<YouTubeApi>((resolve, reject) => {
    const script = document.createElement('script')
    const previous = window.onYouTubeIframeAPIReady
    const failed = () => {
      restore()
      script.remove()
      reject(new Error('YouTube 재생 도구를 불러오지 못했어요.'))
    }
    const timer = window.setTimeout(failed, 10000)
    function restore() {
      window.clearTimeout(timer)
      if (window.onYouTubeIframeAPIReady === ready) {
        if (previous) window.onYouTubeIframeAPIReady = previous
        else delete window.onYouTubeIframeAPIReady
      }
    }
    function ready() {
      const api = window.YT
      if (!api?.Player) return failed()
      restore()
      resolve(api)
      previous?.()
    }
    window.onYouTubeIframeAPIReady = ready
    script.src = 'https://www.youtube.com/iframe_api'
    script.async = true
    script.onerror = failed
    document.head.append(script)
  }).catch((error: unknown) => {
    loading = undefined
    throw error
  })
  return loading
}

export function YouTubeClip({
  videoId,
  start,
  end,
  initial,
  onTime,
  onReady,
  onUnavailable,
  ref,
}: {
  videoId: string
  start: number
  end: number
  initial: ClipSegment
  onTime: (time: number | null) => void
  onReady: (canSlow: boolean) => void
  onUnavailable: () => void
  ref: Ref<ClipPlayback>
}) {
  const t = useUiText()
  const container = useRef<HTMLDivElement>(null)
  const playerRef = useRef<Player>(null)
  const segmentStart = useRef(initial.start)
  const segmentEnd = useRef(initial.end)
  const finished = useRef(false)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  useImperativeHandle(
    ref,
    () => ({
      playSegment(segment) {
        const player = playerRef.current
        if (!player) return
        segmentStart.current = segment.start
        segmentEnd.current = segment.end
        finished.current = false
        player.seekTo(segment.start, true)
        player.setPlaybackRate(segment.rate)
        player.playVideo()
      },
    }),
    [],
  )

  useEffect(() => {
    const root = container.current
    if (!root) return
    const host = document.createElement('div')
    root.append(host)
    let active = true
    let player: Player | undefined
    let sample: number | undefined
    let firstPlay = true
    const fail = () => {
      if (!active) return
      setStatus('error')
      onTime(null)
      onUnavailable()
      window.clearInterval(sample)
    }
    const deadline = window.setTimeout(fail, 15000)
    void loadApi()
      .then((api) => {
        if (!active) return
        player = new api.Player(host, {
          // 학습 구간만 보이게: 유튜브 재생 막대·키보드·관련 영상·전체 화면을 숨긴다 (재생은 우리 버튼으로)
          playerVars: {
            origin: window.location.origin,
            playsinline: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            rel: 0,
            iv_load_policy: 3,
            modestbranding: 1,
            cc_load_policy: 0,
          },
          events: {
            onReady({ target }) {
              if (!active) return
              window.clearTimeout(deadline)
              setStatus('ready')
              playerRef.current = target
              target.loadVideoById({ videoId, startSeconds: initial.start, endSeconds: end })
              sample = window.setInterval(() => {
                if (target.getPlayerState() !== 1) return
                const time = target.getCurrentTime()
                // 구간 앞으로 가 있으면 구간 처음으로
                if (time < start - 0.3) {
                  target.seekTo(segmentStart.current, true)
                  return
                }
                // 구간 끝(샘플 간격만큼 미리)에서 멈춘다. 유튜브 끝 화면·다음 장면이 보이지 않게
                if (time >= Math.min(end, segmentEnd.current) - 0.1) {
                  target.pauseVideo()
                  finished.current = true
                  return
                }
                onTime(time >= start ? time : null)
              }, 100)
            },
            onStateChange({ target, data }) {
              // 끝난 뒤 영상을 눌러 다시 재생하면 그 구간 처음부터
              if (active && data === 1 && finished.current) {
                finished.current = false
                target.seekTo(segmentStart.current, true)
              }
              if (active && data === 0) {
                finished.current = true
                target.seekTo(segmentStart.current, true)
                target.pauseVideo()
              }
              // 유튜브 자체 자막은 끈다 (아래 우리 자막과 겹치지 않게)
              if (active && data === 1) target.unloadModule?.('captions')
              if (active && (data === 1 || data === 5)) {
                const rates = target.getAvailablePlaybackRates()
                if (data === 1 && firstPlay) {
                  firstPlay = false
                  if (initial.rate !== 1 && rates.includes(initial.rate))
                    target.setPlaybackRate(initial.rate)
                }
                onReady(rates.includes(0.75))
              }
            },
            onError: fail,
          },
        })
      })
      .catch(fail)
    return () => {
      active = false
      window.clearTimeout(deadline)
      window.clearInterval(sample)
      player?.destroy()
      playerRef.current = null
      root.replaceChildren()
    }
  }, [videoId, start, end, initial, onTime, onReady, onUnavailable])

  return (
    <div>
      <div ref={container} className={styles.player} hidden={status === 'error'} />
      {status === 'loading' && <p role="status">{t('영상을 불러오고 있어요.')}</p>}
      {status === 'error' && <p role="status">{t('영상을 재생할 수 없어요.')}</p>}
    </div>
  )
}
