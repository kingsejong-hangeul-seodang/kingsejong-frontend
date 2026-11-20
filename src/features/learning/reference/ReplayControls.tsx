import type { useReplay } from './useReplay'
import styles from '@/features/learning/FigmaLearning.module.css'
export function ReplayControls({
  replay,
  count,
  disabled = false,
}: {
  replay: ReturnType<typeof useReplay>
  count: string
  disabled?: boolean
}) {
  const label = replay.playing
    ? '일시 정지'
    : replay.position > 0 && replay.position < 1
      ? '이어서 보기'
      : '처음부터 다시 보기'
  return (
    <div className={styles.replay} data-name="player">
      <button
        type="button"
        className={styles.replayButton}
        onClick={replay.toggle}
        disabled={disabled}
        aria-label={label}
      >
        <img src="/assets/figma/2ab6e.svg" alt="" />
        {label}
      </button>
      <input
        className={styles.range}
        disabled={disabled}
        type="range"
        min={0}
        max={1}
        step={0.001}
        value={replay.position}
        aria-label="정답 보기 진행률"
        onChange={(event) => replay.seek(Number(event.target.value))}
      />
      <span className={styles.replayCount}>{count}</span>
    </div>
  )
}
