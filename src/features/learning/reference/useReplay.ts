import { useEffect, useState } from 'react'
export function useReplay(duration: number) {
  const [position, setPosition] = useState(1)
  const [playing, setPlaying] = useState(false)
  const finished = position >= 1
  useEffect(() => {
    if (!playing || finished || duration <= 0) return
    let previous: number | undefined
    let frame = 0
    const tick = (now: number) => {
      const delta = previous === undefined ? 0 : Math.min(100, now - previous)
      previous = now
      setPosition((value) => Math.min(1, value + delta / duration))
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [playing, finished, duration])
  return {
    position,
    playing: playing && !finished,
    seek(value: number) {
      setPlaying(false)
      setPosition(value)
    },
    toggle() {
      if (finished) setPosition(0)
      setPlaying(!playing || finished)
    },
    restart() {
      setPosition(0)
      setPlaying(true)
    },
  }
}
