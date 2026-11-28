import { useEffect, useSyncExternalStore } from 'react'
import type { ReferenceStroke } from '@/api/api'
import { guideAssetBase, useGuideFont } from './guideFont.ts'
export type ReferencePack = {
  schemaVersion: number
  font: string
  fontSha256: string
  totalGenerated: number
  characters: Record<string, ReferenceStroke[]>
}
type State = { data: ReferencePack | null; error: string; loading: boolean }
// This reference was extracted locally from the supplied Noto font for the meeting demo.
export const notoDemoSha256 = '566af812d5704c8dfa17d56f00d86203ef63236a8b6802963b5ebe869c57c15b'
export const donggukFontName = 'DONGGUK UNIVERSITY'
export function isNotoDemo(pack: ReferencePack) {
  return pack.font === 'Noto Sans KR Light' && pack.fontSha256 === notoDemoSha256
}
let state: State = { data: null, error: '', loading: false }
const listeners = new Set<() => void>()
function publish(next: State) {
  state = next
  listeners.forEach((listener) => listener())
}
const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
export function parseReference(value: unknown): ReferencePack {
  if (!value || typeof value !== 'object') throw new Error('정답 JSON 형식이 올바르지 않아요.')
  const pack = value as ReferencePack
  if (
    pack.schemaVersion !== 1 ||
    typeof pack.font !== 'string' ||
    typeof pack.fontSha256 !== 'string' ||
    !Number.isSafeInteger(pack.totalGenerated) ||
    pack.totalGenerated < 1 ||
    pack.totalGenerated > 11223 ||
    !pack.characters ||
    typeof pack.characters !== 'object' ||
    Array.isArray(pack.characters)
  )
    throw new Error('생성한 reference.json 파일을 선택해 주세요.')
  const entries = Object.entries(pack.characters)
  if (!entries.length || entries.length > 11223) throw new Error('정답 글자 수를 확인해 주세요.')
  for (const [char, strokes] of entries) {
    if (
      [...char].length !== 1 ||
      !Array.isArray(strokes) ||
      !strokes.length ||
      strokes.length > 100 ||
      !strokes.every(
        (stroke, index) =>
          stroke &&
          stroke.order === index + 1 &&
          typeof stroke.jamo === 'string' &&
          ['cho', 'jung', 'jong'].includes(stroke.role) &&
          Array.isArray(stroke.points) &&
          stroke.points.length > 0 &&
          stroke.points.length <= 1000 &&
          stroke.points.every(
            (point) =>
              Array.isArray(point) &&
              point.length === 2 &&
              point.every(
                (coordinate) => Number.isFinite(coordinate) && coordinate >= 0 && coordinate <= 1,
              ),
          ),
      )
    )
      throw new Error(`${char}의 정답 획 데이터를 확인해 주세요.`)
  }
  return pack
}
export function installReference(value: unknown) {
  publish({ data: parseReference(value), error: '', loading: false })
}
export async function loadReference() {
  if (state.loading) return
  publish({ ...state, loading: true, error: '' })
  try {
    const base = guideAssetBase()
    const response = await fetch(`${base}reference.json`, {
      cache: 'no-store',
      signal: AbortSignal.timeout(15000),
    })
    if (!response.ok) throw new Error('정답 데이터를 불러오지 못했어요.')
    installReference(await response.json())
  } catch (error) {
    publish({
      data: null,
      loading: false,
      error: error instanceof Error ? error.message : '정답 데이터를 불러오지 못했어요.',
    })
  }
}
export function useReference() {
  const guideFont = useGuideFont()
  const current = useSyncExternalStore(subscribe, () => state)
  useEffect(() => {
    if (!state.data && !state.error && !state.loading) void loadReference()
  }, [])
  if (current.data && isNotoDemo(current.data)) return current
  if (!guideFont.data)
    return {
      data: null,
      loading: current.loading || guideFont.loading,
      error: current.error || guideFont.error,
    }
  if (current.data && guideFont.data.sha256 !== current.data.fontSha256)
    return { ...current, data: null, error: '동국체 정답 획 데이터는 아직 준비 중이에요.' }
  return current
}
