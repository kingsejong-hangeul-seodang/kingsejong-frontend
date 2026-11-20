import catalog from './content.json'
import type { Stage, Mode } from '@/app/session'
export type Content = {
  id: string
  title: string
  source: string
  meaning: string
  mode: Mode
  targets: Record<Stage, string>
  stages?: readonly Stage[]
  dictationTitle?: string
}
export const contents = catalog as Content[]
export function practiceContents(mode: Mode, stage: Stage) {
  return contents.filter(
    (item) => item.mode === mode && (!item.stages || item.stages.includes(stage)),
  )
}
export function listeningTitle(title: string, target: string, fallback = '기본 듣기 연습') {
  return target && title.normalize('NFC').includes(target.normalize('NFC')) ? fallback : title
}
export function contentById(id: string) {
  return contents.find((item) => item.id === id) ?? contents[0]!
}
export function learningContent(id: string, practiceTarget: string | null) {
  return practiceTarget
    ? {
        id: 'jamo-practice',
        title: practiceTarget,
        source: '자모 연습',
        meaning: '',
        mode: 'basic' as const,
        targets: { beginner: practiceTarget, mid: practiceTarget, pro: practiceTarget },
      }
    : contentById(id)
}
export function targetCells(target: string, stage: Stage) {
  const text = target.normalize('NFC')
  return [...(stage === 'pro' ? text : text.replaceAll(' ', ''))]
}
export function targetGroups(target: string, stage: Stage) {
  return stage === 'mid' ? target.split(' ').map((word) => [...word].length) : undefined
}
