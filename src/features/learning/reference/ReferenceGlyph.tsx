import { useReference } from './reference'
import { useGuideFont } from './guideFont'
import type { ReferenceStroke } from '@/api/grading'
export function ReferenceGlyph({
  char,
  progress = Infinity,
  guide = false,
  numbers = false,
  color = '#28221b',
  referenceStrokes,
}: {
  char: string
  progress?: number
  guide?: boolean
  numbers?: boolean
  color?: string
  referenceStrokes?: ReferenceStroke[] | undefined
}) {
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
        aria-label={`${char} 정답 글씨`}
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
        aria-label={`${char} 정답 글씨`}
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
      aria-label={`${char} 정답 획순`}
      style={{ width: '100%', height: '100%', pointerEvents: 'none', opacity: guide ? 0.24 : 1 }}
    >
      {strokes.map((stroke, index) => {
        const fraction = Math.max(0, Math.min(1, progress - index))
        const first = stroke.points[0]!
        return (
          <g key={stroke.order}>
            {numbers && (
              <polyline
                points={stroke.points.map(([x, y]) => `${x * 100},${y * 100}`).join(' ')}
                fill="none"
                stroke="#ded8cc"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            )}
            <polyline
              points={stroke.points.map(([x, y]) => `${x * 100},${y * 100}`).join(' ')}
              fill="none"
              stroke={guide ? '#807768' : color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - fraction}
              opacity={fraction > 0 ? 1 : 0}
            />
            {numbers && fraction > 0 && (
              <text x={first[0] * 100} y={first[1] * 100 - 3} fontSize="7" fill="#a33227">
                {stroke.order}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
