import { useStrokeReference } from '@/hooks/useStudy'
import { useReference } from './reference'

export function useAnswerStrokes(target: string) {
  const local = useReference()
  const remote = useStrokeReference(target)
  const localStrokes = local.data?.characters ?? {}
  const strokes = Object.fromEntries(
    [...new Set(target)].flatMap((char) =>
      localStrokes[char] ? [[char, localStrokes[char]]] : [],
    ),
  )
  for (const item of remote.data?.items ?? []) {
    if (item.strokes.length) strokes[item.char] = item.strokes
  }
  return {
    strokes,
    loading: local.loading || remote.loading,
    error: remote.error ?? local.error,
    retry: remote.error ? remote.retry : undefined,
  }
}
