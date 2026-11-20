import { useMemo } from 'react'
import simplify from 'simplify-js'
import type { SubmittedCell } from '@/data/writingTypes'
import type { GradeError, InkStroke } from '@/api/grading'

// Tolerance in the 288 × 288 ink coordinate space, for display only.
const DISPLAY_TOLERANCE = 0.5

function polylinePoints(points: InkStroke['points'], simplifyDisplay: boolean) {
  const coordinates = points.map(([x, y]) => ({ x, y }))
  const display = simplifyDisplay ? simplify(coordinates, DISPLAY_TOLERANCE, true) : coordinates
  const first = display[0]
  if (display.length === 1 && first) {
    return `${first.x},${first.y} ${first.x + 0.2},${first.y + 0.2}`
  }
  return display.map(({ x, y }) => `${x},${y}`).join(' ')
}

export function GradedInk({
  cell,
  errors,
  until = Infinity,
}: {
  cell: SubmittedCell
  errors: GradeError[]
  until?: number
}) {
  const finishedStrokes = useMemo(
    () => cell.strokes.map((stroke) => polylinePoints(stroke.points, true)),
    [cell.strokes],
  )
  const wrong = new Set(
    errors.flatMap((error) => (error.strokeIndex == null ? [] : [error.strokeIndex])),
  )
  return (
    <svg viewBox="0 0 288 288" role="img" aria-label="제출한 글씨. 오류가 있는 획은 빨간색입니다.">
      {cell.strokes.map((stroke, index) => {
        const lastPoint = stroke.points.at(-1)
        const points =
          lastPoint && lastPoint[2] > until
            ? polylinePoints(
                stroke.points.filter((point) => point[2] <= until),
                false,
              )
            : finishedStrokes[index]
        return (
          <polyline
            key={index}
            points={points}
            fill="none"
            stroke={wrong.has(index) ? '#bd302a' : '#28221b'}
            strokeWidth={6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )
      })}
    </svg>
  )
}
