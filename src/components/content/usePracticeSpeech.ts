import { useEffect } from 'react'

export function usePracticeSpeech(text: string, lang = 'ko-KR') {
  const available = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window

  useEffect(
    () => () => {
      if (available) window.speechSynthesis.cancel()
    },
    [available, lang, text],
  )

  return {
    available,
    play(rate = 1) {
      if (!available) return
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang
      utterance.rate = rate
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(utterance)
    },
  }
}
