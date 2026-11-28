import {
  SessionExpiredError,
  ApiError,
  apiModes,
  type ApiMode,
  backend,
  demoMode,
  demoContent,
  demoContents,
  engineStages,
} from '@/api/api'
import { useCallback, useEffect, useState } from 'react'
import { useSession, type Mode, type Stage } from '@/app/useSession'

export const catalogEnabled = Boolean(backend || demoMode)
export const screenModes: Record<ApiMode, Mode> = { kpop: 'pop', kdrama: 'drama', basic: 'basic' }

export function catalogKey(id: number) {
  return `catalog:${id}`
}

export function catalogId(key: string) {
  return /^catalog:[1-9]\d*$/.test(key) ? Number(key.slice('catalog:'.length)) : null
}

export function useCatalogRequest<T>(
  key: string | null,
  cache: Map<string, Promise<T>>,
  load: () => Promise<T>,
) {
  const [attempt, setAttempt] = useState(0)
  const [result, setResult] = useState<{
    key: string
    cache: Map<string, Promise<T>>
    attempt: number
    data?: T
    error?: string
  }>()

  useEffect(() => {
    if (key === null) return
    let active = true
    let pending = cache.get(key)
    if (!pending) {
      pending = load()
      cache.set(key, pending)
    }
    const request = pending
    void request.then(
      (data) => {
        if (active) setResult({ key, cache, attempt, data })
      },
      (error: unknown) => {
        if (cache.get(key) === request) cache.delete(key)
        if (!active) return
        if (error instanceof SessionExpiredError) return
        setResult({
          key,
          cache,
          attempt,
          error: error instanceof Error ? error.message : '콘텐츠를 불러오지 못했어요.',
        })
      },
    )
    return () => {
      active = false
    }
  }, [attempt, cache, key, load])

  const current =
    result && result.key === key && result.cache === cache && result.attempt === attempt
      ? result
      : undefined
  return {
    data: current?.data,
    error: current?.error,
    retry: () => setAttempt((value) => value + 1),
  }
}

export function useCatalogList(mode: Mode, stage: Stage, enabled = true) {
  const { catalog, preferences } = useSession()
  const favorite = demoMode ? (mode === 'drama' ? preferences.drama : preferences.singer) : ''
  const { lists, token } = catalog
  const load = useCallback(async () => {
    if (!backend) return demoContents(mode, stage, favorite)
    if (!token) throw new ApiError(401, 'UNAUTHORIZED', '로그인이 필요해요.')
    return backend.listContents(token, apiModes[mode], engineStages[stage])
  }, [mode, favorite, stage, token])
  return useCatalogRequest(
    enabled && catalogEnabled ? JSON.stringify([mode, stage, favorite]) : null,
    lists,
    load,
  )
}

export function useCatalogDetail(id: number | null, stage: Stage) {
  const { catalog } = useSession()
  const { details, token } = catalog
  const load = useCallback(async () => {
    if (id === null) throw new Error('연습할 콘텐츠를 선택해 주세요.')
    if (!backend) return demoContent(id, stage)
    if (!token) throw new ApiError(401, 'UNAUTHORIZED', '로그인이 필요해요.')
    return backend.getContent(token, id, engineStages[stage])
  }, [id, stage, token])
  return useCatalogRequest(id === null ? null : JSON.stringify([id, stage]), details, load)
}
