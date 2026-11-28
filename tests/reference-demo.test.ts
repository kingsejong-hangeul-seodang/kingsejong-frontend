import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { test } from 'node:test'
import { parseGuideFont } from '../src/features/learning/reference/guideFont.ts'
import {
  donggukFontName,
  isNotoDemo,
  parseReference,
} from '../src/features/learning/reference/reference.ts'

test('the supplied Noto reference is recognized independently of an optional local guide', () => {
  const reference = parseReference(JSON.parse(readFileSync('public/data/reference.json', 'utf8')))
  assert.equal(isNotoDemo(reference), true)
  for (const char of '바다가나다보고싶었어ㅎ') assert.ok(reference.characters[char]?.length)
  assert.equal(isNotoDemo({ ...reference, fontSha256: '0'.repeat(64) }), false)
  assert.equal(isNotoDemo({ ...reference, font: 'DONGGUK UNIVERSITY' }), false)
})

test('the public Dongguk guide and stroke pack use the same source font', () => {
  const dir = 'public/data/dongguk'
  const guide = parseGuideFont(JSON.parse(readFileSync(`${dir}/guide-font.json`, 'utf8')))
  const reference = parseReference(JSON.parse(readFileSync(`${dir}/reference.json`, 'utf8')))
  assert.equal(guide.font, donggukFontName)
  assert.equal(reference.font, guide.font)
  assert.equal(reference.fontSha256, guide.sha256)
  assert.equal(readFileSync(`${dir}/guide-font.woff`).toString('ascii', 0, 4), 'wOFF')
  for (const char of '가나다한글ㅎ') assert.ok(guide.bounds[char])
})
