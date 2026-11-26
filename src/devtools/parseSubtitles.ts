export type Line = { startSec: number; endSec: number; text: string }

const cuePattern = /^\s*([\d:.,]+)\s*-->\s*([\d:.,]+)/
const simplePattern = /^\s*(\d+(?::\d+){0,2}(?:[.,]\d+)?)\s+(.+)$/
const fallbackSec = 3

function seconds(value: string | undefined) {
  if (!value) return null
  const parts = value.trim().replace(',', '.').split(':').map(Number)
  if (parts.some((part) => Number.isNaN(part))) return null
  return parts.reduce((total, part) => total * 60 + part, 0)
}

// "00:00:17,000 --> 00:00:19,500" (SRT·VTT) 또는 "0:17 가사" / "17.5 가사" 한 줄씩
export function parseSubtitles(text: string): Line[] {
  const rows = text.replace(/\r/g, '').split('\n')
  const lines: (Line & { guessed: boolean })[] = []
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i] ?? ''
    const cue = cuePattern.exec(row)
    if (cue) {
      const body: string[] = []
      while ((rows[i + 1] ?? '').trim()) body.push((rows[++i] ?? '').trim())
      const start = seconds(cue[1])
      const end = seconds(cue[2])
      const words = body
        .join(' ')
        .replace(/<[^>]+>/g, '')
        .trim()
      if (start != null && end != null && words)
        lines.push({ startSec: start, endSec: end, text: words, guessed: false })
      continue
    }
    const simple = simplePattern.exec(row)
    const start = seconds(simple?.[1])
    const words = simple?.[2]?.trim()
    if (start != null && words)
      lines.push({ startSec: start, endSec: start + fallbackSec, text: words, guessed: true })
  }
  // 시작 시간만 적은 줄은 다음 줄 시작까지 (최대 3초)
  return lines.map(({ guessed, ...line }, index) => {
    const next = lines[index + 1]
    return guessed && next && next.startSec > line.startSec
      ? { ...line, endSec: Math.min(line.endSec, next.startSec) }
      : line
  })
}
