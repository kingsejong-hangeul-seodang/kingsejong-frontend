import { useUiText } from '@/app/useUiText'
import { useEffect, useId, useRef, type HTMLAttributes, type PointerEvent } from 'react'
import { useWriting } from './useWriting'
import styles from './WritingCell.module.css'
import { pointsInside } from './inkGeometry'
type Point = [number, number, number, number]
type Stroke = Point[]

function canDraw(pointerType: string) {
  if (pointerType === 'pen') return true
  const isIPad =
    /iPad/.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  return pointerType === 'mouse' && !isIPad
}
export function WritingCell({
  children,
  className,
  index = 0,
  ...props
}: HTMLAttributes<HTMLDivElement> & { index?: number }) {
  const t = useUiText()
  const { restoreCell, rememberCell } = useWriting()
  const canvas = useRef<HTMLCanvasElement>(null)
  const strokes = useRef<Stroke[]>(
    restoreCell(index)?.strokes.map((stroke) => stroke.points.map((point): Point => [...point])) ??
      [],
  )
  const pendingPoints = useRef<Stroke>([])
  const pointer = useRef<number | null>(null)
  const id = useId()
  const { register, activate, activeId, report, timestamp, commitStroke } = useWriting()
  function remember() {
    rememberCell(index, {
      image: '',
      written: strokes.current.length > 0,
      strokes: strokes.current.map((points) => ({
        points: points.map((point): Point => [...point]),
      })),
    })
  }
  function paint() {
    const context = canvas.current?.getContext('2d')
    if (!context) return
    context.clearRect(0, 0, 288, 288)
    context.lineWidth = 6
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.strokeStyle = '#28221b'
    const bounds = canvas.current?.getBoundingClientRect()
    const preview = bounds ? pointsInside(pendingPoints.current, bounds) : []
    for (const stroke of [...strokes.current, preview]) {
      const first = stroke[0]
      if (!first) continue
      context.beginPath()
      context.moveTo(first[0], first[1])
      for (const point of stroke.slice(1)) context.lineTo(point[0], point[1])
      if (stroke.length === 1) context.lineTo(first[0] + 0.2, first[1] + 0.2)
      context.stroke()
    }
  }
  useEffect(() => {
    report(id, strokes.current.length > 0)
    if (strokes.current.length) activate(id)
    paint()
    return register(id, {
      index,
      bounds: () => canvas.current?.getBoundingClientRect(),
      append(stroke) {
        strokes.current.push(stroke)
        report(id, true)
        remember()
        paint()
      },
      snapshot() {
        return {
          image: canvas.current?.toDataURL('image/png') ?? '',
          written: strokes.current.length > 0,
          strokes: strokes.current.map((points) => ({
            points: points.map((point): Point => [...point]),
          })),
        }
      },
      run(command) {
        pendingPoints.current = []
        pointer.current = null
        if (command === 'undo') strokes.current.pop()
        else strokes.current = []
        report(id, strokes.current.length > 0)
        remember()
        paint()
      },
    })
    // The provider owns a stable cache for this mounted practice screen.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, register, report])
  function point(event: PointerEvent<HTMLCanvasElement>): Point {
    return [
      event.clientX,
      event.clientY,
      timestamp(),
      event.pointerType === 'pen' && event.pressure > 0 ? event.pressure : 0.5,
    ]
  }
  function finishPointer(pointerId: number, commit: boolean) {
    if (pointer.current !== pointerId) return
    const points = pendingPoints.current
    pointer.current = null
    pendingPoints.current = []
    if (commit) commitStroke(id, points)
    paint()
  }
  return (
    <div {...props} data-active={activeId === id} className={`${className ?? ''} ${styles.cell}`}>
      {children}
      <canvas
        ref={canvas}
        className={styles.canvas}
        width={288}
        height={288}
        aria-label={t('글씨 쓰기 칸')}
        tabIndex={0}
        onPointerDown={(event) => {
          if (
            pointer.current !== null ||
            !event.isPrimary ||
            event.button !== 0 ||
            !canDraw(event.pointerType)
          )
            return
          event.preventDefault()
          activate(id)
          pointer.current = event.pointerId
          event.currentTarget.setPointerCapture(event.pointerId)
          pendingPoints.current = [point(event)]
          paint()
        }}
        onPointerMove={(event) => {
          if (pointer.current === event.pointerId) {
            pendingPoints.current.push(point(event))
            paint()
          }
        }}
        onPointerUp={(event) => {
          if (pointer.current !== event.pointerId) return
          pendingPoints.current.push(point(event))
          finishPointer(event.pointerId, true)
        }}
        onPointerCancel={(event) => finishPointer(event.pointerId, false)}
        onLostPointerCapture={(event) => finishPointer(event.pointerId, true)}
        onFocus={() => activate(id)}
        onKeyDown={(event) => {
          if (event.key === 'Delete' || event.key === 'Backspace') {
            event.preventDefault()
            strokes.current = []
            report(id, false)
            remember()
            paint()
          }
        }}
      />
    </div>
  )
}
