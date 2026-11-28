import { useSession, type Stage } from '@/app/useSession'
import { learningContent, practiceCellCount, targetGroups } from '@/data/content'
import { catalogId, screenModes, useCatalogDetail } from '@/hooks/useCatalog'
import { writeModes, engineStages } from '@/api/api'

export function useLearningTask(stage: Stage) {
  const { contentId, practiceTarget, selectedThumbnail } = useSession()
  const id = practiceTarget ? null : catalogId(contentId)
  const detail = useCatalogDetail(id, stage)
  if (id !== null) {
    const data = detail.data
    return {
      ...detail,
      task: data && {
        content: {
          id: contentId,
          mode: screenModes[data.mode],
          title: data.title,
          source: data.source ?? (data.mode === 'basic' ? '기본 연습' : ''),
          thumbnailUrl: data.thumbnailUrl ?? selectedThumbnail,
          meaning: data.task.meaning ?? '',
          lines: data.lines,
          durationSec: data.clip ? data.clip.endSec - data.clip.startSec : null,
          clip: data.clip,
        },
        target: data.task.target,
        writeMode: data.task.writeMode,
        speech: data.task.speech,
        cellCount:
          stage === 'pro' ? practiceCellCount(data.task.target, stage) : data.task.cellCount,
        groups:
          stage === 'mid'
            ? (data.task.wordGroups ?? targetGroups(data.task.target, stage))
            : undefined,
        nextContentId: data.nextContentId,
        apiId: id,
      },
    }
  }
  const content = learningContent(contentId, practiceTarget)
  const target = content.targets[stage]
  return {
    ...detail,
    task: {
      content,
      target,
      writeMode: writeModes[engineStages[stage]],
      speech: null,
      cellCount: practiceCellCount(target, stage),
      groups: targetGroups(target, stage),
      nextContentId: undefined,
      apiId: null,
    },
  }
}

export type LearningTask = NonNullable<ReturnType<typeof useLearningTask>['task']>
