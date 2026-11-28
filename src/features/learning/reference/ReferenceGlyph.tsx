import { useUiText } from '@/app/useUiText'
import { useReference } from './reference'
import { useGuideFont } from './guideFont'
import type { ReferenceStroke } from '@/api/api'
export function ReferenceGlyph({
  char,
  progress = Infinity,
  guide = false,
  numbers = false,
  color = '#28221b',
  referenceStrokes,
  progressByStroke,
}: {
  char: string
  progress?: number
  guide?: boolean
  numbers?: boolean
  color?: string
  referenceStrokes?: ReferenceStroke[] | undefined
  progressByStroke?: readonly number[] | undefined
}) {
  const t = useUiText()
  const { data } = useReference()
  const font = useGuideFont()
  const selected = referenceStrokes ?? data?.characters[char]
  const strokes = selected?.length ? selected : undefined
  if (char === ' ') return null
  if (!strokes && font.data && font.data.bounds[char])
    return (
      <svg
        viewBox={font.data.frame.join(' ')}
        role="img"
        aria-label={t('{0} 정답 글씨', char)}
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <text
          x={0}
          y={0}
          fontFamily={font.family}
          fontSize={font.data.unitsPerEm}
          fill={guide ? '#c0bebc' : color}
        >
          {char}
        </text>
      </svg>
    )
  if (!strokes)
    return (
      <svg
        viewBox="0 0 100 100"
        role="img"
        aria-label={t('{0} 정답 글씨', char)}
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="68"
          fill={guide ? '#c0bebc' : color}
        >
          {char}
        </text>
      </svg>
    )
  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label={t('{0} 정답 획순', char)}
      style={{ width: '100%', height: '100%', pointerEvents: 'none', opacity: guide ? 0.24 : 1 }}
    >
      {strokes.map((stroke, index) => {
        const fraction = progressByStroke?.[index] ?? Math.max(0, Math.min(1, progress - index))
        const first = stroke.points[0]!
        const active = fraction > 0 && fraction < 1
        const labelX = Math.max(4, Math.min(96, first[0] * 100 - 4))
        const labelY = Math.max(4, Math.min(96, first[1] * 100 - 5))
        const width = numbers ? 8.5 : 2
        return (
          <g key={stroke.order}>
            {numbers && (
              <polyline
                points={stroke.points.map(([x, y]) => `${x * 100},${y * 100}`).join(' ')}
                fill="none"
                stroke="#ded8cc"
                strokeWidth={width}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            <polyline
              points={stroke.points.map(([x, y]) => `${x * 100},${y * 100}`).join(' ')}
              fill="none"
              stroke={guide ? '#807768' : active ? '#bd4b2d' : color}
              strokeWidth={width}
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - fraction}
              opacity={fraction > 0 ? 1 : 0}
            />
            {numbers && fraction > 0 && (
              <g>
                <circle cx={labelX} cy={labelY} r="3.5" fill="#bd4b2d" />
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="5"
                  fill="white"
                >
                  {stroke.order}
                </text>
              </g>
            )}
          </g>
        )
      })}
    </svg>
  )
}
