import { useUiText } from '@/app/useUiText'
import { useCallback, useRef, useState } from 'react'
import type { ContentVideo, SubtitleLine } from '@/api/backend'
import { ContentPoster } from './ContentPoster'
import { YouTubeClip, type ClipPlayback, type ClipSegment } from './YouTubeClip'
import { ListeningControls } from './ListeningControls'
import { usePracticeSpeech } from './usePracticeSpeech'
import styles from './ContentArtwork.module.css'

export function ContentClip({
  content,
  kind,
  target,
  dictation,
  illustrated = false,
  captionFont,
}: {
  content: {
    source: string
    thumbnailUrl?: string | null
    durationSec?: number | null
    clip?: ContentVideo | null
    lines?: SubtitleLine[]
  }
  kind: 'pop' | 'drama'
  target: string
  dictation: boolean
  illustrated?: boolean
  captionFont?: string
}) {
  const t = useUiText()
  const [initial, setInitial] = useState<ClipSegment | null>(null)
  const [time, setTime] = useState<number | null>(null)
  const [support, setSupport] = useState<boolean | null>(null)
  const [videoFailed, setVideoFailed] = useState(false)
  const player = useRef<ClipPlayback>(null)
  const handleUnavailable = useCallback(() => setVideoFailed(true), [])
  const { clip, lines = [] } = content
  const videoId = clip?.youtubeVideoId
  const playable = clip?.embeddable && typeof videoId === 'string' && /^[\w-]{11}$/.test(videoId)
  const clipEnd = clip ? Math.min(clip.endSec, clip.startSec + 30) : 0
  const activeLine =
    time === null
      ? undefined
      : lines.findLast(
          (line, index) =>
            time >= line.startSec &&
            time < (line.endSec ?? lines[index + 1]?.startSec ?? clip?.endSec ?? Infinity),
        )
  // 줄과 줄 사이(쉬는 부분)에는 방금 지나간 줄을 그대로 둔다
  const passedLine =
    time === null || activeLine ? undefined : lines.findLast((line) => time >= line.startSec)
  const targetLine = lines.find((line) => line.text.includes(target))
  const line = activeLine ?? passedLine ?? targetLine ?? lines[0]
  const caption = line?.text ?? target
  const highlight = caption.indexOf(target)
  // 재생 중인 줄은 노래방처럼 지나간 글자까지 배경을 칠한다
  const lineIndex = line ? lines.indexOf(line) : -1
  const lineEnd = line ? (line.endSec ?? lines[lineIndex + 1]?.startSec ?? clipEnd) : 0
  const sung =
    passedLine && line === passedLine
      ? 1
      : activeLine && line === activeLine && time !== null && lineEnd > line.startSec
        ? Math.min(1, Math.max(0, (time - line.startSec) / (lineEnd - line.startSec)))
        : null
  const speech = usePracticeSpeech(dictation ? target : caption)

  function play(rate: number, fullClip = false) {
    if (playable && !videoFailed) {
      const lineIndex = line ? lines.indexOf(line) : -1
      const end =
        fullClip || dictation || !line
          ? clipEnd
          : Math.min(clipEnd, line.endSec ?? lines[lineIndex + 1]?.startSec ?? clipEnd)
      const start =
        fullClip || dictation || !line ? clip.startSec : Math.max(clip.startSec, line.startSec)
      const segment =
        start < end ? { start, end, rate } : { start: clip.startSec, end: clipEnd, rate }
      if (!initial) setInitial(segment)
      else player.current?.playSegment(segment)
    } else {
      speech.play(rate)
    }
  }

  return (
    <section className={styles.clip} aria-label={dictation ? t('받아쓰기 클립') : t('클립과 자막')}>
      {playable && initial && !videoFailed ? (
        <YouTubeClip
          ref={player}
          videoId={videoId}
          start={clip.startSec}
          end={clipEnd}
          initial={initial}
          onTime={setTime}
          onReady={setSupport}
          onUnavailable={handleUnavailable}
        />
      ) : (
        <div className={styles.clipMedia} data-illustration={illustrated ? kind : undefined}>
          <ContentPoster
            kind={kind}
            thumbnailUrl={content.thumbnailUrl ?? null}
            durationSec={content.durationSec ?? null}
          />
          {((playable && !videoFailed) || speech.available) && (
            <button
              className={styles.playButton}
              aria-label={t('클립 듣기')}
              onClick={() => play(1, true)}
            >
              <img src="/assets/figma/daefb.svg" width="24" height="24" alt="" />
            </button>
          )}
        </div>
      )}
      <div className={styles.caption}>
        {dictation ? (
          <p className={styles.hiddenCaption}>{t('자막은 숨겼어요. 듣고 받아써 보세요')}</p>
        ) : (
          <p
            className={styles.subtitle}
            style={
              captionFont ? { fontFamily: `"${captionFont}", var(--font-family-base)` } : undefined
            }
          >
            <KaraokeCaption
              text={caption}
              targetStart={highlight}
              targetLength={target.length}
              progress={sung}
            />
          </p>
        )}
        <div className={styles.captionMeta}>
          <div>
            {!dictation && line?.translation && (
              <p className={styles.translation}>{line.translation}</p>
            )}
            <p className={styles.source}>{content.source}</p>
          </div>
          <ListeningControls
            line={!dictation}
            play={play}
            disabled={
              playable && !videoFailed ? initial !== null && support === null : !speech.available
            }
            slowDisabled={Boolean(playable && !videoFailed && support === false)}
          />
        </div>
      </div>
    </section>
  )
}

function KaraokeCaption({
  text,
  targetStart,
  targetLength,
  progress,
}: {
  text: string
  targetStart: number
  targetLength: number
  progress: number | null
}) {
  const chars = Array.from(text)
  const sungCount = progress === null ? 0 : Math.ceil(progress * chars.length)
  const piece = (from: number, to: number) =>
    chars.slice(from, to).map((char, offset) => (
      <span key={from + offset} className={from + offset < sungCount ? styles.sung : undefined}>
        {char}
      </span>
    ))
  if (targetStart < 0) return <>{piece(0, chars.length)}</>
  const end = targetStart + Array.from(text.slice(targetStart, targetStart + targetLength)).length
  const start = Array.from(text.slice(0, targetStart)).length
  return (
    <>
      {piece(0, start)}
      <mark>{piece(start, end)}</mark>
      {piece(end, chars.length)}
    </>
  )
}
