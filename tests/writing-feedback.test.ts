import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync } from 'node:fs'
import { assignStroke } from '../src/components/writing/inkGeometry.ts'
import { feedbackMarks, retryCellIndexes } from '../src/data/writingFeedback.ts'
import type { WritingDraft } from '../src/data/writingTypes.ts'

test('crossing a cell boundary assigns the stroke to the majority cell and ignores outside points', () => {
  const cells = ['a', 'b'].map((id, index) => ({
    id,
    bounds: { left: index * 100, top: 0, width: 100, height: 100 },
  }))
  assert.deepEqual(
    assignStroke(
      [
        [80, 10, 0, 0.25],
        [125, 25, 10, 0.5],
        [150, 50, 30, 0.7],
        [250, 10, 40, 0.6],
      ],
      cells,
      'a',
    ),
    {
      id: 'b',
      points: [
        [72, 72, 10, 0.5],
        [144, 144, 30, 0.7],
      ],
    },
  )
  assert.equal(assignStroke([[250, 10, 0, 0.5]], cells, 'a'), undefined)
})

test('intermediate corrections expand to an entire word and advanced summary hides cell marks', () => {
  const grade = JSON.parse(
    readFileSync(new URL('./fixtures/grade_response_intermediate.json', import.meta.url), 'utf8'),
  )
  grade.cells = grade.cells.map((cell: { index: number }) => ({
    ...cell,
    mark: cell.index === 1 ? 'char' : 'none',
  }))
  grade.words = [{ text: '보고', cellIndexes: [0, 1], correct: false }]
  grade.alignment = []
  const draft: WritingDraft = {
    source: 'write-mid',
    stage: 'mid',
    target: '보고 싶었어',
    grade,
    cells: grade.cells.map(() => ({ image: '', written: false, strokes: [] })),
  }
  assert.deepEqual(retryCellIndexes(draft), [0, 1])
  assert.deepEqual(feedbackMarks(draft).slice(0, 3), ['char', 'char', 'none'])
  const advanced = { ...draft, stage: 'pro' as const }
  assert.equal(
    feedbackMarks(advanced).every((mark) => mark === 'none'),
    true,
  )
  assert.deepEqual(retryCellIndexes(advanced), [])
})
