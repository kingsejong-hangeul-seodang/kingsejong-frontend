import { useEffect, useId, useRef, type HTMLAttributes, type PointerEvent } from 'react'
import { useWriting } from './useWriting'
import styles from './WritingCell.module.css'
type Point = { x: number; y: number }
type Stroke = Point[]
export function WritingCell({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const strokes = useRef<Stroke[]>([])
  const drawing = useRef(false)
  const id = useId()
  const { register, activate, report } = useWriting()
  function paint() {
    const context = canvas.current?.getContext('2d')
    if (!context) return
    context.clearRect(0, 0, 288, 288)
    context.lineWidth = 6
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.strokeStyle = '#28221b'
    for (const stroke of strokes.current) {
      const first = stroke[0]
      if (!first) continue
      context.beginPath()
      context.moveTo(first.x, first.y)
      for (const point of stroke.slice(1)) context.lineTo(point.x, point.y)
      if (stroke.length === 1) context.lineTo(first.x + 0.2, first.y + 0.2)
      context.stroke()
    }
  }
  useEffect(() => {
    report(id, false)
    return register(id, {
      snapshot() {
        return {
          image: canvas.current?.toDataURL('image/png') ?? '',
          written: strokes.current.length > 0,
        }
      },
      run(command) {
        if (command === 'undo') strokes.current.pop()
        else strokes.current = []
        report(id, strokes.current.length > 0)
        paint()
      },
    })
  }, [id, register, report])
  function point(event: PointerEvent<HTMLCanvasElement>): Point {
    const bounds = event.currentTarget.getBoundingClientRect()
    return {
      x: ((event.clientX - bounds.left) * 288) / bounds.width,
      y: ((event.clientY - bounds.top) * 288) / bounds.height,
    }
  }
  return (
    <div {...props} className={`${className ?? ''} ${styles.cell}`}>
      {children}
      <canvas
        ref={canvas}
        className={styles.canvas}
        width={288}
        height={288}
        aria-label="글씨 쓰기 칸"
        tabIndex={0}
        onPointerDown={(event) => {
          event.preventDefault()
          activate(id)
          report(id, true)
          drawing.current = true
          event.currentTarget.setPointerCapture(event.pointerId)
          strokes.current.push([point(event)])
          paint()
        }}
        onPointerMove={(event) => {
          if (drawing.current) {
            strokes.current.at(-1)?.push(point(event))
            paint()
          }
        }}
        onPointerUp={() => {
          drawing.current = false
        }}
        onPointerCancel={() => {
          drawing.current = false
        }}
        onFocus={() => activate(id)}
        onKeyDown={(event) => {
          if (event.key === 'Delete' || event.key === 'Backspace') {
            event.preventDefault()
            strokes.current = []
            report(id, false)
            paint()
          }
        }}
      />
    </div>
  )
}
