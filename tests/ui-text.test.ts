import assert from 'node:assert/strict'
import { test } from 'node:test'
import { translateUi } from '../src/app/uiText.ts'

test('English localizes interface text while preserving interpolated Hangul', () => {
  assert.equal(translateUi('English', '쓰기 기록'), 'Writing history')
  assert.equal(translateUi('한국어', '쓰기 기록'), '쓰기 기록')
  assert.equal(
    translateUi('English', '‘{0}’를 써 볼까요?', '보고 싶었어'),
    'Try writing ‘보고 싶었어’',
  )
  assert.equal(translateUi('English', '서버에서 받은 문장'), '서버에서 받은 문장')
})
