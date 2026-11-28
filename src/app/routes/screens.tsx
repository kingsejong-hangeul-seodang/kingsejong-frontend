import { lazy } from 'react'
import { skipCodeLogin } from '@/api/api'

const LanguageScreen = lazy(() => import('../../features/onboarding/LanguageScreen'))

// Load the real screen directly. Route-specific choices stay here instead of separate files.
const HomeScreen = lazy(() =>
  import('../../features/home/HomeScreen').then((module) => ({
    default: module.HomeScreen,
  })),
)
const WritingScreen = lazy(() =>
  import('../../features/learning/WritingScreen').then((module) => ({
    default: module.WritingScreen,
  })),
)
const WritingResultScreen = lazy(() =>
  import('../../features/learning/WritingResultScreen').then((module) => ({
    default: module.WritingResultScreen,
  })),
)
const WritingComparisonScreen = lazy(() =>
  import('../../features/learning/WritingComparisonScreen').then((module) => ({
    default: module.WritingComparisonScreen,
  })),
)
const LevelTestScreen = lazy(() =>
  import('../../features/onboarding/LevelTestScreen').then((module) => ({
    default: module.LevelTestScreen,
  })),
)
const LevelTestResultScreen = lazy(() =>
  import('../../features/onboarding/LevelTestResultScreen').then((module) => ({
    default: module.LevelTestResultScreen,
  })),
)
const JamoDetailScreen = lazy(() =>
  import('../../features/jamo/JamoDetailScreen').then((module) => ({
    default: module.JamoDetailScreen,
  })),
)

export const screens = {
  lang: {
    title: '언어 선택',
    component: LanguageScreen,
  },
  login: {
    title: skipCodeLogin ? '언어 선택' : '로그인 코드',
    component: skipCodeLogin
      ? LanguageScreen
      : lazy(() => import('../../features/onboarding/LoginScreen')),
  },
  experience: {
    title: '한글 경험',
    component: lazy(() => import('../../features/onboarding/ExperienceScreen')),
  },
  'stage-select': {
    title: '난이도 고르기',
    component: lazy(() => import('../../features/onboarding/StageSelectScreen')),
  },
  'leveltest-1': { title: '레벨 테스트 1 · 가나다', component: () => <LevelTestScreen step={0} /> },
  'leveltest-2': { title: '레벨 테스트 2 · 단어', component: () => <LevelTestScreen step={1} /> },
  'leveltest-3': {
    title: '레벨 테스트 3 · 짧은 문장',
    component: () => <LevelTestScreen step={2} />,
  },
  'leveltest-result': { title: '레벨 테스트 결과', component: LevelTestResultScreen },
  'mode-select': {
    title: '모드 고르기',
    component: lazy(() => import('../../features/onboarding/ModeSelectScreen')),
  },
  taste: {
    title: '좋아하는 가수',
    component: lazy(() => import('../../features/onboarding/SingerSelectScreen')),
  },
  home: { title: '홈 · K팝', component: () => <HomeScreen mode="pop" /> },
  'home-drama': { title: '홈 · K드라마', component: () => <HomeScreen mode="drama" /> },
  'home-basic': { title: '홈 · 기본 연습', component: () => <HomeScreen mode="basic" /> },
  levelup: {
    title: '레벨 업',
    component: lazy(() => import('../../features/home/LevelUpScreen')),
  },
  'home-lv2': { title: '홈 · 레벨 업 뒤', component: () => <HomeScreen mode="pop" /> },
  mypage: {
    title: '마이페이지',
    component: lazy(() => import('../../features/mypage/MyPageScreen')),
  },
  clip: {
    title: '클립 보기',
    component: lazy(() => import('../../features/learning/ClipScreen')),
  },
  'result-done': { title: '결과 · 다 맞음', component: () => <WritingResultScreen /> },
  'write-beginner': { title: '쓰기 · 초보', component: () => <WritingScreen stage="beginner" /> },
  'result-beginner': {
    title: '결과 · 초보',
    component: () => <WritingResultScreen stage="beginner" />,
  },
  'compare-beginner': {
    title: '정답 비교 · 초보',
    component: () => <WritingComparisonScreen stage="beginner" />,
  },
  stroke: {
    title: '획순 · 글자 하나',
    component: lazy(() => import('../../features/learning/StrokeScreen')),
  },
  shape: {
    title: '모양 · 글자 하나',
    component: lazy(() => import('../../features/learning/ShapeScreen')),
  },
  'stroke-preview': {
    title: '획순 미리보기',
    component: lazy(() => import('../../features/learning/StrokePreviewScreen')),
  },
  'write-mid': { title: '쓰기 · 중수', component: () => <WritingScreen stage="mid" /> },
  'result-mid': { title: '결과 · 중수', component: () => <WritingResultScreen stage="mid" /> },
  'compare-mid': {
    title: '정답 비교 · 중수',
    component: () => <WritingComparisonScreen stage="mid" />,
  },
  'write-pro': { title: '쓰기 · 고수', component: () => <WritingScreen stage="pro" /> },
  'result-pro': { title: '결과 · 고수', component: () => <WritingResultScreen stage="pro" /> },
  'compare-pro': {
    title: '정답 비교 · 고수',
    component: () => <WritingComparisonScreen stage="pro" />,
  },
  dogam: {
    title: '자모 도감',
    component: lazy(() => import('../../features/jamo/JamoCollectionScreen')),
  },
  records: {
    title: '쓰기 기록',
    component: lazy(() => import('../../features/records/RecordsScreen')),
  },
  settings: {
    title: '설정',
    component: lazy(() => import('../../features/settings/SettingsScreen')),
  },
  'jamo-digeut': { title: '자모 상세 · ㄷ (연습)', component: () => <JamoDetailScreen /> },
  'jamo-a': { title: '자모 상세 · ㅏ (익숙)', component: () => <JamoDetailScreen /> },
} as const

export type ScreenName = keyof typeof screens
