import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import { ApiError, createBackend, requestBackend, writingBody } from '../src/api/backend.ts'
import { demoGrade, demoLogin, DEMO_CODE } from '../src/api/demo.ts'
import { createStudyApi } from '../src/api/study.ts'
import { type GradeRequest, validateGradeResponse } from '../src/api/grading.ts'

const fixture = (name: string) =>
  JSON.parse(readFileSync(new URL(`./fixtures/${name}.json`, import.meta.url), 'utf8'))
const request: GradeRequest = fixture('grade_request_beginner')

test('study routes encode jamo and cursors, and save tastes with an empty response', async (t) => {
  const fetch = t.mock.method(globalThis, 'fetch', async () =>
    Response.json({
      jamo: 'ㄷ',
      name: '디귿',
      mastery: 'practice',
      type: 'consonant',
      strokeCount: 2,
      steps: ['위 가로획부터'],
      commonMistake: null,
      examples: ['다'],
      practiceContentId: 31,
      recentWritings: [],
    }),
  )
  const api = createStudyApi('https://backend.example')
  assert.equal((await api.jamoDetail('token', 'ㄷ')).practiceContentId, 31)
  assert.match(String(fetch.mock.calls[0]?.arguments[0]), /\/jamo\/%E3%84%B7$/)
  fetch.mock.mockImplementation(async () => Response.json({ items: [], nextCursor: null }))
  assert.deepEqual(await api.writings('token', 'a+b'), { items: [], nextCursor: null })
  assert.match(String(fetch.mock.calls[1]?.arguments[0]), /cursor=a%2Bb&size=20$/)
  fetch.mock.mockImplementation(async () => new Response(null, { status: 204 }))
  await api.saveTastes('token', 'kdrama', [3])
  const [url, options] = fetch.mock.calls[2]!.arguments
  assert.equal(url, 'https://backend.example/api/v1/me/tastes')
  assert.equal(options?.method, 'PUT')
  assert.deepEqual(JSON.parse(String(options?.body)), { mode: 'kdrama', tasteIds: [3] })
})

test('backend login, profile patch and writing use the documented paths and request bodies', async (t) => {
  const { accessToken, me } = demoLogin(DEMO_CODE)
  const grade = fixture('grade_response_beginner')
  const fetch = t.mock.method(globalThis, 'fetch', async () => Response.json({ accessToken, me }))
  const backend = createBackend('https://backend.example/')
  assert.deepEqual(await backend.login(DEMO_CODE), { accessToken, me })
  assert.deepEqual(fetch.mock.calls[0]?.arguments.slice(0, 1), [
    'https://backend.example/api/v1/auth/login',
  ])
  assert.equal(JSON.parse(fetch.mock.calls[0]!.arguments[1]!.body as string).code, DEMO_CODE)
  assert.equal(new Headers(fetch.mock.calls[0]!.arguments[1]!.headers).has('Authorization'), false)

  fetch.mock.mockImplementation(async () => Response.json({ ...me, locale: 'en' }))
  assert.equal((await backend.updateMe(accessToken, { locale: 'en' })).locale, 'en')
  assert.equal(fetch.mock.calls[1]?.arguments[1]?.method, 'PATCH')

  const reward = {
    expGained: 15,
    items: [
      { reason: 'correct', exp: 10 },
      { reason: 'perfect', exp: 5 },
    ],
    level: { no: 2, name: '성균관 유생', exp: 310, levelStartExp: 300, nextLevelExp: 800 },
    leveledUp: true,
    previousLevelNo: 1,
    stageUpSuggested: false,
  }
  fetch.mock.mockImplementation(async () =>
    Response.json(
      { contentId: 11, stage: 'beginner', grade, reward, nextContentId: 12 },
      { status: 201 },
    ),
  )
  assert.deepEqual(await backend.submitWriting(accessToken, 11, request), {
    grade,
    reward,
    nextContentId: 12,
  })
  const [url, options] = fetch.mock.calls[2]!.arguments
  assert.equal(url, 'https://backend.example/api/v1/writings')
  assert.equal(new Headers(options?.headers).get('Authorization'), `Bearer ${accessToken}`)
  const payload = JSON.parse(options!.body as string)
  assert.deepEqual(payload, writingBody(11, request))
  assert.equal('target' in payload, false)
  assert.equal('locale' in payload, false)
  assert.deepEqual(payload.cells, request.cells)
})

test('empty success, authentication errors and validation details follow the API contract', async (t) => {
  const fetch = t.mock.method(globalThis, 'fetch', async () => new Response(null, { status: 204 }))
  assert.equal(await requestBackend('', '/test'), undefined)

  for (const code of ['INVALID_LOGIN_CODE', 'UNAUTHORIZED']) {
    fetch.mock.mockImplementation(async () => Response.json({ code }, { status: 401 }))
    await assert.rejects(requestBackend('', '/test'), { code, status: 401 })
  }
  fetch.mock.mockImplementation(async () =>
    Response.json(
      {
        code: 'INVALID_REQUEST',
        details: [{ field: 'cells[0].strokes', message: '획이 너무 많아요' }],
      },
      { status: 422 },
    ),
  )
  await assert.rejects(requestBackend('', '/test'), /cells\[0\]\.strokes: 획이 너무 많아요/)
  fetch.mock.mockImplementation(async () => new Response(null, { status: 503 }))
  await assert.rejects(requestBackend('', '/test'), { status: 503, code: 'SERVER_ERROR' })
})

test('demo rejects an incorrect code and returns a clearly marked stub result', () => {
  assert.throws(
    () => demoLogin('WRONG'),
    (error: unknown) => error instanceof ApiError && error.code === 'INVALID_LOGIN_CODE',
  )
  const grade = demoGrade(request)
  assert.match(grade.engineVersion, /-stub$/)
  assert.deepEqual(validateGradeResponse(grade, request), grade)
})

test('catalog gets a stage-specific list and detail by server ID, including the final item', async (t) => {
  const item = {
    id: 11,
    mode: 'kpop',
    title: '별빛 아래',
    source: '하늘빛',
    thumbnailUrl: null,
    durationSec: 24,
    target: '바다 보러',
    cellCount: 4,
    wordCount: 2,
    tasteMatched: true,
    completed: false,
  }
  const detail = {
    id: 11,
    mode: 'kpop',
    title: '별빛 아래',
    source: '하늘빛',
    clip: { startSec: 4, endSec: 28, embeddable: false },
    lines: [{ text: '바다 보러', startSec: 5 }],
    situation: null,
    task: {
      stage: 'intermediate',
      target: '바다 보러',
      meaning: null,
      cellCount: 4,
      wordGroups: [2, 2],
    },
    nextContentId: null,
  }
  const fetch = t.mock.method(globalThis, 'fetch', async () => Response.json({ items: [item] }))
  const backend = createBackend('https://backend.example')
  assert.deepEqual(await backend.listContents('token', 'kpop', 'intermediate'), [item])
  assert.equal(
    fetch.mock.calls[0]?.arguments[0],
    'https://backend.example/api/v1/contents?mode=kpop&stage=intermediate',
  )
  fetch.mock.mockImplementation(async () => Response.json(detail))
  assert.deepEqual(await backend.getContent('token', 11, 'intermediate'), detail)
  assert.equal(
    fetch.mock.calls[1]?.arguments[0],
    'https://backend.example/api/v1/contents/11?stage=intermediate',
  )
  await assert.rejects(backend.getContent('token', 11, 'beginner'), /콘텐츠 상세 형식/)
})
