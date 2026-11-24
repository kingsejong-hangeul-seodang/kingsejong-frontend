import { disassembleCompleteCharacter, getJungseong } from 'es-hangul'

export function containsJamo(text: string, jamo: string) {
  return [...text.normalize('NFC')].some((char) => jamoParts(char).includes(jamo))
}

export function jamoParts(char: string): string[] {
  if (/^[ㄱ-ㅣ]$/.test(char)) return [char]
  const parts = disassembleCompleteCharacter(char)
  return parts ? [parts.choseong, getJungseong(char) ?? '', ...parts.jongseong].filter(Boolean) : []
}
