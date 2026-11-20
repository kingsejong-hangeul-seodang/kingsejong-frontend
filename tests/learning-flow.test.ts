import assert from 'node:assert/strict'
import { test } from 'node:test'
import { homeScreen, learningBack } from '../src/app/learningFlow.ts'
import { clearWritingMemory, writingKey, writingMemory } from '../src/data/writingDrafts.ts'
import { containsJamo } from '../src/data/hangul.ts'

test('return paths retain the selected content mode, stage and history origin', () => {
  const context = {
    mode: 'drama' as const,
    stage: 'pro' as const,
    practiceTarget: null,
    resultOrigin: null,
  }
  assert.equal(learningBack('clip', context), 'home-drama')
  assert.equal(learningBack('write-pro', context), 'home-drama')
  assert.equal(learningBack('stroke', context), 'compare-pro')
  assert.equal(learningBack('compare-pro', context), 'result-pro')
  assert.equal(learningBack('result-pro', { ...context, resultOrigin: 'records' }), 'records')
  assert.equal(learningBack('write-beginner', { ...context, practiceTarget: 'ㅎ' }), 'dogam')
  assert.equal(homeScreen('basic'), 'home-basic')
})

test('unfinished ink survives navigation while different stages and targets remain independent', () => {
  clearWritingMemory()
  const key = writingKey('sea', null, 'beginner')
  const cell = {
    image: '',
    written: true,
    strokes: [{ points: [[30, 40, 250, 0.5] as [number, number, number, number]] }],
  }
  writingMemory(key).set(0, cell)
  assert.deepEqual(writingMemory(key).get(0), cell)
  assert.equal(writingMemory(writingKey('sea', null, 'mid')).size, 0)
  assert.equal(writingMemory(writingKey('sea', 'ㅎ', 'beginner')).size, 0)
  clearWritingMemory(key)
  assert.equal(writingMemory(key).size, 0)
  clearWritingMemory()
})

test('jamo history works before reference strokes are available, including final consonants', () => {
  assert.equal(containsJamo('ㅎ', 'ㅎ'), true)
  assert.equal(containsJamo('좋아', 'ㅎ'), true)
  assert.equal(containsJamo('바다', 'ㅎ'), false)
  assert.equal(containsJamo('값', 'ㅅ'), true)
  assert.equal(containsJamo('안녕'.normalize('NFD'), 'ㄴ'), true)
  assert.equal(containsJamo('바다', 'ㅏ'), true)
})
