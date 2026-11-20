import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { test } from 'node:test'
import { parseGuideFont } from '../src/features/learning/reference/guideFont.ts'
const localGuide = 'repos.local/guide-font/guide-font'
test(
  'Dongguk guides support new phrases without a per-example SVG map',
  {
    skip: !existsSync(`${localGuide}.json`) || !existsSync(`${localGuide}.woff`),
  },
  () => {
    const font = parseGuideFont(JSON.parse(readFileSync(`${localGuide}.json`, 'utf8')))
    assert.equal(font.font, 'DONGGUK UNIVERSITY')
    for (const char of '안녕하세요훈민정음세종대왕사랑해요고맙습니다')
      assert.ok(font.bounds[char], char)
    assert.ok(font.hangulCount > 2000)
    assert.equal(font.bounds['갂'], undefined)
    assert.equal(readFileSync(`${localGuide}.woff`).subarray(0, 4).toString(), 'wOFF')
  },
)
test('invalid font metrics cannot become a guide viewport', () => {
  const font = {
    schemaVersion: 1,
    font: 'Test guide',
    sha256: '0'.repeat(64),
    unitsPerEm: 1000,
    hangulCount: 1,
    frame: [0, -800, 1000, 1000],
    bounds: { 가: [0, 0, 1000, 1000] },
  }
  assert.equal(parseGuideFont(font), font)
  assert.throws(() => parseGuideFont({ ...font, frame: [0, 0, 0, 1000] }))
  assert.throws(() => parseGuideFont({ ...font, bounds: { 가: [0, 0, NaN, 1000] } }))
  assert.throws(() => parseGuideFont({ ...font, sha256: 'invalid' }))
})
