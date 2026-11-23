import type { Mode } from '../app/session'
import { validateGradeResponse, type EngineStage, type GradeRequest } from './grading.ts'

export const apiModes = { pop: 'kpop', drama: 'kdrama', basic: 'basic' } as const
export type ApiMode = (typeof apiModes)[Mode]
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
  source: string
  thumbnailUrl: string | null
  durationSec: number | null
  target: string | null
  cellCount: number | null
  wordCount: number | null
  meaning?: string | null
  tasteMatched: boolean
  completed: boolean
}
export type ContentDetail = {
  id: number
  mode: ApiMode
  title: string
  source: string
  thumbnailUrl?: string | null
  clip: ContentVideo | null
  lines: SubtitleLine[]
  situation: string | null
  task: {
    target: string
    stage: EngineStage
    meaning: string | null
    cellCount: number
    wordGroups: number[] | null
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
  stageUpSuggested: boolean
}

export class ApiError extends Error {
  readonly status: number
  readonly code: string
  constructor(status: number, code: string, message: string) {
    super(message)
    this.status = status
    this.code = code
  }
}

function object(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object' ? (value as Record<string, unknown>) : {}
}

function positiveInteger(value: unknown): value is number {
  return typeof value === 'number' && Number.isSafeInteger(value) && value > 0
}

function isContentItem(value: unknown, stage: EngineStage): value is ContentItem {
  const item = object(value)
  return (
    positiveInteger(item.id) &&
    typeof item.title === 'string' &&
    typeof item.source === 'string' &&
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
    typeof item.completed === 'boolean'
  )
}

function contentDetail(value: unknown, id: number, stage: EngineStage): ContentDetail {
  const detail = object(value)
  const task = object(detail.task)
  const clip = object(detail.clip)
  const target = typeof task.target === 'string' ? task.target.normalize('NFC') : ''
  const letters = [...(stage === 'advanced' ? target : target.replaceAll(' ', ''))].length
  if (
    detail.id !== id ||
    !['kpop', 'kdrama', 'basic'].some((mode) => mode === detail.mode) ||
    typeof detail.title !== 'string' ||
    typeof detail.source !== 'string' ||
    (detail.thumbnailUrl != null && typeof detail.thumbnailUrl !== 'string') ||
    task.stage !== stage ||
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

export async function requestBackend(
  baseUrl: string,
  path: string,
  options: { method?: 'GET' | 'POST' | 'PATCH' | 'PUT'; token?: string; body?: unknown } = {},
): Promise<unknown> {
  const { method = 'GET', token, body } = options
  const response = await fetch(`${baseUrl.replace(/\/+$/, '')}/api/v1${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    signal: AbortSignal.timeout(30000),
  })
  if (response.status === 204) return undefined
  if (response.status >= 500) {
    throw new ApiError(response.status, 'SERVER_ERROR', '잠시 뒤 다시 시도해 주세요.')
  }
  const value: unknown = await response.json().catch(() => undefined)
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
    throw new ApiError(
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
  if (
    !Number.isSafeInteger(reward.expGained) ||
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
    typeof reward.stageUpSuggested !== 'boolean'
  ) {
    return undefined
  }
  return { ...reward, previousLevelNo: reward.previousLevelNo ?? null } as WritingReward
}

export function createBackend(baseUrl: string) {
  return {
    async login(code: string): Promise<LoginResponse> {
      const value = object(
        await requestBackend(baseUrl, '/auth/login', {
          method: 'POST',
          body: { code },
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
