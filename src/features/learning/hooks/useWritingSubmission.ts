import { useSession, type Stage } from '@/app/useSession'
import { navigate } from '@/app/router'
import { useWriting } from '@/components/writing/useWriting'
import { clearWritingMemory, writingKey } from '@/data/writingDrafts'
import { gradeWriting, makeGradeRequest } from '@/api/grading'
import { ApiError, type WritingReward } from '@/api/backend'
import { backend, demoMode } from '@/api/integration'
import { demoGrade } from '@/api/demo'
import type { LearningTask } from './useLearningTask'
import { addRecord } from '@/data/writingRecords'
import type { WritingDraft } from '@/data/writingTypes'

export function useWritingSubmission(stage: Stage, task: LearningTask) {
  const {
    screen,
    contentId,
    practiceTarget,
    accessToken,
    setAccessToken,
    catalog,
    preferences,
    update,
    notify,
    saveDraft,
    setResultOrigin,
  } = useSession()
  const { target, content, groups, nextContentId, apiId } = task
  const writing = useWriting()
  async function handleSubmit() {
    await writing.submit(async () => {
      try {
        const submittedCells = writing.snapshot()
        if (!submittedCells.some((cell) => cell.strokes.length))
          throw new Error('한 글자 이상 써 주세요.')
        const request = makeGradeRequest(
          stage,
          target,
          submittedCells,
          preferences.language === 'English' ? 'en' : 'ko',
        )
        let grade
        let reward: WritingReward | undefined
        let following = nextContentId
        if (backend) {
          if (!accessToken)
            throw new ApiError(401, 'UNAUTHORIZED', '로그인한 뒤 다시 제출해 주세요.')
          if (apiId === null)
            throw new Error(
              practiceTarget
                ? '자모 연습 콘텐츠의 서버 ID가 아직 연결되지 않았어요.'
                : '홈에서 서버 콘텐츠를 골라 다시 시도해 주세요. 쓴 글씨는 그대로 있어요.',
            )
          const result = await backend.submitWriting(accessToken, apiId, request)
          grade = result.grade
          reward = result.reward
          following = result.nextContentId
          catalog.lists.clear()
          catalog.profiles.clear()
          catalog.writings.clear()
          catalog.jamoLists.clear()
          catalog.jamoDetails.clear()
        } else {
          grade = demoMode ? demoGrade(request) : await gradeWriting(request)
        }
        const submitted: WritingDraft = {
          source: screen,
          stage,
          target,
          cells: submittedCells,
          grade,
          ...(reward ? { reward } : {}),
          contentId,
          ...(following !== undefined
            ? {
                catalogContent: {
                  mode: content.mode,
                  source: content.source,
                  nextContentId: following,
                },
              }
            : {}),
          ...(groups ? { wordGroups: groups } : {}),
          ...(practiceTarget ? { practiceTarget } : {}),
        }
        saveDraft(submitted)
        setResultOrigin(null)
        clearWritingMemory(writingKey(contentId, practiceTarget, stage))

        if (!backend && preferences.consent) {
          try {
            await addRecord(submitted)
          } catch (error) {
            if (import.meta.env.DEV) console.warn('Could not save local writing history.', error)
          }
        }
        notify('')
        update({ stage, ...(reward ? { exp: reward.level.exp } : {}) })
        navigate(
          grade?.perfect && !grade.engineVersion.endsWith('stub')
            ? 'result-done'
            : `result-${stage}`,
        )
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.status === 401 && error.code === 'UNAUTHORIZED') {
            setAccessToken(null)
            navigate('login')
            notify('로그인한 뒤 다시 제출해 주세요. 쓴 글씨는 그대로 있어요.')
            return
          }
          if (error.status >= 500) {
            notify('잠시 뒤 다시 제출해 주세요. 쓴 글씨는 그대로 있어요.')
            return
          }
        }
        notify(
          error instanceof Error
            ? error.message
            : '채점 서버에 연결하지 못했어요. 다시 시도해 주세요.',
        )
      }
    })
  }

  return { handleSubmit, submitting: writing.submitting }
}
