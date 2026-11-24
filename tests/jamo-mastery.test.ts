import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import type { GradeResponse } from '../src/api/grading.ts'
import {
  jamoAttempt,
  readJamoAttempts,
  saveJamoAttempt,
  summarizeJamoMastery,
} from '../src/data/jamoMastery.ts'
import type { WritingDraft } from '../src/data/writingTypes.ts'

const sample: GradeResponse = JSON.parse(
  readFileSync(new URL('./fixtures/grade_response_beginner.json', import.meta.url), 'utf8'),
)
const empty: WritingDraft['cells'][number] = { image: '', written: false, strokes: [] }
const ink: WritingDraft['cells'][number] = {
  image: '',
  written: true,
  strokes: [{ points: [[20, 20, 0, 0.5]] }],
}
const first: WritingDraft = {
  source: 'write-beginner',
  stage: 'beginner',
  target: '바다',
  cells: [ink, empty],
  grade: null,
}

test('only ink counts as practice and a stub cannot establish mastery', () => {
  assert.deepEqual(jamoAttempt(first), { ㅂ: 'ungraded', ㅏ: 'ungraded' })
  const stub = jamoAttempt({
    ...first,
    grade: { ...sample, engineVersion: '0.1.0-stub' },
  })
  const status = summarizeJamoMastery([stub, stub, stub])
  assert.deepEqual(status.get('ㅂ'), { status: 'practice', practiceCount: 3, recentGrades: [] })
  assert.equal(status.get('ㄷ') ?? 'none', 'none')
})

test('three graded submissions establish familiarity and a recent error returns to practice', () => {
  const grade: GradeResponse = {
    ...sample,
    engineVersion: '1.0',
    cells: sample.cells.map((cell) => ({
      ...cell,
      charCorrect: true,
      mark: 'none',
      strokePass: true,
    })),
  }
  const pass = jamoAttempt({ ...first, cells: [ink, ink], grade })
  assert.deepEqual(pass, { ㅂ: 'pass', ㅏ: 'pass', ㄷ: 'pass' })
  assert.equal(summarizeJamoMastery([pass, pass]).get('ㅏ')?.status, 'practice')
  assert.equal(summarizeJamoMastery([pass, pass, pass]).get('ㅏ')?.status, 'familiar')

  const error = jamoAttempt({
    ...first,
    cells: [ink, ink],
    grade: { ...grade, cells: [grade.cells[0]!, { ...grade.cells[1]!, mark: 'stroke' }] },
  })
  const afterError = summarizeJamoMastery([error, pass, pass, pass])
  assert.deepEqual(afterError.get('ㅏ'), {
    status: 'practice',
    practiceCount: 4,
    recentGrades: ['retry', 'pass', 'pass'],
  })
  assert.equal(afterError.get('ㅂ')?.status, 'familiar')
})

test('advanced writing uses graded alignment to identify the attempted syllable', () => {
  const attempt = jamoAttempt({
    ...first,
    stage: 'pro',
    target: '바 값',
    cells: [empty, ink, empty],
    grade: {
      ...sample,
      stage: 'advanced',
      engineVersion: '1.0',
      cells: [
        { ...sample.cells[0]!, index: 0 },
        {
          ...sample.cells[0]!,
          index: 1,
          charCorrect: true,
          mark: 'spacing',
          strokePass: true,
        },
      ],
      alignment: [{ targetIndex: 2, targetChar: '값', cellIndex: 1, mark: 'spacing' }],
    },
  })
  assert.deepEqual(attempt, { ㄱ: 'pass', ㅏ: 'pass', ㅂ: 'pass', ㅅ: 'pass' })
})

test('older practice outcomes still contribute when adding dated practice history', () => {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage')
  const values = new Map([
    ['hangeul-jamo-attempts:account-1', JSON.stringify([{ ㅂ: 'pass' }, { ㅂ: 'pass' }])],
  ])
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => values.set(key, value),
    },
  })
  try {
    saveJamoAttempt('account-1', first)
    const [latest, ...older] = readJamoAttempts('account-1')
    assert.equal(latest?.target, '바다')
    assert.ok(Number.isFinite(Date.parse(latest?.createdAt ?? '')))
    assert.deepEqual(latest?.outcomes, { ㅂ: 'ungraded', ㅏ: 'ungraded' })
    assert.deepEqual(older, [{ outcomes: { ㅂ: 'pass' } }, { outcomes: { ㅂ: 'pass' } }])
    assert.deepEqual(readJamoAttempts('account-2'), [])
  } finally {
    if (descriptor) Object.defineProperty(globalThis, 'localStorage', descriptor)
    else Reflect.deleteProperty(globalThis, 'localStorage')
  }
})
