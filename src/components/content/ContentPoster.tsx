import { useUiText } from '@/app/useUiText'
import { useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import styles from './ContentArtwork.module.css'

type ArtworkKind = 'pop' | 'drama'

const fallbackImages: Record<ArtworkKind, string> = {
  pop: '/assets/figma/3d07b.png',
  drama: '/assets/figma/547a2.png',
}

function PosterImage({ url, kind }: { url: string | null; kind: ArtworkKind }) {
  const [failed, setFailed] = useState(false)
  const image = !failed && url?.trim()
  return (
    <img
      className={styles.image}
      src={image || fallbackImages[kind]}
      data-fallback={!image}
      alt=""
      loading="lazy"
      onError={image ? () => setFailed(true) : undefined}
    />
  )
}

export function ContentPoster({
  kind,
  thumbnailUrl,
  durationSec,
  compact = false,
  tasteLabel,
  completed = false,
}: {
  kind: ArtworkKind
  thumbnailUrl?: string | null
  durationSec?: number | null
  compact?: boolean
  tasteLabel?: string | undefined
  completed?: boolean | undefined
}) {
  const t = useUiText()
  const seconds =
    typeof durationSec === 'number' && Number.isFinite(durationSec)
      ? Math.max(0, Math.floor(durationSec))
      : null
  const duration =
    seconds === null ? null : `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`

  return (
    <div className={styles.poster} data-compact={compact}>
      <PosterImage key={thumbnailUrl} kind={kind} url={thumbnailUrl ?? null} />
      {(tasteLabel || completed) && (
        <div className={styles.badges}>
          {tasteLabel && <Badge tone="brand">{tasteLabel}</Badge>}
          {completed && <Badge tone="success">{t('완료')}</Badge>}
        </div>
      )}
      {duration && <span className={styles.duration}>{duration}</span>}
    </div>
  )
}
