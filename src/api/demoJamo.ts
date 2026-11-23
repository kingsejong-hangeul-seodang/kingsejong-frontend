import type { JamoDetail, JamoList } from './study'

const consonants = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'
const vowels = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ'
const names = [
  '기역 쌍기역 니은 디귿 쌍디귿 리을 미음 비읍 쌍비읍 시옷 쌍시옷 이응 지읒 쌍지읒 치읓 키읔 티읕 피읖 히읗'.split(
    ' ',
  ),
  '아 애 야 얘 어 에 여 예 오 와 왜 외 요 우 워 웨 위 유 으 의 이'.split(' '),
]
export const demoJamoList: JamoList = {
  consonants: [...consonants].map((jamo, index) => ({
    jamo,
    name: names[0]![index]!,
    mastery: jamo === 'ㄷ' ? 'practice' : 'none',
  })),
  vowels: [...vowels].map((jamo, index) => ({
    jamo,
    name: names[1]![index]!,
    mastery: jamo === 'ㅏ' ? 'familiar' : 'none',
  })),
}

export function demoJamoDetail(jamo: string): JamoDetail {
  const item = [...demoJamoList.consonants, ...demoJamoList.vowels].find(
    (entry) => entry.jamo === jamo,
  )
  const steps =
    jamo === 'ㄷ'
      ? ['위 가로획을 왼쪽에서 오른쪽으로', '세로로 내려와 아래 가로획까지 이어서']
      : jamo === 'ㅏ'
        ? ['세로획을 위에서 아래로', '가운데에서 오른쪽으로 짧은 가로획']
        : []
  return {
    ...(item ?? { jamo, name: jamo, mastery: 'none' }),
    type: vowels.includes(jamo) ? 'vowel' : 'consonant',
    strokeCount: steps.length,
    steps,
    commonMistake: jamo === 'ㄷ' ? '위 가로획을 먼저 써요.' : null,
    examples: jamo === 'ㄷ' ? ['다', '바다'] : jamo === 'ㅏ' ? ['아', '바다', '좋아'] : [],
    practiceContentId: null,
    recentWritings: [],
  }
}
