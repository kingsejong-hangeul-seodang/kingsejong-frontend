import { contents, practiceContents, targetCells, targetGroups } from '@/data/content'
import type { Mode, Stage } from '@/app/session'
import { ApiError, apiModes, writeModes, type ContentDetail, type ContentItem } from './backend'
import { engineStages } from './grading'

const artwork: Record<string, { thumbnailUrl: string; durationSec: number }> = {
  'miss-you': { thumbnailUrl: '/assets/figma/3d07b.png', durationSec: 24 },
  today: { thumbnailUrl: '/assets/figma/01084.png', durationSec: 18 },
  walk: { thumbnailUrl: '/assets/figma/3d07b.png', durationSec: 27 },
  'drama-you': { thumbnailUrl: '/assets/figma/547a2.png', durationSec: 21 },
  meal: { thumbnailUrl: '/assets/figma/8aa02.png', durationSec: 16 },
}
const entries = contents.map((content, index) => ({
  ...content,
  id: index + 1,
  localId: content.id,
}))
const ids = new Map(entries.map((entry) => [entry.localId, entry.id]))

function cellCount(target: string, stage: Stage) {
  return targetCells(target, stage).length + (stage === 'pro' ? 2 : 0)
}

function contentKind(mode: Mode, target: string): ContentItem['kind'] {
  if (mode !== 'basic') return 'clip'
  if (/^[ㄱ-ㅎㅏ-ㅣ]$/.test(target)) return 'jamo'
  return target.includes(' ') ? 'sentence' : 'word'
}

export function demoContents(mode: Mode, stage: Stage, favorite: string): ContentItem[] {
  return practiceContents(mode, stage)
    .map((item) => {
      const target = item.targets[stage]
      return {
        id: ids.get(item.id)!,
        mode: apiModes[mode],
        kind: contentKind(mode, target),
        writeMode: writeModes[engineStages[stage]],
        title: stage === 'pro' ? (item.dictationTitle ?? item.title) : item.title,
        source: item.source,
        thumbnailUrl: artwork[item.id]?.thumbnailUrl ?? null,
        durationSec: artwork[item.id]?.durationSec ?? null,
        meaning: item.meaning,
        target: stage === 'pro' ? null : target,
        cellCount: stage === 'pro' ? null : cellCount(target, stage),
        wordCount: stage === 'pro' ? null : target.split(' ').length,
        tasteMatched: mode !== 'basic' && favorite !== '' && item.source.startsWith(favorite),
        completed: false,
        perfect: false,
      }
    })
    .sort((first, second) => Number(second.tasteMatched) - Number(first.tasteMatched))
}

export function demoContent(id: number, stage: Stage): ContentDetail {
  const item = entries.find((entry) => entry.id === id)
  if (!item) throw new ApiError(404, 'NOT_FOUND', '연습할 콘텐츠를 찾지 못했어요.')
  const target = item.targets[stage]
  const duration = artwork[item.localId]?.durationSec
  const next = practiceContents(item.mode, stage).find((entry) => ids.get(entry.id)! > id)
  return {
    id,
    mode: apiModes[item.mode],
    kind: contentKind(item.mode, target),
    title: stage === 'pro' ? (item.dictationTitle ?? item.title) : item.title,
    source: item.source,
    thumbnailUrl: artwork[item.localId]?.thumbnailUrl ?? null,
    clip: duration ? { startSec: 0, endSec: duration, embeddable: false } : null,
    lines: duration ? [{ startSec: 0, text: item.targets.pro, translation: item.meaning }] : [],
    situation: null,
    task: {
      stage: engineStages[stage],
      writeMode: writeModes[engineStages[stage]],
      target,
      meaning: item.meaning,
      cellCount: cellCount(target, stage),
      wordGroups: targetGroups(target, stage) ?? null,
      speech: item.mode === 'basic' ? { text: target, lang: 'ko-KR' } : null,
    },
    nextContentId: next ? ids.get(next.id)! : null,
  }
}
