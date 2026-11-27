import assert from 'node:assert/strict'
import test from 'node:test'
import { parseSubtitles } from '../src/devtools/parseSubtitles.ts'

test('SRT 자막을 줄로 읽는다', () => {
  const lines = parseSubtitles(
    '1\n00:00:17,000 --> 00:00:19,500\n무슨 소리죠\n\n2\n00:00:20,000 --> 00:00:22,000\n<i>강고양이</i> 씨\n',
  )
  assert.deepEqual(lines, [
    { startSec: 17, endSec: 19.5, text: '무슨 소리죠' },
    { startSec: 20, endSec: 22, text: '강고양이 씨' },
  ])
})

test('시간과 가사만 적은 줄은 다음 줄 시작까지', () => {
  const lines = parseSubtitles('0:17 무슨 소리죠\n0:19 강고양이 씨\n아무 말')
  assert.deepEqual(lines, [
    { startSec: 17, endSec: 19, text: '무슨 소리죠' },
    { startSec: 19, endSec: 22, text: '강고양이 씨' },
  ])
})
