import { useEffect, useSyncExternalStore } from 'react'
export type GuideFont = {
  schemaVersion: number
  font: string
  sha256: string
  unitsPerEm: number
  hangulCount: number
  frame: [number, number, number, number]
  bounds: Record<string, [number, number, number, number]>
}
export function parseGuideFont(value: unknown): GuideFont {
  if (!value || typeof value !== 'object') throw new Error('가이드 폰트 정보를 확인해 주세요.')
  const font = value as GuideFont
  if (
    font.schemaVersion !== 1 ||
    typeof font.font !== 'string' ||
    !/^[a-f0-9]{64}$/.test(font.sha256) ||
    !Number.isFinite(font.unitsPerEm) ||
    font.unitsPerEm <= 0 ||
    !Array.isArray(font.frame) ||
    font.frame.length !== 4 ||
    !font.frame.every(Number.isFinite) ||
    font.frame[2] <= 0 ||
    font.frame[3] <= 0 ||
    !font.bounds ||
    typeof font.bounds !== 'object' ||
    Array.isArray(font.bounds)
  )
    throw new Error('가이드 폰트 정보가 올바르지 않아요.')
  for (const [char, bounds] of Object.entries(font.bounds))
    if (
      [...char].length !== 1 ||
      !Array.isArray(bounds) ||
      bounds.length !== 4 ||
      !bounds.every(Number.isFinite) ||
      bounds[2] <= bounds[0] ||
      bounds[3] <= bounds[1]
    )
      throw new Error('가이드 글자 범위를 확인해 주세요.')
  return font
}
type State = { data: GuideFont | null; family: string; loading: boolean; error: string }
let state: State = { data: null, family: '', loading: false, error: '' }
const listeners = new Set<() => void>()
let pending: Promise<void> | undefined
let activeFace: FontFace | undefined
const subscribe = (listener: () => void) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}
function publish(next: State) {
  state = next
  listeners.forEach((listener) => listener())
}
export function loadGuideFont(force = false): Promise<void> {
  if (!import.meta.env.DEV) return Promise.resolve()
  if (pending) return pending
  if (state.data && !force) return Promise.resolve()
  publish({ ...state, loading: true, error: '' })
  pending = (async () => {
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}data/guide-font.json`, {
        cache: 'no-store',
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok) throw new Error('가이드 폰트를 불러오지 못했어요.')
      const data = parseGuideFont(await response.json())
      if (state.data?.sha256 === data.sha256) {
        publish({ ...state, loading: false })
        return
      }
      const family = `HangeulGuide-${data.sha256.slice(0, 16)}`
      const face = new FontFace(
        family,
        `url("${import.meta.env.BASE_URL}data/guide-font.woff?v=${data.sha256}")`,
      )
      await face.load()
      document.fonts.add(face)
      if (activeFace) document.fonts.delete(activeFace)
      activeFace = face
      publish({ data, family, loading: false, error: '' })
    } catch (error) {
      publish({
        data: null,
        family: '',
        loading: false,
        error: error instanceof Error ? error.message : '가이드 폰트 로딩 실패',
      })
    } finally {
      pending = undefined
    }
  })()
  return pending
}
export function useGuideFont() {
  const current = useSyncExternalStore(subscribe, () => state)
  useEffect(() => {
    if (!state.data && !state.error && !state.loading) void loadGuideFont()
  }, [])
  return current
}
