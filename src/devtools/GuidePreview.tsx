import { useState } from 'react'
import { ManuscriptPaper } from '@/components/writing/ManuscriptPaper'
import { FigmaGuideGlyph } from '@/features/learning/reference/FigmaGuideGlyph'
import { loadGuideFont, useGuideFont } from '@/features/learning/reference/guideFont'
import styles from './ReferenceDataPanel.module.css'
export function GuidePreview() {
  const [text, setText] = useState('안녕하세요')
  const { data, error, loading } = useGuideFont()
  const chars = [...text.normalize('NFC')]
  const missing = data
    ? [...new Set(chars.filter((char) => char !== ' ' && !data.bounds[char]))]
    : []
  return (
    <section className={styles.card} aria-label="새 문장 가이드 미리보기">
      <h2>새 문장 가이드 미리보기</h2>
      <label>
        연습 문장 (최대 20자)
        <input
          aria-label="가이드 미리보기 문장"
          value={text}
          maxLength={20}
          onChange={(event) => setText(event.target.value)}
        />
      </label>
      {data && (
        <p>
          {data.font} · 한글 {data.hangulCount.toLocaleString()}자 지원
        </p>
      )}
      {loading && <p role="status">가이드 폰트를 불러오는 중이에요.</p>}
      {error && (
        <p role="alert">
          {error}{' '}
          <button
            type="button"
            onClick={() => {
              void loadGuideFont(true)
            }}
          >
            다시 불러오기
          </button>
        </p>
      )}
      {missing.length > 0 && (
        <p role="status">
          원본 폰트에 글자가 없는 항목: {missing.join(' ')}. 해당 칸은 비워 두어요.
        </p>
      )}
      {chars.length > 0 && (
        <ManuscriptPaper
          count={chars.length}
          columns={Math.min(6, chars.length)}
          cellSize={144}
          renderCell={(index) => (
            <div style={{ position: 'relative' }}>
              <FigmaGuideGlyph char={chars[index]!} />
            </div>
          )}
        />
      )}
    </section>
  )
}
