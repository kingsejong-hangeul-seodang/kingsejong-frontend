import { useUiText } from '@/app/useUiText'
import { useGuideFont } from './guideFont'
import styles from './FigmaGuideGlyph.module.css'

/** The Figma guide frame, using real font outlines for any supported character. */
export function FigmaGuideGlyph({ char }: { char: string }) {
  const t = useUiText()
  const { data, family } = useGuideFont()
  if (char === ' ') return null
  const supported = data?.bounds[char]
  return (
    <div
      className={styles.guide}
      data-guide-character={char}
      data-guide-state={supported ? 'ready' : 'fallback'}
    >
      {data && supported ? (
        <svg
          viewBox={data.frame.join(' ')}
          role="img"
          aria-label={t('{0} 동국체 따라쓰기 가이드', char)}
        >
          <text
            x={0}
            y={0}
            fontFamily={family}
            fontSize={data.unitsPerEm}
            fill="#c0bebc"
            aria-hidden="true"
          >
            {char}
          </text>
        </svg>
      ) : (
        <svg viewBox="0 0 100 100" role="img" aria-label={t('{0} 따라쓰기 가이드', char)}>
          <text
            x="50"
            y="50"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="78"
            fill="#c0bebc"
          >
            {char}
          </text>
        </svg>
      )}
    </div>
  )
}
