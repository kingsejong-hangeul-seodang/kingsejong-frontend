import {
  SessionExpiredError,
  inkCanvas,
  validateGradeResponse,
  writingHistoryApi,
  type WritingSummary,
} from '@/api/api'
import { useUiText } from '@/app/useUiText'
import { useRef, useState } from 'react'
import { navigate } from '@/app/router'
import { useSession } from '@/app/useSession'
import { catalogKey, screenModes } from './useCatalog'

export function useOpenWriting() {
  const t = useUiText()
  const { accessToken, notify, selectContent, saveDraft, setResultOrigin } = useSession()
  const [opening, setOpening] = useState<number | null>(null)
  const pending = useRef(false)

  async function open(
    id: number,
    origin: 'records' | 'jamo-digeut' | 'jamo-a',
    summary?: WritingSummary,
  ) {
    if (!writingHistoryApi || !accessToken || pending.current) return
    pending.current = true
    setOpening(id)
    notify('')
    const route = window.location.hash
    try {
      const record = await writingHistoryApi.writing(accessToken, id)
      if (window.location.hash !== route) return
      const stage =
        record.stage === 'intermediate' ? 'mid' : record.stage === 'advanced' ? 'pro' : 'beginner'
      const { w, h } = record.canvas ?? inkCanvas
      if (![w, h].every((size) => Number.isFinite(size) && size > 0))
        throw new Error(t('기록의 원고지 크기를 확인해 주세요.'))
      const grade = validateGradeResponse(record.grade, {
        stage: record.stage,
        target: record.target,
        cells: record.cells,
      })
      const contentId = catalogKey(record.contentId)
      selectContent(contentId)
      saveDraft({
        source: origin,
        stage,
        target: record.target,
        contentId,
        grade,
        catalogContent: {
          mode: summary?.mode ? screenModes[summary.mode] : 'basic',
          source: summary?.source ?? '',
          nextContentId: null,
        },
        cells: (record.cells ?? []).map((cell) => ({
          image: '',
          written: cell.strokes.length > 0,
          strokes: cell.strokes.map((stroke) => ({
            points: stroke.points.map(([x, y, t, p]) => [
              (x * inkCanvas.w) / w,
              (y * inkCanvas.h) / h,
              t,
              p,
            ]),
          })),
        })),
      })
      setResultOrigin(origin)
      navigate(`result-${stage}`)
    } catch (error) {
      if (window.location.hash !== route) return
      if (error instanceof SessionExpiredError) return
      notify(error instanceof Error ? error.message : t('쓰기 결과를 불러오지 못했어요.'))
    } finally {
      pending.current = false
      setOpening(null)
    }
  }
  return { open, opening }
}
