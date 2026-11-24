import { useUiText } from '@/app/useUiText'
import { useSession, type Stage } from '@/app/useSession'
import { navigate } from '@/app/router'
import { useWriting } from '@/components/writing/useWriting'
import { clearWritingMemory, writingKey } from '@/data/writingDrafts'
import { gradeWriting, makeGradeRequest } from '@/api/grading'
import { ApiError, type WritingReward } from '@/api/backend'
import { backend, demoMode, jamoRecordScope } from '@/api/integration'
import { demoGrade } from '@/api/demo'
import type { LearningTask } from './useLearningTask'
import { addRecord } from '@/data/writingRecords'
import { saveJamoAttempt } from '@/data/jamoMastery'
import type { WritingDraft } from '@/data/writingTypes'
import { visibleGrade } from '@/data/writingFeedback'

export function useWritingSubmission(stage: Stage, task: LearningTask) {
  const t = useUiText()
  const {
    screen,
    contentId,
    practiceTarget,
    accessToken,
    accountId,
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
          throw new Error(t('한 글자 이상 써 주세요.'))
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
            throw new ApiError(401, 'UNAUTHORIZED', t('로그인한 뒤 다시 제출해 주세요.'))
          if (apiId === null)
            throw new Error(
              practiceTarget
                ? t('자모 연습 콘텐츠의 서버 ID가 아직 연결되지 않았어요.')
                : t('홈에서 서버 콘텐츠를 골라 다시 시도해 주세요. 쓴 글씨는 그대로 있어요.'),
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

        if (preferences.consent) {
          try {
            const scope = jamoRecordScope(accountId)
            if (scope) saveJamoAttempt(scope, submitted)
            else if (!backend) await addRecord(submitted)
          } catch (error) {
            if (import.meta.env.DEV) console.warn('Could not save local writing history.', error)
          }
        }
        notify('')
        update({ stage, ...(reward ? { exp: reward.level.exp } : {}) })
        navigate(visibleGrade(grade)?.perfect ? 'result-done' : `result-${stage}`)
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.status === 401) {
            setAccessToken(null)
            navigate('login')
            notify(t('로그인한 뒤 다시 제출해 주세요. 쓴 글씨는 그대로 있어요.'))
            return
          }
          if (error.status >= 500) {
            notify(`${error.message} ${t('쓴 글씨는 그대로 있어요.')}`)
            return
          }
        }
        if (error instanceof Error && error.name === 'TimeoutError') {
          notify(t('제출 응답이 늦어지고 있어요. 쓴 글씨는 그대로 있어요.'))
          return
        }
        if (error instanceof TypeError) {
          notify(t('채점 서버에 연결하지 못했어요. 쓴 글씨는 그대로 있어요.'))
          return
        }
        notify(
          error instanceof Error
            ? error.message
            : t('채점 서버에 연결하지 못했어요. 다시 시도해 주세요.'),
        )
      }
    })
  }

  return { handleSubmit, submitting: writing.submitting }
}
