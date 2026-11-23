import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { isNotoDemo, parseReference } from '../src/features/learning/reference/reference.ts'

test('the supplied Noto reference is recognized independently of an optional local guide', () => {
  const reference = parseReference(JSON.parse(readFileSync('public/data/reference.json', 'utf8')))
  assert.equal(isNotoDemo(reference), true)
  for (const char of '바다가나다보고싶었어ㅎ') assert.ok(reference.characters[char]?.length)
  assert.equal(isNotoDemo({ ...reference, fontSha256: '0'.repeat(64) }), false)
  assert.equal(isNotoDemo({ ...reference, font: 'DONGGUK UNIVERSITY' }), false)
})
