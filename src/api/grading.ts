import type { Stage } from '@/app/session'

export type InkPoint = [number, number, number, number]
export type InkStroke = { points: InkPoint[] }
export type EngineStage = 'beginner' | 'intermediate' | 'advanced'
export type Role = 'cho' | 'jung' | 'jong'
export type Mark = 'none' | 'char' | 'spacing' | 'stroke'
export type GradeError = {
  type: 'CHAR_MISMATCH' | 'EXTRA_CHAR' | 'ORDER' | 'DIRECTION' | 'MISSING' | 'EXTRA' | 'BALANCE'
  jamo?: string | null
  role?: Role | null
  strokeIndex?: number | null
  strokeNo?: number | null
  expected?: number | null
  actual?: number | null
  metric?: 'glyph_size' | 'glyph_offset' | 'jamo_position' | 'jamo_size' | null
  value?: number | null
  range?: [number, number] | null
  exceed?: Partial<Record<'left' | 'right' | 'top' | 'bottom', number>> | null
  dx?: number | null
  dy?: number | null
  message?: string | null
}
export type ReferenceStroke = {
  order: number
  jamo: string
  role: Role
  points: [number, number][]
}
export type GradeRequest = {
  sessionId?: string
  stage: EngineStage
  target: string
  locale: 'ko' | 'en'
  canvas: { w: number; h: number }
  cells: { index: number; strokes: InkStroke[] }[]
}
export type GradeResponse = {
  sessionId?: string | null
  engineVersion: string
  stage: EngineStage
  correct: boolean
  perfect: boolean
  cells: {
    index: number
    expected?: string | null
    recognized?: string | null
    confidence?: number | null
    charCorrect: boolean
    mark: Mark
    errors: GradeError[]
    strokePass?: boolean | null
    strokeMap?:
      | {
          userIndex: number
          jamo?: string | null
          role?: Role | null
          strokeNo?: number | null
        }[]
      | null
    durationMs?: number | null
  }[]
  alignment: {
    targetIndex?: number | null
    targetChar?: string | null
    cellIndex?: number | null
    mark: Mark
    error?: string | null
  }[]
  words: { text: string; cellIndexes: number[]; correct: boolean }[]
  explanations: {
    kind: 'char' | 'spacing' | 'stroke'
    cellIndexes: number[]
    wrong?: string | null
    right: string
    jamo?: string | null
    text: string
  }[]
  sejong: {
    text: string
    subText?: string | null
    expression: 'default' | 'praise' | 'regret' | 'encourage'
    source: 'template' | 'llm'
  }
}
export const engineStages: Record<Stage, EngineStage> = {
  beginner: 'beginner',
  mid: 'intermediate',
  pro: 'advanced',
}
// These are the tasks currently displayed by the three writing screens.
export const writingTargets: Record<Stage, string> = {
  beginner: '바다',
  mid: '보고 싶었어',
  pro: '나 너 좋아하냐?',
}
export const inkCanvas = { w: 288, h: 288 }

export function makeGradeRequest(
  stage: Stage,
  target: string,
  cells: { strokes: InkStroke[] }[],
  locale: 'ko' | 'en',
): GradeRequest {
  const required = [...(stage === 'pro' ? target : target.replaceAll(' ', ''))].length
  if (
    !/^(?:[가-힣?!.,]+(?: [가-힣?!.,]+)*|[ㄱ-ㅣ])$/.test(target) ||
    target.length > 20 ||
    (/[ㄱ-ㅣ]/.test(target) && (stage !== 'beginner' || target.length !== 1)) ||
    (stage === 'beginner' && target.includes(' ')) ||
    (stage === 'mid' && target.split(' ').length > 3) ||
    cells.length < 1 ||
    cells.length > 30 ||
    (stage === 'pro' ? cells.length < required : cells.length !== required)
  )
    throw new Error('정답과 원고지 칸 수를 확인해 주세요.')
  for (const cell of cells)
    for (const stroke of cell.strokes) {
      let previousTime = -Infinity
      if (!stroke.points.length) throw new Error('빈 획은 제출할 수 없어요.')
      for (const point of stroke.points) {
        const [, , t, p] = point
        if (
          point.length !== 4 ||
          !point.every(Number.isFinite) ||
          t < 0 ||
          t < previousTime ||
          p < 0 ||
          p > 1
        )
          throw new Error('필기 좌표와 시간 정보를 확인해 주세요.')
        previousTime = t
      }
    }
  return {
    stage: engineStages[stage],
    target,
    locale,
    canvas: { ...inkCanvas },
    cells: cells.map((cell, index) => ({ index, strokes: cell.strokes })),
  }
}

export async function gradeWriting(
  request: GradeRequest,
  endpoint: string | undefined = import.meta.env?.VITE_GRADING_ENDPOINT,
): Promise<GradeResponse | null> {
  // This URL belongs to Spring Boot, never the Python engine.
  if (!endpoint) return null
  const response = await fetch(endpoint, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
    signal: AbortSignal.timeout(30000),
  }).catch((error: unknown) => {
    throw new Error(
      error instanceof Error && ['TimeoutError', 'AbortError'].includes(error.name)
        ? '채점 응답이 늦어지고 있어요. 쓴 글씨는 그대로 있으니 다시 시도해 주세요.'
        : '채점 서버에 연결하지 못했어요. 연결을 확인하고 다시 시도해 주세요.',
    )
  })
  if (response.status >= 500) {
    throw new Error('잠시 뒤 다시 제출해 주세요. 쓴 글씨는 그대로 있어요.')
  }
  const value: unknown = await response.json().catch(() => null)
  if (!response.ok) {
    const message =
      value && typeof value === 'object' && 'message' in value && typeof value.message === 'string'
        ? value.message
        : '채점 요청을 처리하지 못했어요.'
    throw new Error(message)
  }
  if (!value || typeof value !== 'object') throw new Error('채점 응답 형식을 확인해 주세요.')
  return validateGradeResponse(value, request)
}

export function validateGradeResponse(value: unknown, request: GradeRequest): GradeResponse {
  if (!value || typeof value !== 'object') throw new Error('채점 응답 형식을 확인해 주세요.')
  const result = value as GradeResponse
  const marks = ['none', 'char', 'spacing', 'stroke']
  const cellIndex = (index: unknown) =>
    Number.isInteger(index) && (index as number) >= 0 && (index as number) < request.cells.length
  const indexes = (value: unknown) => Array.isArray(value) && value.every(cellIndex)
  if (
    typeof result.engineVersion !== 'string' ||
    result.stage !== request.stage ||
    typeof result.correct !== 'boolean' ||
    typeof result.perfect !== 'boolean' ||
    !Array.isArray(result.cells) ||
    result.cells.length !== request.cells.length ||
    !result.cells.every(
      (cell, index) =>
        cell &&
        cell.index === index &&
        typeof cell.charCorrect === 'boolean' &&
        marks.includes(cell.mark) &&
        Array.isArray(cell.errors) &&
        cell.errors.every(
          (error) =>
            error &&
            [
              'CHAR_MISMATCH',
              'EXTRA_CHAR',
              'ORDER',
              'DIRECTION',
              'MISSING',
              'EXTRA',
              'BALANCE',
            ].includes(error.type) &&
            (error.message == null || typeof error.message === 'string') &&
            (error.strokeIndex == null ||
              (Number.isInteger(error.strokeIndex) &&
                error.strokeIndex >= 0 &&
                error.strokeIndex < request.cells[index]!.strokes.length)),
        ),
    ) ||
    !Array.isArray(result.alignment) ||
    !result.alignment.every(
      (item) =>
        item &&
        marks.includes(item.mark) &&
        (item.cellIndex == null || cellIndex(item.cellIndex)) &&
        (item.targetIndex == null ||
          (Number.isInteger(item.targetIndex) &&
            item.targetIndex >= 0 &&
            item.targetIndex < request.target.length)) &&
        (item.targetChar == null || typeof item.targetChar === 'string'),
    ) ||
    !Array.isArray(result.words) ||
    !result.words.every(
      (item) =>
        item &&
        typeof item.text === 'string' &&
        typeof item.correct === 'boolean' &&
        indexes(item.cellIndexes),
    ) ||
    !Array.isArray(result.explanations) ||
    !result.explanations.every(
      (item) =>
        item &&
        typeof item.text === 'string' &&
        typeof item.right === 'string' &&
        ['char', 'spacing', 'stroke'].includes(item.kind) &&
        indexes(item.cellIndexes),
    ) ||
    !result.sejong ||
    typeof result.sejong.text !== 'string' ||
    (result.sejong.subText != null && typeof result.sejong.subText !== 'string') ||
    !['default', 'praise', 'regret', 'encourage'].includes(result.sejong.expression) ||
    !['template', 'llm'].includes(result.sejong.source)
  )
    throw new Error('채점 응답 형식을 확인해 주세요.')
  return result
}
