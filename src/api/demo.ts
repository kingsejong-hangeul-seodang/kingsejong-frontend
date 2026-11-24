import { ApiError, type Profile } from './backend.ts'
import { DEMO_ENGINE_VERSION, type GradeRequest, type GradeResponse } from './grading.ts'

export const DEMO_CODE = 'DGU-001'

export function demoLogin(code: string) {
  if (code !== DEMO_CODE)
    throw new ApiError(401, 'INVALID_LOGIN_CODE', '시연용 코드를 다시 확인해 주세요.')

  const me: Profile = {
    id: 1,
    locale: 'ko',
    experience: null,
    stage: null,
    lastMode: null,
    consentAgreed: false,
    onboardingCompleted: false,
    level: { exp: 120 },
  }
  return { accessToken: 'local-demo', me }
}

export function demoGrade(request: GradeRequest): GradeResponse {
  return {
    engineVersion: DEMO_ENGINE_VERSION,
    stage: request.stage,
    correct: false,
    perfect: false,
    cells: request.cells.map(({ index }) => ({
      index,
      charCorrect: false,
      mark: 'none',
      errors: [],
    })),
    alignment: [],
    words: [],
    explanations: [],
    sejong: { expression: 'default', source: 'template', text: '시연용 제출이에요.' },
  }
}
