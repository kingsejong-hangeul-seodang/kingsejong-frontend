import { useSession, type Stage } from '@/app/useSession'
import { learningContent, targetCells, targetGroups } from '@/data/content'
import { catalogId, screenModes, useCatalogDetail } from '@/hooks/useCatalog'

export function useLearningTask(stage: Stage) {
  const { contentId, practiceTarget } = useSession()
  const id = practiceTarget ? null : catalogId(contentId)
  const detail = useCatalogDetail(id, stage)
  const { selectedThumbnail } = useSession()
  if (id !== null) {
    const data = detail.data
    return {
      ...detail,
      task: data && {
        content: {
          id: contentId,
          mode: screenModes[data.mode],
          title: data.title,
          source: data.source,
          thumbnailUrl: data.thumbnailUrl ?? selectedThumbnail,
          meaning: data.task.meaning ?? '',
          lines: data.lines,
          durationSec: data.clip ? data.clip.endSec - data.clip.startSec : null,
          clip: data.clip,
        },
        target: data.task.target,
        cellCount: data.task.cellCount,
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
      cellCount: targetCells(target, stage).length + (stage === 'pro' ? 2 : 0),
      groups: targetGroups(target, stage),
      nextContentId: undefined,
      apiId: null,
    },
  }
}

export type LearningTask = NonNullable<ReturnType<typeof useLearningTask>['task']>
