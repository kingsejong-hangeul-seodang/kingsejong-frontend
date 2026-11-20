import { studyApi } from '@/api/integration'
import { useStrokeReference } from '@/hooks/useStudy'
import { useReference } from './reference'

export function useAnswerStrokes(target: string) {
  const local = useReference()
  const remote = useStrokeReference(target)
  return studyApi
    ? {
        strokes: Object.fromEntries(
          (remote.data?.items ?? []).map(({ char, strokes }) => [char, strokes]),
        ),
        error: remote.error,
        loading: !remote.data && !remote.error,
        retry: remote.retry,
      }
    : {
        strokes: local.data?.characters ?? {},
        error: local.error,
        loading: local.loading,
        retry: undefined,
      }
}
