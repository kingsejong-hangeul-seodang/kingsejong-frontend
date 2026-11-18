import { ManuscriptPaper } from './ManuscriptPaper'
import type { Stage } from '@/app/session'
const answers = {
  beginner: ['/assets/figma/7586b.svg', '/assets/figma/4e6c6.svg'],
  mid: [
    '/assets/figma/56792.svg',
    '/assets/figma/de2b1.svg',
    '/assets/figma/f718c.svg',
    '/assets/figma/12938.svg',
    '/assets/figma/41ecd.svg',
  ],
  pro: [
    '/assets/figma/50707.svg',
    null,
    '/assets/figma/f686d.svg',
    null,
    '/assets/figma/14dde.svg',
    '/assets/figma/8e60d.svg',
    '/assets/figma/b6c21.svg',
    '/assets/figma/2f134.svg',
    '/assets/figma/71fea.svg',
  ],
} as const
export function AnswerPaper({ stage }: { stage: Stage }) {
  const cells = answers[stage]
  return (
    <ManuscriptPaper
      name="answer-writing"
      count={cells.length}
      columns={stage === 'pro' ? 9 : cells.length}
      cellSize={stage === 'beginner' ? 144 : stage === 'mid' ? 96 : 72}
      groups={stage === 'mid' ? [2, 3] : undefined}
      compact
      renderCell={(index) =>
        cells[index] ? (
          <img src={cells[index]} alt={`${index + 1}번째 칸의 정답`} style={{ padding: '14%' }} />
        ) : null
      }
    />
  )
}
