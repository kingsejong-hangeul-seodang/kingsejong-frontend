import { disassembleCompleteCharacter, getJungseong } from 'es-hangul'

export function containsJamo(text: string, jamo: string) {
  return [...text.normalize('NFC')].some((char) => {
    if (char === jamo) return true
    const parts = disassembleCompleteCharacter(char)
    if (!parts) return false

    return parts.choseong === jamo || getJungseong(char) === jamo || parts.jongseong.includes(jamo)
  })
}
