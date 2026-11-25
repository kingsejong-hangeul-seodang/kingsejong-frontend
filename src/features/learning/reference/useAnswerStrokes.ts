import { useStrokeReference } from '@/hooks/useStudy'
import { donggukFontName, isNotoDemo, useReference } from './reference'
import { useGuideFont } from './guideFont'

export function useAnswerStrokes(target: string) {
  const local = useReference()
  const guide = useGuideFont()
  const remote = useStrokeReference(target)
  const remoteFont = remote.data?.font
  const remoteDongguk = remoteFont?.replace(/-/g, ' ').toUpperCase() === donggukFontName
  const dongguk =
    guide.data?.font === donggukFontName || local.data?.font === donggukFontName || remoteDongguk
  const localStrokes =
    dongguk && local.data?.font !== donggukFontName ? {} : (local.data?.characters ?? {})
  const prefersLocal = local.data && !isNotoDemo(local.data)
  const chars = [...new Set(target.match(/[가-힣ㄱ-ㅣ]/g) ?? [])]
  const strokes = Object.fromEntries(
    chars.flatMap((char) => (localStrokes[char] ? [[char, localStrokes[char]]] : [])),
  )
  const compatible = !dongguk || remoteDongguk
  for (const item of (compatible ? remote.data?.items : undefined) ?? []) {
    if (item.strokes.length && (!prefersLocal || !localStrokes[item.char]?.length))
      strokes[item.char] = item.strokes
  }
  const coveredLocally = chars.length > 0 && chars.every((char) => localStrokes[char]?.length)
  return {
    strokes,
    font: dongguk ? donggukFontName : (remoteFont ?? local.data?.font),
    loading: local.loading || (!coveredLocally && remote.loading),
    error: coveredLocally ? '' : (remote.error ?? local.error),
    retry: !coveredLocally && remote.error ? remote.retry : undefined,
  }
}
