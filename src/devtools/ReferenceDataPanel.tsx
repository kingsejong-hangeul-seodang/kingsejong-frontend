import { useEffect, useState } from 'react'
import {
  installReference,
  loadReference,
  useReference,
} from '@/features/learning/reference/reference'
import styles from './ReferenceDataPanel.module.css'
import { GuidePreview } from './GuidePreview'
import { loadGuideFont } from '@/features/learning/reference/guideFont'
type Job = { state: string; log: string }
export function ReferenceDataPanel() {
  const { data, error } = useReference()
  const [message, setMessage] = useState('')
  const [job, setJob] = useState<Job | null>(null)
  const [uploading, setUploading] = useState(false)
  useEffect(() => {
    if (!import.meta.env.DEV) return
    let cancelled = false
    let timer: ReturnType<typeof setTimeout>
    const poll = async () => {
      try {
        const response = await fetch('/__reference/status')
        if (!response.ok) return
        const current = (await response.json()) as Job
        if (cancelled) return
        setJob(current)
        if (current.state === 'done' || current.state === 'error') {
          if (current.state === 'done') await loadReference()
          await loadGuideFont(true)
        }
        if (current.state === 'running' || current.state === 'idle')
          timer = setTimeout(() => {
            void poll()
          }, 2000)
      } catch {
        /* CLI generation is still available. */
      }
    }
    void poll()
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [uploading])
  const busy = uploading || job?.state === 'running'
  return (
    <>
      <GuidePreview />
      <section className={styles.card}>
        <h2>정답 획 데이터</h2>
        <p>폰트 → 자모·음절 추출 → 정답 획 JSON → 따라쓰기와 획순 재생</p>
        {data && (
          <p>
            {data.font} · 전체 {data.totalGenerated.toLocaleString()}자 생성 · 연습용{' '}
            {Object.keys(data.characters).length}자 연결
          </p>
        )}
        {error && <p role="alert">{error}</p>}
        <p className={styles.muted}>
          전체 JSON은 repos.local/Python-correction-engine/data/extracted에, 연습용 JSON은
          public/data/reference.json에 저장해요. 자동 추출 결과는 엔진 편집기로 검수해 주세요.
        </p>
        {import.meta.env.DEV && (
          <label>
            폰트 넣고 정답 획 JSON 생성 (TTF / OTF, 최대 30MB)
            <input
              className={styles.file}
              type="file"
              accept=".ttf,.otf"
              disabled={busy}
              onChange={async (event) => {
                const file = event.target.files?.[0]
                event.target.value = ''
                if (!file) return
                if (file.size > 30 * 1024 * 1024) {
                  setMessage('폰트는 30MB 이하여야 해요.')
                  return
                }
                setUploading(true)
                setMessage('')
                try {
                  const response = await fetch('/__reference/generate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/octet-stream' },
                    body: file,
                  })
                  const value = await response.json()
                  if (!response.ok) throw new Error(value.message ?? '폰트 생성 요청 실패')
                  setJob(value as Job)
                } catch (error) {
                  setMessage(error instanceof Error ? error.message : '생성 실패')
                } finally {
                  setUploading(false)
                }
              }}
            />
          </label>
        )}
        {busy && (
          <p role="status">폰트에서 정답 획을 생성하고 있어요. 몇 분 정도 걸릴 수 있어요.</p>
        )}
        {job?.state === 'done' && (
          <p role="status">생성이 끝났어요. 새 정답 획을 사용할 수 있어요.</p>
        )}
        {job?.state === 'error' && (
          <p role="alert">
            정답 획 생성에 실패했어요. 가이드 폰트는 위 미리보기에서 확인하고, 획 추출 오류는 아래
            로그를 확인해 주세요.
          </p>
        )}
        {job?.log && (
          <details>
            <summary>생성 로그</summary>
            <pre
              style={{
                whiteSpace: 'pre-wrap',
                overflowWrap: 'anywhere',
                maxHeight: 240,
                overflow: 'auto',
              }}
            >
              {job.log}
            </pre>
          </details>
        )}
        <p className={styles.muted}>
          로컬 생성: npm run data:generate -- --font "폰트 경로". Python 3.12 이상과 교정 엔진의
          추출 패키지가 필요해요. 배포 화면에서는 생성한 JSON을 사용해요.
        </p>
        <label>
          생성한 연습용 reference.json 불러오기 (현재 탭에 적용)
          <input
            className={styles.file}
            type="file"
            accept=".json,application/json"
            onChange={async (event) => {
              const file = event.target.files?.[0]
              event.target.value = ''
              if (!file) return
              try {
                if (file.size > 5 * 1024 * 1024) throw new Error('연습용 JSON은 5MB 이하여야 해요.')
                installReference(JSON.parse(await file.text()))
                setMessage('정답 데이터를 적용했어요.')
              } catch (error) {
                setMessage(error instanceof Error ? error.message : 'JSON을 확인해 주세요.')
              }
            }}
          />
        </label>
        <div className={styles.actions}>
          <button
            type="button"
            onClick={() => {
              void loadReference()
            }}
          >
            기본 데이터 다시 읽기
          </button>
          {data && (
            <button
              type="button"
              onClick={() => {
                const url = URL.createObjectURL(
                  new Blob([JSON.stringify(data)], { type: 'application/json' }),
                )
                const link = document.createElement('a')
                link.href = url
                link.download = 'reference.json'
                link.click()
                setTimeout(() => URL.revokeObjectURL(url), 1000)
              }}
            >
              정답 JSON 내려받기
            </button>
          )}
        </div>
        {message && <p role="status">{message}</p>}
      </section>
    </>
  )
}
