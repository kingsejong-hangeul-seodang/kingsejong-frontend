import type { InkPoint } from '@/api/grading'

type Bounds = { left: number; top: number; width: number; height: number }

export function pointsInside(points: InkPoint[], bounds: Bounds): InkPoint[] {
  if (bounds.width <= 0 || bounds.height <= 0) return []
  const { left, top, width, height } = bounds
  return points.flatMap(([x, y, time, pressure]) =>
    x >= left && x < left + width && y >= top && y < top + height
      ? [[((x - left) * 288) / width, ((y - top) * 288) / height, time, pressure]]
      : [],
  )
}

export function assignStroke(
  points: InkPoint[],
  cells: { id: string; bounds: Bounds }[],
  origin: string,
) {
  let best: { id: string; points: InkPoint[] } | undefined
  for (const cell of cells) {
    const inside = pointsInside(points, cell.bounds)
    if (!inside.length) continue
    if (
      !best ||
      inside.length > best.points.length ||
      (inside.length === best.points.length && cell.id === origin)
    )
      best = { id: cell.id, points: inside }
  }
  return best
}
