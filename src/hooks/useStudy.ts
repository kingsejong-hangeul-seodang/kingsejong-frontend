import { useCallback } from 'react'
import { ApiError } from '@/api/backend'
import { backend, studyApi } from '@/api/integration'
import { demoJamoDetail, demoJamoList } from '@/api/demoJamo'
import type { TasteItem } from '@/api/study'
import { useSession } from '@/app/useSession'
import { useCatalogRequest } from './useCatalog'

function requireToken(token: string | null) {
  if (!token) throw new ApiError(401, 'UNAUTHORIZED', '로그인이 필요해요.')
  return token
}

export function useProfile() {
  const { catalog } = useSession()
  const { token, profiles } = catalog
  const load = useCallback(async () => backend!.getMe(requireToken(token)), [token])
  return useCatalogRequest(backend ? 'me' : null, profiles, load)
}

export function useJamoList() {
  const { catalog } = useSession()
  const { token, jamoLists } = catalog
  const load = useCallback(
    async () => (studyApi ? studyApi.jamoList(requireToken(token)) : demoJamoList),
    [token],
  )
  return useCatalogRequest('jamo', jamoLists, load)
}

export function useJamoDetail(jamo: string) {
  const { catalog } = useSession()
  const { token, jamoDetails } = catalog
  const load = useCallback(
    async () => (studyApi ? studyApi.jamoDetail(requireToken(token), jamo) : demoJamoDetail(jamo)),
    [jamo, token],
  )
  return useCatalogRequest(jamo, jamoDetails, load)
}

export function useWritingPage(cursor: string) {
  const { catalog } = useSession()
  const { token, writings } = catalog
  const load = useCallback(
    async () => studyApi!.writings(requireToken(token), cursor),
    [cursor, token],
  )
  return useCatalogRequest(studyApi ? cursor : null, writings, load)
}

export function useStrokeReference(target: string) {
  const { catalog } = useSession()
  const { token, strokes } = catalog
  const chars = [...new Set(target.match(/[가-힣ㄱ-ㅣ]/g) ?? [])].join('')
  const load = useCallback(
    async () => studyApi!.strokes(requireToken(token), chars),
    [chars, token],
  )
  return useCatalogRequest(studyApi && chars ? chars : null, strokes, load)
}

export function useTastes(mode: TasteItem['mode']) {
  const { catalog, preferences } = useSession()
  const { token, tastes } = catalog
  const favorite = studyApi ? '' : mode === 'kpop' ? preferences.singer : preferences.drama
  const load = useCallback(async (): Promise<TasteItem[]> => {
    if (studyApi) return studyApi.tastes(requireToken(token), mode)
    const choices =
      mode === 'kpop'
        ? [
            { name: '하늘별', imageUrl: '/assets/figma/3d07b.png' },
            { name: '루나틱', imageUrl: '/assets/figma/01084.png' },
          ]
        : [
            { name: '서당의 봄', imageUrl: '/assets/figma/547a2.png' },
            { name: '한강 로맨스', imageUrl: '/assets/figma/8aa02.png' },
          ]
    return choices.map(({ name, imageUrl }, index) => ({
      id: index + 1,
      mode,
      name,
      imageUrl,
      selected: favorite === name,
    }))
  }, [mode, favorite, token])
  return useCatalogRequest(JSON.stringify([mode, favorite]), tastes, load)
}

export function useLevelTestSteps() {
  const { catalog } = useSession()
  const { token, levelTests } = catalog
  const load = useCallback(async () => studyApi!.levelTest(requireToken(token)), [token])
  return useCatalogRequest(studyApi ? 'level-test' : null, levelTests, load)
}
