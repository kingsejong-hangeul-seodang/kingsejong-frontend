import { useState } from 'react'
import { AppBar } from '@/components/ui/AppBar'
import { Button } from '@/components/ui/Button'
import { Panel } from '@/components/ui/Panel'
import { SejongMessage } from '@/components/SejongMessage'
import { useSession } from '@/app/useSession'
import { navigate } from '@/app/router'
import { homeScreen } from '@/app/learningFlow'
import { ReferencePlayer } from '@/features/learning/reference/ReferencePlayer'
import { useReference } from '@/features/learning/reference/reference'
import styles from '@/styles/screens.module.css'
import learningLayout from '@/features/learning/FigmaLearning.module.css'
import sharedLayout from '@/styles/sharedLayout.module.css'

export default function StrokePreview() {
  const [text, setText] = useState('바다')
  const target = text.normalize('NFC').replaceAll(' ', '')
  const { data, loading, error } = useReference()
  const { selectPractice, update, preferences, notify } = useSession()
  function handleBack() {
    notify('')
    navigate(homeScreen(preferences.mode))
  }
  const missing = data ? [...new Set([...target].filter((char) => !data.characters[char]))] : []
  return (
    <div className={styles.screen} data-name="stroke-preview">
      <AppBar title="획순 미리보기" onBack={handleBack} />
      <div className={styles.pageContent} data-name="page">
        <SejongMessage
          className={styles.guideMessage}
          title="한 획씩 쓰는 순서를 살펴봐요"
          description="글자를 고르고 재생을 눌러 보세요. 본 뒤에는 직접 따라 쓸 수 있어요."
          src="/assets/figma/fc462.png"
          vertical={false}
          characterWidth={120}
          characterHeight={191.8}
        />
        <Panel className={styles.panel} data-name="block">
          <label className={learningLayout.previewInput}>
            보고 싶은 글
            <input
              aria-label="획순을 볼 글"
              value={text}
              maxLength={12}
              onChange={(event) => setText(event.target.value)}
            />
          </label>
          <div className={`${sharedLayout.rowHeading} ${learningLayout.previewHeading}`}>
            {['바다', '가나다', '보고 싶었어', 'ㅎ'].map((sample) => (
              <Button key={sample} variant="small" onClick={() => setText(sample)}>
                {sample}
              </Button>
            ))}
          </div>
          <p className={styles.secondaryText}>
            교정 엔진에서 추출한 Noto 데이터로 재생해요. 실제 채점은 연결 전이에요.
          </p>
          {missing.length > 0 && (
            <p className={styles.secondaryText} role="status">
              이번 미리보기에 없는 글자: {missing.join(' ')}. 위 예시나 현재 연습 문장으로 확인해
              주세요.
            </p>
          )}
          {error && <p role="status">획순 데이터를 불러오지 못했어요. 다시 열어 주세요.</p>}
        </Panel>
        {target && <ReferencePlayer key={target} target={target} />}
      </div>
      <div className={styles.footer} data-name="cta">
        <Button
          className={styles.primaryButton}
          disabled={
            !target ||
            loading ||
            !data ||
            missing.length > 0 ||
            ([...target].some((char) => /[ㄱ-ㅣ]/.test(char)) && [...target].length !== 1)
          }
          onClick={() => {
            selectPractice(target)
            update({ stage: 'beginner' })
            navigate('write-beginner')
          }}
        >
          직접 따라 쓰기
        </Button>
      </div>
    </div>
  )
}
