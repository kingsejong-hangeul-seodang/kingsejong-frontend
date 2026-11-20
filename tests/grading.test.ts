import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import {
  gradeWriting,
  makeGradeRequest,
  validateGradeResponse,
  type GradeResponse,
  type GradeRequest,
} from '../src/api/grading.ts'
import { parseReference } from '../src/features/learning/reference/reference.ts'
const ink = {
  strokes: [
    {
      points: [
        [10, 20, 0, 0.5],
        [30, 40, 100, 0.6],
      ] as [number, number, number, number][],
    },
  ],
}
const request = makeGradeRequest('beginner', '바다', [ink, ink], 'ko')
const response: GradeResponse = {
  engineVersion: '1.0',
  stage: 'beginner',
  correct: true,
  perfect: true,
  cells: request.cells.map((cell) => ({
    index: cell.index,
    charCorrect: true,
    mark: 'none',
    errors: [],
  })),
  alignment: [],
  words: [],
  explanations: [],
  sejong: { text: '잘 썼어요', expression: 'praise', source: 'template' },
}
test('grade payload preserves pressure, timing, stage and empty advanced spacing cells', () => {
  const value = makeGradeRequest('pro', '나 너', [ink, { strokes: [] }, ink], 'en')
  assert.equal(value.stage, 'advanced')
  assert.equal(value.cells[1]?.strokes.length, 0)
  assert.deepEqual(value.cells[0]?.strokes[0]?.points[1], [30, 40, 100, 0.6])
  assert.equal(makeGradeRequest('beginner', 'ㄷ', [ink], 'ko').target, 'ㄷ')
  assert.equal(
    makeGradeRequest('beginner', 'ㄷ', [{ strokes: [{ points: [[-12, 310, 0, 0.5]] }] }], 'ko')
      .cells[0]?.strokes[0]?.points[0]?.[0],
    -12,
  )
})
test('invalid cell counts, nonfinite points and reversed timestamps are rejected', () => {
  assert.throws(() => makeGradeRequest('mid', 'ㄷ', [ink], 'ko'))
  assert.throws(() => makeGradeRequest('beginner', '나 너', [ink, ink], 'ko'))
  assert.throws(() => makeGradeRequest('mid', '나 너 나 너', [ink, ink, ink, ink], 'ko'))
  assert.throws(() => makeGradeRequest('mid', '보고 싶었어', [ink], 'ko'))
  assert.throws(() =>
    makeGradeRequest(
      'beginner',
      '바다',
      [{ strokes: [{ points: [[NaN, 0, 0, 0.5]] }] }, ink],
      'ko',
    ),
  )
  assert.throws(() =>
    makeGradeRequest(
      'beginner',
      '바다',
      [
        {
          strokes: [
            {
              points: [
                [0, 0, 100, 0.5],
                [0, 0, 10, 0.5],
              ],
            },
          ],
        },
        ink,
      ],
      'ko',
    ),
  )
})
test('malformed response arrays, cell indices, messages and sejong fields are rejected', () => {
  assert.deepEqual(validateGradeResponse(response, request), response)
  for (const mutation of [
    { words: [{ text: '바다', cellIndexes: [99], correct: true }] },
    { alignment: [null] },
    { explanations: [{ text: '오류' }] },
    {
      cells: [
        { ...response.cells[0], errors: [{ type: 'ORDER', message: {} }] },
        response.cells[1],
      ],
    },
    { sejong: { text: 'test', subText: {}, expression: 'praise', source: 'template' } },
  ])
    assert.throws(() => validateGradeResponse({ ...response, ...mutation }, request))
})
test('no endpoint yields ungraded; server failure and malformed JSON remain errors', async (context) => {
  assert.equal(await gradeWriting(request, ''), null)
  const fetch = context.mock.method(
    globalThis,
    'fetch',
    async () => new Response(JSON.stringify({ message: '서버 오류' }), { status: 503 }),
  )
  await assert.rejects(gradeWriting(request, '/grade'), /잠시 뒤 다시 제출해 주세요/)
  fetch.mock.mockImplementation(async () => new Response('not-json', { status: 200 }))
  await assert.rejects(gradeWriting(request, '/grade'), /응답 형식/)
})
test('the three engine request/response fixtures pass the browser contract', () => {
  for (const stage of ['beginner', 'intermediate', 'advanced']) {
    const input = JSON.parse(
      readFileSync(`tests/fixtures/grade_request_${stage}.json`, 'utf8'),
    ) as GradeRequest
    const output = JSON.parse(readFileSync(`tests/fixtures/grade_response_${stage}.json`, 'utf8'))
    assert.equal(validateGradeResponse(output, input).stage, stage)
  }
})

test('generated font pack covers every task and all 51 jamo with ordered finite normalized strokes', () => {
  const data = parseReference(JSON.parse(readFileSync('public/data/reference.json', 'utf8')))
  assert.equal(data.totalGenerated, 11223)
  assert.equal(data.font, 'Noto Sans KR Light')
  const content = JSON.parse(readFileSync('src/data/content.json', 'utf8')) as {
    targets: Record<string, string>
  }[]
  for (const item of content)
    for (const target of Object.values(item.targets))
      for (const char of target) if (/[가-힣]/.test(char)) assert.ok(data.characters[char], char)
  for (let code = 0x3131; code <= 0x3163; code++)
    assert.ok(data.characters[String.fromCharCode(code)])
  assert.throws(() => parseReference({ ...data, totalGenerated: null }))
  assert.throws(() =>
    parseReference({
      ...data,
      characters: { 가: [{ order: 1, jamo: 'ㄱ', role: 'cho', points: [[2, 0]] }] },
    }),
  )
})
