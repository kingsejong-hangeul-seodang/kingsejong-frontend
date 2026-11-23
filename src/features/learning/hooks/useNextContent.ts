import { homeScreen } from '@/app/learningFlow'
import { navigate } from '@/app/router'
import { useSession } from '@/app/useSession'
import { contentById, practiceContents } from '@/data/content'
import { catalogId, catalogKey } from '@/hooks/useCatalog'

export function useNextContent() {
  const { contentId, draft, preferences, practiceTarget, selectContent, notify } = useSession()
  const current = draft?.contentId === contentId ? draft.catalogContent : undefined
  const fromCatalog = catalogId(contentId) !== null
  const mode = fromCatalog ? (current?.mode ?? preferences.mode) : contentById(contentId).mode
  const nextId = current?.nextContentId
  const stage = draft?.stage ?? preferences.stage
  const label = practiceTarget
    ? '다른 자모 고르기'
    : fromCatalog && nextId == null
      ? '홈으로'
      : '다음 글 쓰기'
  function goNext() {
    notify('')
    if (practiceTarget) {
      navigate('dogam')
      return
    }
    if (fromCatalog) {
      if (nextId == null) {
        navigate(homeScreen(mode))
        return
      }
      selectContent(catalogKey(nextId))
    } else {
      const choices = practiceContents(mode, stage)
      selectContent(
        choices[(choices.findIndex((item) => item.id === contentId) + 1) % choices.length]!.id,
      )
    }
    navigate(`write-${stage}`)
  }
  return { goNext, label, mode }
}
