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
}
export type ClipSegment = { start: number; end: number; rate: number }
export type ClipPlayback = { playSegment: (segment: ClipSegment) => void }
type YouTubeApi = {
  Player: new (
    element: HTMLElement,
    options: {
      playerVars: { origin: string; playsinline: number }
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
  const segmentEnd = useRef(initial.end)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  useImperativeHandle(
    ref,
    () => ({
      playSegment(segment) {
        const player = playerRef.current
        if (!player) return
        segmentEnd.current = segment.end
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
          playerVars: { origin: window.location.origin, playsinline: 1 },
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
                if (time >= Math.min(end, segmentEnd.current)) {
                  target.pauseVideo()
                  return
                }
                onTime(time >= start ? time : null)
              }, 120)
            },
            onStateChange({ target, data }) {
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
