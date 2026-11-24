import { requestBackend, type ApiMode } from './backend.ts'
import type {
  EngineStage,
  GradeRequest,
  GradeResponse,
  InkStroke,
  ReferenceStroke,
} from './grading'

export type Mastery = 'none' | 'familiar' | 'practice'
export type JamoItem = { jamo: string; name: string; mastery: Mastery }
export type JamoList = { consonants: JamoItem[]; vowels: JamoItem[] }
export type JamoDetail = JamoItem & {
  type: 'consonant' | 'vowel'
  strokeCount: number
  steps: string[]
  commonMistake: string | null
  examples: string[]
  practiceContentId: number | null
  recentWritings: { writingId: number; target: string; message: string | null }[]
}
export type WritingSummary = {
  writingId: number
  contentId: number
  title: string
  source: string | null
  mode: ApiMode | null
  stage: EngineStage
  target: string
  correct: boolean
  perfect: boolean
  engineVersion?: string | null
  createdAt: string
}
export type WritingPage = { items: WritingSummary[]; nextCursor: string | null }
export type WritingDetail = Pick<
  WritingSummary,
  'writingId' | 'contentId' | 'stage' | 'target' | 'createdAt'
> & {
  grade: GradeResponse
} & (
    | { canvas: { w: number; h: number }; cells: { index: number; strokes: InkStroke[] }[] }
    | { canvas: null; cells: null }
  )
export type StrokeReference = {
  font: string
  items: { char: string; strokes: ReferenceStroke[] }[]
}
export type TasteItem = {
  id: number
  mode: 'kpop' | 'kdrama'
  name: string
  imageUrl: string | null
  selected: boolean
}
export type LevelTestStep = {
  step: number
  title: string
  stage: EngineStage
  target: string
  cellCount: number
  wordGroups?: number[] | null
}
export type LevelAssessment = {
  step: number
  passed: boolean
  finished: boolean
  recommendedStage?: EngineStage | null
  steps: { step: number; title: string; passed: boolean }[]
}

function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === 'object'
}
function id(value: unknown) {
  return typeof value === 'number' && Number.isSafeInteger(value) && value > 0
}
function stage(value: unknown) {
  return ['beginner', 'intermediate', 'advanced'].some((entry) => entry === value)
}
function inkCell(cell: unknown, index: number) {
  if (!isObject(cell) || cell.index !== index || !Array.isArray(cell.strokes)) return false
  return cell.strokes.every((stroke: unknown) => {
    if (!isObject(stroke) || !Array.isArray(stroke.points) || !stroke.points.length) return false
    return stroke.points.every(
      (point: unknown) =>
        Array.isArray(point) && point.length === 4 && point.every(Number.isFinite),
    )
  })
}
function writingRow(value: unknown) {
  return (
    isObject(value) &&
    id(value.writingId) &&
    id(value.contentId) &&
    typeof value.title === 'string' &&
    (value.source === null || typeof value.source === 'string') &&
    (value.mode === null || ['kpop', 'kdrama', 'basic'].some((mode) => mode === value.mode)) &&
    stage(value.stage) &&
    typeof value.target === 'string' &&
    typeof value.correct === 'boolean' &&
    typeof value.perfect === 'boolean' &&
    (value.engineVersion == null || typeof value.engineVersion === 'string') &&
    typeof value.createdAt === 'string' &&
    Number.isFinite(Date.parse(value.createdAt))
  )
}

function jamoItem(value: unknown): value is JamoItem {
  return (
    isObject(value) &&
    typeof value.jamo === 'string' &&
    typeof value.name === 'string' &&
    ['none', 'practice', 'familiar'].some((mastery) => mastery === value.mastery)
  )
}

export function createStudyApi(baseUrl: string) {
  return {
    async levelTest(token: string): Promise<LevelTestStep[]> {
      const value = await requestBackend(baseUrl, '/level-test', { token })
      if (
        !isObject(value) ||
        !Array.isArray(value.steps) ||
        value.steps.length !== 3 ||
        !value.steps.every(
          (item: unknown, index: number) =>
            isObject(item) &&
            item.step === index + 1 &&
            typeof item.title === 'string' &&
            stage(item.stage) &&
            typeof item.target === 'string' &&
            id(item.cellCount) &&
            Number(item.cellCount) <= 30 &&
            (item.wordGroups == null ||
              (Array.isArray(item.wordGroups) && item.wordGroups.every(id))),
        )
      )
        throw new Error('레벨 테스트 문항 형식을 확인해 주세요.')
      return value.steps
    },
    async submitLevelStep(
      token: string,
      step: number,
      request: Pick<GradeRequest, 'canvas' | 'cells'>,
    ): Promise<LevelAssessment> {
      const value = await requestBackend(baseUrl, `/level-test/steps/${step}`, {
        method: 'POST',
        token,
        body: { canvas: request.canvas, cells: request.cells },
      })
      if (
        !isObject(value) ||
        value.step !== step ||
        typeof value.passed !== 'boolean' ||
        typeof value.finished !== 'boolean' ||
        (value.finished && !stage(value.recommendedStage)) ||
        (!value.finished && (step === 3 || !value.passed)) ||
        !Array.isArray(value.steps) ||
        !value.steps.every(
          (item: unknown) =>
            isObject(item) &&
            id(item.step) &&
            typeof item.title === 'string' &&
            typeof item.passed === 'boolean',
        )
      )
        throw new Error('레벨 테스트 결과 형식을 확인해 주세요.')
      return value as LevelAssessment
    },
    async tastes(token: string, mode: TasteItem['mode']): Promise<TasteItem[]> {
      const value = await requestBackend(baseUrl, `/tastes?mode=${mode}`, { token })
      if (
        !isObject(value) ||
        !Array.isArray(value.items) ||
        !value.items.every(
          (item: unknown) =>
            isObject(item) &&
            id(item.id) &&
            item.mode === mode &&
            typeof item.name === 'string' &&
            (item.imageUrl === null || typeof item.imageUrl === 'string') &&
            typeof item.selected === 'boolean',
        )
      )
        throw new Error('취향 목록 형식을 확인해 주세요.')
      return value.items
    },
    async saveTastes(token: string, mode: TasteItem['mode'], tasteIds: number[]) {
      await requestBackend(baseUrl, '/me/tastes', {
        method: 'PUT',
        token,
        body: { mode, tasteIds },
      })
    },
    async strokes(token: string, chars: string): Promise<StrokeReference> {
      const search = new URLSearchParams({ chars })
      const value = await requestBackend(baseUrl, `/reference/strokes?${search}`, {
        token,
        cache: 'no-cache',
      })
      if (
        !isObject(value) ||
        typeof value.font !== 'string' ||
        !Array.isArray(value.items) ||
        !value.items.every(
          (item: unknown) =>
            isObject(item) &&
            typeof item.char === 'string' &&
            Array.isArray(item.strokes) &&
            item.strokes.every(
              (stroke: unknown) =>
                isObject(stroke) &&
                Number.isSafeInteger(stroke.order) &&
                Array.isArray(stroke.points) &&
                stroke.points.length > 0 &&
                stroke.points.every(
                  (point: unknown) =>
                    Array.isArray(point) && point.length === 2 && point.every(Number.isFinite),
                ),
            ),
        )
      )
        throw new Error('정답 획 응답 형식을 확인해 주세요.')
      return value as StrokeReference
    },
    async jamoList(token: string): Promise<JamoList> {
      const value = await requestBackend(baseUrl, '/jamo', { token })
      if (
        !isObject(value) ||
        !Array.isArray(value.consonants) ||
        !value.consonants.every(jamoItem) ||
        !Array.isArray(value.vowels) ||
        !value.vowels.every(jamoItem)
      )
        throw new Error('자모 목록 형식을 확인해 주세요.')
      return { consonants: value.consonants, vowels: value.vowels }
    },
    async jamoDetail(token: string, jamo: string): Promise<JamoDetail> {
      const value = await requestBackend(baseUrl, `/jamo/${encodeURIComponent(jamo)}`, { token })
      if (
        !jamoItem(value) ||
        value.jamo !== jamo ||
        !('steps' in value) ||
        !Array.isArray(value.steps) ||
        !value.steps.every((step) => typeof step === 'string') ||
        !('examples' in value) ||
        !Array.isArray(value.examples) ||
        !value.examples.every((example) => typeof example === 'string') ||
        !('recentWritings' in value) ||
        !Array.isArray(value.recentWritings) ||
        !value.recentWritings.every(
          (record: unknown) =>
            isObject(record) &&
            id(record.writingId) &&
            typeof record.target === 'string' &&
            (record.message === null || typeof record.message === 'string'),
        ) ||
        !('practiceContentId' in value) ||
        (value.practiceContentId !== null && !id(value.practiceContentId))
      )
        throw new Error('자모 상세 형식을 확인해 주세요.')
      return value as JamoDetail
    },
    async writings(token: string, cursor: string): Promise<WritingPage> {
      const search = new URLSearchParams({ cursor, size: '20' })
      const value = await requestBackend(baseUrl, `/writings?${search}`, { token })
      if (
        !isObject(value) ||
        !Array.isArray(value.items) ||
        !value.items.every(writingRow) ||
        (value.nextCursor !== null && typeof value.nextCursor !== 'string')
      )
        throw new Error('쓰기 기록 목록 형식을 확인해 주세요.')
      return value as WritingPage
    },
    async writing(token: string, writingId: number): Promise<WritingDetail> {
      const value = await requestBackend(baseUrl, `/writings/${writingId}`, { token })
      if (
        !isObject(value) ||
        value.writingId !== writingId ||
        !id(value.contentId) ||
        !stage(value.stage) ||
        typeof value.target !== 'string' ||
        !(
          (value.cells === null && value.canvas === null) ||
          (Array.isArray(value.cells) && value.cells.every(inkCell) && isObject(value.canvas))
        )
      )
        throw new Error('쓰기 기록 상세 형식을 확인해 주세요.')
      return value as WritingDetail
    },
  }
}
