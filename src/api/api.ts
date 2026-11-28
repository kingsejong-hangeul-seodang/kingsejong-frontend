import type { Mode, Stage } from '../app/session'
import { contents, practiceCellCount, practiceContents, targetGroups } from '../data/content.ts'

const engineErrors = {
  ENGINE_ERROR: '교정 중 오류가 발생했어요.',
  ENGINE_UNAVAILABLE: '교정 엔진에 연결할 수 없어요.',
  ENGINE_TIMEOUT: '교정 엔진의 응답이 늦어지고 있어요.',
} as const

export class ApiError extends Error {
  readonly status: number
  readonly code: string
  constructor(status: number, code: string, message: string) {
    super(message)
    this.status = status
    this.code = code
  }
}

type SessionBinding = {
  currentToken: () => string | null
  expire: (token: string, submittingWriting: boolean) => void
}

let session: SessionBinding | undefined
export function bindApiSession(binding: SessionBinding) {
  session = binding
  return () => {
    if (session === binding) session = undefined
  }
}

export class SessionExpiredError extends ApiError {}

function object(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {}
}

export async function requestBackend(
  baseUrl: string,
  path: string,
  options: {
    method?: 'GET' | 'POST' | 'PATCH' | 'PUT'
    token?: string
    body?: unknown
    cache?: RequestCache
  } = {},
): Promise<unknown> {
  const { method = 'GET', token, body, cache } = options
  const sessionToken = token && token === session?.currentToken() ? token : undefined
  const response = await fetch(`${baseUrl.replace(/\/+$/, '')}/api/v1${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    ...(cache ? { cache } : {}),
    signal: AbortSignal.timeout(30000),
  })
  if (response.status === 204) return undefined
  const value: unknown = await response.json().catch(() => undefined)
  if (response.status >= 500) {
    const code = object(value).code
    for (const [engineCode, message] of Object.entries(engineErrors)) {
      if (code === engineCode) throw new ApiError(response.status, engineCode, message)
    }
    throw new ApiError(response.status, 'SERVER_ERROR', '잠시 뒤 다시 시도해 주세요.')
  }
  if (!response.ok) {
    const error = object(value)
    const details = Array.isArray(error.details)
      ? error.details.flatMap((entry: unknown) => {
          const { field, message } = object(entry)
          return typeof message === 'string'
            ? [typeof field === 'string' ? `${field}: ${message}` : message]
            : []
        })
      : []
    const expired = response.status === 401 && sessionToken
    if (expired && session?.currentToken() === expired)
      session.expire(expired, method === 'POST' && path === '/writings')
    const ResponseError = expired ? SessionExpiredError : ApiError
    throw new ResponseError(
      response.status,
      typeof error.code === 'string' ? error.code : '',
      [
        typeof error.message === 'string' ? error.message : '요청을 처리하지 못했어요.',
        ...details,
      ].join(' '),
    )
  }
  if (value === undefined) throw new Error('서버 응답 형식을 확인해 주세요.')
  return value
}

export const DEMO_ENGINE_VERSION = 'local-demo-stub'

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

export function validateGradeResponse(
  value: unknown,
  request: Pick<GradeRequest, 'stage' | 'target'> & { cells: GradeRequest['cells'] | null },
): GradeResponse {
  if (!value || typeof value !== 'object') throw new Error('채점 응답 형식을 확인해 주세요.')
  const result = value as GradeResponse
  const cellCount = request.cells?.length ?? (Array.isArray(result.cells) ? result.cells.length : 0)
  const marks = ['none', 'char', 'spacing', 'stroke']
  const cellIndex = (index: unknown) =>
    Number.isInteger(index) && (index as number) >= 0 && (index as number) < cellCount
  const indexes = (value: unknown) => Array.isArray(value) && value.every(cellIndex)
  if (
    typeof result.engineVersion !== 'string' ||
    result.stage !== request.stage ||
    typeof result.correct !== 'boolean' ||
    typeof result.perfect !== 'boolean' ||
    !Array.isArray(result.cells) ||
    result.cells.length !== cellCount ||
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
                (!request.cells || error.strokeIndex < request.cells[index]!.strokes.length))),
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

export const apiModes = { pop: 'kpop', drama: 'kdrama', basic: 'basic' } as const
export type ApiMode = (typeof apiModes)[Mode]
export const writeModes = {
  beginner: 'trace',
  intermediate: 'copy',
  advanced: 'dictation',
} as const satisfies Record<EngineStage, string>
type WriteMode = (typeof writeModes)[EngineStage]
const contentKinds = ['clip', 'jamo', 'word', 'sentence'] as const
type ContentKind = (typeof contentKinds)[number]
type Locale = 'ko' | 'en'

export type Profile = {
  id: number
  name?: string
  loginCode?: string
  locale: Locale
  experience: 'first' | 'studied' | null
  stage: EngineStage | null
  lastMode: ApiMode | null
  consentAgreed: boolean
  onboardingCompleted: boolean
  level: { exp: number; no?: number; name?: string; nextLevelExp?: number | null }
  levels?: { no: number; name: string; minExp: number }[]
  today?: { done: number; goal: number }
  streakDays?: number
}

type LoginResponse = { accessToken: string; me: Profile }
type PreferencesPatch = Partial<
  Pick<
    Profile,
    'locale' | 'experience' | 'stage' | 'lastMode' | 'consentAgreed' | 'onboardingCompleted'
  >
>
export type ContentItem = {
  id: number
  title: string
  mode: ApiMode
  kind: ContentKind
  writeMode: WriteMode
  source: string | null
  thumbnailUrl: string | null
  durationSec: number | null
  target: string | null
  cellCount: number | null
  wordCount: number | null
  meaning?: string | null
  tasteMatched: boolean
  completed: boolean
  perfect: boolean
}
export type ContentDetail = {
  id: number
  mode: ApiMode
  kind: ContentKind
  title: string
  source: string | null
  thumbnailUrl?: string | null
  clip: ContentVideo | null
  lines: SubtitleLine[]
  situation: string | null
  task: {
    target: string
    stage: EngineStage
    writeMode: WriteMode
    meaning: string | null
    cellCount: number
    wordGroups: number[] | null
    speech: { text: string; lang: string } | null
  }
  nextContentId: number | null
}
export type ContentVideo = {
  youtubeVideoId?: string | null
  startSec: number
  endSec: number
  embeddable: boolean
}
export type SubtitleLine = {
  text: string
  startSec: number
  endSec?: number | null
  translation?: string | null
}
export type WritingReward = {
  expGained: number
  items: { reason: 'correct' | 'perfect'; exp: number }[]
  level: {
    no: number
    name: string
    exp: number
    levelStartExp: number
    nextLevelExp: number | null
  }
  leveledUp: boolean
  previousLevelNo: number | null
  streakDays: number
  today: { done: number; goal: number }
  stageUpSuggested: boolean
}

export type EngineHealth = { status: 'ok' | 'down'; engineVersion: string | null }

function positiveInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value > 0
}

function nonnegativeInteger(value: unknown): value is number {
  return value === 0 || positiveInteger(value)
}

function isContentItem(value: unknown, stage: EngineStage): value is ContentItem {
  const item = object(value)
  return (
    positiveInteger(item.id) &&
    contentKinds.some((kind) => kind === item.kind) &&
    item.writeMode === writeModes[stage] &&
    typeof item.title === 'string' &&
    (item.source === null || typeof item.source === 'string') &&
    (stage === 'advanced'
      ? item.target === null && item.cellCount === null && item.wordCount === null
      : typeof item.target === 'string' &&
        positiveInteger(item.cellCount) &&
        positiveInteger(item.wordCount)) &&
    (item.meaning == null || typeof item.meaning === 'string') &&
    (item.thumbnailUrl === null || typeof item.thumbnailUrl === 'string') &&
    (item.durationSec === null ||
      (typeof item.durationSec === 'number' && item.durationSec >= 0)) &&
    typeof item.tasteMatched === 'boolean' &&
    typeof item.completed === 'boolean' &&
    typeof item.perfect === 'boolean'
  )
}

function contentDetail(value: unknown, id: number, stage: EngineStage): ContentDetail {
  const detail = object(value)
  const task = object(detail.task)
  const speech = object(task.speech)
  const clip = object(detail.clip)
  const target = typeof task.target === 'string' ? task.target.normalize('NFC') : ''
  const letters = [...(stage === 'advanced' ? target : target.replaceAll(' ', ''))].length
  if (
    detail.id !== id ||
    !['kpop', 'kdrama', 'basic'].some((mode) => mode === detail.mode) ||
    !contentKinds.some((kind) => kind === detail.kind) ||
    typeof detail.title !== 'string' ||
    (detail.source !== null && typeof detail.source !== 'string') ||
    (detail.thumbnailUrl != null && typeof detail.thumbnailUrl !== 'string') ||
    task.stage !== stage ||
    task.writeMode !== writeModes[stage] ||
    (task.speech !== null &&
      (typeof speech.text !== 'string' ||
        !speech.text.trim() ||
        typeof speech.lang !== 'string' ||
        !speech.lang.trim())) ||
    !target ||
    !positiveInteger(task.cellCount) ||
    task.cellCount > 30 ||
    (stage === 'advanced' ? task.cellCount < letters : task.cellCount !== letters) ||
    (task.meaning != null && typeof task.meaning !== 'string') ||
    (task.wordGroups != null &&
      (!Array.isArray(task.wordGroups) || !task.wordGroups.every(positiveInteger))) ||
    (detail.nextContentId !== null && !positiveInteger(detail.nextContentId)) ||
    (detail.clip != null &&
      (typeof clip.startSec !== 'number' ||
        typeof clip.endSec !== 'number' ||
        !Number.isFinite(clip.startSec) ||
        !Number.isFinite(clip.endSec) ||
        clip.startSec < 0 ||
        clip.endSec <= clip.startSec ||
        (clip.youtubeVideoId != null && typeof clip.youtubeVideoId !== 'string') ||
        typeof clip.embeddable !== 'boolean')) ||
    (detail.situation != null && typeof detail.situation !== 'string') ||
    (detail.lines != null &&
      (!Array.isArray(detail.lines) ||
        !detail.lines.every((line: unknown) => {
          const item = object(line)
          return (
            typeof item.text === 'string' &&
            (item.translation == null || typeof item.translation === 'string') &&
            typeof item.startSec === 'number' &&
            Number.isFinite(item.startSec) &&
            (item.endSec == null ||
              (typeof item.endSec === 'number' && item.endSec > item.startSec))
          )
        })))
  ) {
    throw new Error('콘텐츠 상세 형식을 확인해 주세요.')
  }
  return {
    ...detail,
    clip: detail.clip ?? null,
    situation: detail.situation ?? null,
    lines: detail.lines ?? [],
    task: { ...task, target, meaning: task.meaning ?? null, wordGroups: task.wordGroups ?? null },
  } as ContentDetail
}

function profile(value: unknown): Profile {
  const me = object(value)
  if (
    !Number.isSafeInteger(me.id) ||
    (me.locale !== 'ko' && me.locale !== 'en') ||
    ![null, 'first', 'studied'].includes(me.experience as string | null) ||
    ![null, 'beginner', 'intermediate', 'advanced'].includes(me.stage as string | null) ||
    ![null, 'kpop', 'kdrama', 'basic'].includes(me.lastMode as string | null) ||
    typeof me.consentAgreed !== 'boolean' ||
    typeof me.onboardingCompleted !== 'boolean' ||
    !Number.isSafeInteger(object(me.level).exp)
  ) {
    throw new Error('프로필 응답 형식을 확인해 주세요.')
  }
  return me as unknown as Profile
}

export function writingBody(contentId: number, request: GradeRequest) {
  return {
    contentId,
    stage: request.stage,
    canvas: request.canvas,
    cells: request.cells,
  }
}

function writingReward(value: unknown): WritingReward | undefined {
  const reward = object(value)
  const level = object(reward.level)
  const today = object(reward.today)
  if (
    !nonnegativeInteger(reward.expGained) ||
    !Array.isArray(reward.items) ||
    !reward.items.every((entry: unknown) => {
      const item = object(entry)
      return (
        positiveInteger(item.exp) && ['correct', 'perfect'].some((reason) => reason === item.reason)
      )
    }) ||
    !positiveInteger(level.no) ||
    typeof level.name !== 'string' ||
    !Number.isSafeInteger(level.exp) ||
    !Number.isSafeInteger(level.levelStartExp) ||
    (level.nextLevelExp !== null && !positiveInteger(level.nextLevelExp)) ||
    typeof reward.leveledUp !== 'boolean' ||
    (reward.previousLevelNo != null && !positiveInteger(reward.previousLevelNo)) ||
    !nonnegativeInteger(reward.streakDays) ||
    !nonnegativeInteger(today.done) ||
    !positiveInteger(today.goal) ||
    typeof reward.stageUpSuggested !== 'boolean'
  ) {
    return undefined
  }
  return { ...reward, previousLevelNo: reward.previousLevelNo ?? null } as WritingReward
}

export function createBackend(baseUrl: string) {
  return {
    async getEngineHealth(): Promise<EngineHealth> {
      const value = object(await requestBackend(baseUrl, '/health'))
      const { status, engineVersion } = object(value.engine)
      if (
        value.status !== 'ok' ||
        (status !== 'ok' && status !== 'down') ||
        (engineVersion !== null && typeof engineVersion !== 'string')
      ) {
        throw new Error('교정 엔진 상태 응답을 확인해 주세요.')
      }
      return { status, engineVersion }
    },
    async login(code: string): Promise<LoginResponse> {
      const value = object(
        await requestBackend(baseUrl, '/auth/login', {
          method: 'POST',
          body: { code: code === 'DGU-001' ? 'DGU-0001' : code },
        }),
      )
      if (typeof value.accessToken !== 'string' || !value.accessToken)
        throw new Error('로그인 응답에서 토큰을 받지 못했어요.')
      return { accessToken: value.accessToken, me: profile(value.me) }
    },
    async getMe(token: string) {
      return profile(await requestBackend(baseUrl, '/me', { token }))
    },
    async updateMe(token: string, body: PreferencesPatch) {
      return profile(await requestBackend(baseUrl, '/me', { method: 'PATCH', token, body }))
    },
    async listContents(token: string, mode: ApiMode, stage: EngineStage): Promise<ContentItem[]> {
      const search = new URLSearchParams({ mode, stage })
      const value = object(await requestBackend(baseUrl, `/contents?${search}`, { token }))
      if (
        !Array.isArray(value.items) ||
        !value.items.every((item) => isContentItem(item, stage) && item.mode === mode)
      )
        throw new Error('콘텐츠 목록 형식을 확인해 주세요.')
      return value.items
    },
    async getContent(token: string, id: number, stage: EngineStage): Promise<ContentDetail> {
      const value = object(
        await requestBackend(baseUrl, `/contents/${id}?stage=${stage}`, { token }),
      )
      return contentDetail(value, id, stage)
    },
    async submitWriting(token: string, id: number, request: GradeRequest) {
      const value = object(
        await requestBackend(baseUrl, '/writings', {
          method: 'POST',
          token,
          body: writingBody(id, request),
        }),
      )
      if (
        value.contentId !== id ||
        value.stage !== request.stage ||
        typeof value.target !== 'string' ||
        value.target.normalize('NFC') !== request.target ||
        (value.nextContentId !== null && !positiveInteger(value.nextContentId))
      )
        throw new Error('쓰기 제출 응답 형식을 확인해 주세요.')
      return {
        grade: validateGradeResponse(value.grade, request),
        reward: writingReward(value.reward),
        nextContentId: value.nextContentId,
      }
    },
  }
}

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

export function createCatalogCache() {
  return {
    lists: new Map<string, Promise<ContentItem[]>>(),
    details: new Map<string, Promise<ContentDetail>>(),
    profiles: new Map<string, Promise<Profile>>(),
    jamoLists: new Map<string, Promise<JamoList>>(),
    jamoDetails: new Map<string, Promise<JamoDetail>>(),
    writings: new Map<string, Promise<WritingPage>>(),
    strokes: new Map<string, Promise<StrokeReference>>(),
    tastes: new Map<string, Promise<TasteItem[]>>(),
    levelTests: new Map<string, Promise<LevelTestStep[]>>(),
  }
}

export type CatalogCache = ReturnType<typeof createCatalogCache>

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

const artwork: Record<string, { thumbnailUrl: string; durationSec: number }> = {
  'miss-you': { thumbnailUrl: '/assets/figma/3d07b.png', durationSec: 24 },
  today: { thumbnailUrl: '/assets/figma/01084.png', durationSec: 18 },
  walk: { thumbnailUrl: '/assets/figma/3d07b.png', durationSec: 27 },
  'drama-you': { thumbnailUrl: '/assets/figma/547a2.png', durationSec: 21 },
  meal: { thumbnailUrl: '/assets/figma/8aa02.png', durationSec: 16 },
}
const entries = contents.map((content, index) => ({
  ...content,
  id: index + 1,
  localId: content.id,
}))
const ids = new Map(entries.map((entry) => [entry.localId, entry.id]))

function contentKind(mode: Mode, target: string): ContentItem['kind'] {
  if (mode !== 'basic') return 'clip'
  if (/^[ㄱ-ㅎㅏ-ㅣ]$/.test(target)) return 'jamo'
  return target.includes(' ') ? 'sentence' : 'word'
}

export function demoContents(mode: Mode, stage: Stage, favorite: string): ContentItem[] {
  return practiceContents(mode, stage)
    .map((item) => {
      const target = item.targets[stage]
      return {
        id: ids.get(item.id)!,
        mode: apiModes[mode],
        kind: contentKind(mode, target),
        writeMode: writeModes[engineStages[stage]],
        title: stage === 'pro' ? (item.dictationTitle ?? item.title) : item.title,
        source: item.source,
        thumbnailUrl: artwork[item.id]?.thumbnailUrl ?? null,
        durationSec: artwork[item.id]?.durationSec ?? null,
        meaning: item.meaning,
        target: stage === 'pro' ? null : target,
        cellCount: stage === 'pro' ? null : practiceCellCount(target, stage),
        wordCount: stage === 'pro' ? null : target.split(' ').length,
        tasteMatched: mode !== 'basic' && favorite !== '' && item.source.startsWith(favorite),
        completed: false,
        perfect: false,
      }
    })
    .sort((first, second) => Number(second.tasteMatched) - Number(first.tasteMatched))
}

export function demoContent(id: number, stage: Stage): ContentDetail {
  const item = entries.find((entry) => entry.id === id)
  if (!item) throw new ApiError(404, 'NOT_FOUND', '연습할 콘텐츠를 찾지 못했어요.')
  const target = item.targets[stage]
  const duration = artwork[item.localId]?.durationSec
  const next = practiceContents(item.mode, stage).find((entry) => ids.get(entry.id)! > id)
  return {
    id,
    mode: apiModes[item.mode],
    kind: contentKind(item.mode, target),
    title: stage === 'pro' ? (item.dictationTitle ?? item.title) : item.title,
    source: item.source,
    thumbnailUrl: artwork[item.localId]?.thumbnailUrl ?? null,
    clip: duration ? { startSec: 0, endSec: duration, embeddable: false } : null,
    lines: duration ? [{ startSec: 0, text: item.targets.pro, translation: item.meaning }] : [],
    situation: null,
    task: {
      stage: engineStages[stage],
      writeMode: writeModes[engineStages[stage]],
      target,
      meaning: item.meaning,
      cellCount: practiceCellCount(target, stage),
      wordGroups: targetGroups(target, stage) ?? null,
      speech: item.mode === 'basic' ? { text: target, lang: 'ko-KR' } : null,
    },
    nextContentId: next ? ids.get(next.id)! : null,
  }
}

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
    mastery: 'none',
  })),
  vowels: [...vowels].map((jamo, index) => ({
    jamo,
    name: names[1]![index]!,
    mastery: 'none',
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

const baseUrl = import.meta.env?.VITE_API_BASE_URL?.trim()
export const backend = baseUrl ? createBackend(baseUrl) : null
export function jamoRecordScope(accountId: number | null) {
  return baseUrl && accountId !== null ? `${baseUrl.replace(/\/+$/, '')}:${accountId}` : null
}
export const serverStudyApi = baseUrl ? createStudyApi(baseUrl) : null
export const writingHistoryApi = serverStudyApi
export const studyApi = import.meta.env?.VITE_API_STUDY === 'false' ? null : serverStudyApi
export const demoMode =
  !backend &&
  (import.meta.env?.VITE_API_MOCK === 'true' ||
    (import.meta.env?.DEV && !import.meta.env?.VITE_GRADING_ENDPOINT))
export const skipCodeLogin = !backend && !demoMode
