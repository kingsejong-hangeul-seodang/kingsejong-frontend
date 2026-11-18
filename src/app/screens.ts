import { lazy, type ComponentType } from 'react'

const modules = import.meta.glob<{ default: ComponentType }>('../features/*/screens/*.tsx')
function page(group: string, name: string) {
  return lazy(() => {
    const load = modules[`../features/${group}/screens/${name}.tsx`]
    if (!load) return Promise.reject(new Error(`Screen not found: ${name}`))
    return load()
  })
}

export const screens = {
  lang: { title: '언어 선택', component: page('onboarding', 'lang') },
  login: { title: '로그인 코드', component: page('onboarding', 'login') },
  experience: { title: '한글 경험', component: page('onboarding', 'experience') },
  'stage-select': { title: '난이도 고르기', component: page('onboarding', 'stage-select') },
  'leveltest-1': { title: '레벨 테스트 1 · 가나다', component: page('onboarding', 'leveltest-1') },
  'leveltest-2': { title: '레벨 테스트 2 · 단어', component: page('onboarding', 'leveltest-2') },
  'leveltest-3': {
    title: '레벨 테스트 3 · 짧은 문장',
    component: page('onboarding', 'leveltest-3'),
  },
  'leveltest-result': {
    title: '레벨 테스트 결과',
    component: page('onboarding', 'leveltest-result'),
  },
  'mode-select': { title: '모드 고르기', component: page('onboarding', 'mode-select') },
  taste: { title: '좋아하는 가수', component: page('onboarding', 'taste') },
  home: { title: '홈 · K팝', component: page('home', 'home') },
  'home-drama': { title: '홈 · K드라마', component: page('home', 'home-drama') },
  'home-basic': { title: '홈 · 기본 연습', component: page('home', 'home-basic') },
  levelup: { title: '레벨 업', component: page('home', 'levelup') },
  'home-lv2': { title: '홈 · 레벨 업 뒤', component: page('home', 'home-lv2') },
  mypage: { title: '마이페이지', component: page('mypage', 'mypage') },
  clip: { title: '클립 보기', component: page('learning', 'clip') },
  'result-done': { title: '결과 · 다 맞음', component: page('learning', 'result-done') },
  'write-beginner': { title: '쓰기 · 초보', component: page('learning', 'write-beginner') },
  'result-beginner': { title: '결과 · 초보', component: page('learning', 'result-beginner') },
  'compare-beginner': {
    title: '정답 비교 · 초보',
    component: page('learning', 'compare-beginner'),
  },
  stroke: { title: '획순 · 글자 하나', component: page('learning', 'stroke') },
  'write-mid': { title: '쓰기 · 중수', component: page('learning', 'write-mid') },
  'result-mid': { title: '결과 · 중수', component: page('learning', 'result-mid') },
  'compare-mid': { title: '정답 비교 · 중수', component: page('learning', 'compare-mid') },
  'write-pro': { title: '쓰기 · 고수', component: page('learning', 'write-pro') },
  'result-pro': { title: '결과 · 고수', component: page('learning', 'result-pro') },
  'compare-pro': { title: '정답 비교 · 고수', component: page('learning', 'compare-pro') },
  dogam: { title: '자모 도감', component: page('jamo', 'dogam') },
  records: { title: '쓰기 기록', component: page('records', 'records') },
  settings: { title: '설정', component: page('settings', 'settings') },
  'jamo-digeut': { title: '자모 상세 · ㄷ (연습)', component: page('jamo', 'jamo-digeut') },
  'jamo-a': { title: '자모 상세 · ㅏ (익숙)', component: page('jamo', 'jamo-a') },
} as const

export type ScreenName = keyof typeof screens
