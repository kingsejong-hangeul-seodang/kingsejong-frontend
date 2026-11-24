import { useCallback } from 'react'
import { useSession } from './useSession'
import { translateUi, type UiTextValue } from './uiText'

export function useUiText() {
  const { language } = useSession().preferences
  return useCallback(
    (message: string, ...values: UiTextValue[]) => translateUi(language, message, ...values),
    [language],
  )
}
