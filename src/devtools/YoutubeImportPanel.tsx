import { useState } from 'react'
import styles from './YoutubeImportPanel.module.css'

// 개발용: 유튜브 영상 + 한국어 자막으로 학습 콘텐츠 만들기 (서버 관리자 API, X-Admin-Key).
// 만든 콘텐츠는 일반 콘텐츠와 같아서 온보딩 취향 고르기 → 홈 목록 → 쓰기에 그대로 나온다.

type Stage = 'beginner' | 'intermediate' | 'advanced'
const stages: Stage[] = ['beginner', 'intermediate', 'advanced']
const stageNames: Record<Stage, string> = {
  beginner: '초보',
  intermediate: '중수',
  advanced: '고수',
}

type Line = { startSec: number; endSec: number; text: string }
type Preview = {
  videoId: string
  title: string
  channel: string | null
  thumbnailUrl: string | null
  embeddable: boolean
  lengthSec: number | null
  captionKind: 'manual' | 'asr' | null
  lines: Line[]
  suggestion: { startSec: number; endSec: number; targets: Partial<Record<Stage, string>> } | null
}
type Imported = {
  contentId: number | null
  seedKey: string
  dryRun: boolean
  mode: string
  title: string
  source: string
  startSec: number
  endSec: number
  embeddable: boolean
  lines: { text: string; startSec: number; endSec: number }[]
  tasks: Record<Stage, { target: string; meaning: string | null; source: string }>
  taste: { id: number | null; name: string; created: boolean }
}

const baseUrl = (import.meta.env.VITE_API_BASE_URL?.trim() || 'http://localhost:8080').replace(
  /\/+$/,
  '',
)
const keyStorage = 'kingsejong.adminKey'

function storedKey() {
  try {
    return localStorage.getItem(keyStorage) ?? import.meta.env.VITE_ADMIN_KEY ?? ''
  } catch {
    return import.meta.env.VITE_ADMIN_KEY ?? ''
  }
}

async function admin<T>(key: string, path: string, method: 'POST' | 'DELETE', body?: unknown) {
  const response = await fetch(`${baseUrl}/api/v1/admin${path}`, {
    method,
    headers: {
      Accept: 'application/json',
      'X-Admin-Key': key,
      ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
    },
    ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    signal: AbortSignal.timeout(60000),
  })
  if (response.status === 204) return undefined as T
  const value = (await response.json().catch(() => ({}))) as {
    message?: string
    details?: { field?: string; message?: string }[]
  }
  if (!response.ok) {
    const details = (value.details ?? []).map((d) => `${d.field ?? ''}: ${d.message ?? ''}`)
    throw new Error([`${response.status} ${value.message ?? '요청 실패'}`, ...details].join('\n'))
  }
  return value as T
}

function time(sec: number) {
  const m = Math.floor(sec / 60)
  const s = (sec % 60).toFixed(1).padStart(4, '0')
  return `${m}:${s}`
}

export function YoutubeImportPanel() {
  const [key, setKey] = useState(storedKey)
  const [url, setUrl] = useState('')
  const [mode, setMode] = useState<'kpop' | 'kdrama'>('kpop')
  const [taste, setTaste] = useState('')
  const [preview, setPreview] = useState<Preview | null>(null)
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [targets, setTargets] = useState<Record<Stage, string>>({
    beginner: '',
    intermediate: '',
    advanced: '',
  })
  const [meaning, setMeaning] = useState('')
  const [result, setResult] = useState<Imported | null>(null)
  const [done, setDone] = useState<Imported[]>([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  function saveKey(value: string) {
    setKey(value)
    try {
      localStorage.setItem(keyStorage, value)
    } catch {
      /* 저장이 안 되면 이번 화면에서만 쓴다 */
    }
  }

  async function run<T>(work: () => Promise<T>) {
    setBusy(true)
    setError('')
    try {
      return await work()
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e))
      return undefined
    } finally {
      setBusy(false)
    }
  }

  async function loadPreview() {
    const value = await run(() => admin<Preview>(key, '/youtube/preview', 'POST', { url }))
    if (!value) return
    setPreview(value)
    setResult(null)
    setStart(value.suggestion ? String(value.suggestion.startSec) : '')
    setEnd(value.suggestion ? String(value.suggestion.endSec) : '')
    setTargets({
      beginner: value.suggestion?.targets.beginner ?? '',
      intermediate: value.suggestion?.targets.intermediate ?? '',
      advanced: value.suggestion?.targets.advanced ?? '',
    })
    setMeaning('')
    if (!taste && value.channel)
      setTaste(value.channel.replace(/\s*(official|labels?)\b.*$/i, '').trim())
  }

  async function create(dryRun: boolean) {
    const tasks = Object.fromEntries(
      stages
        .filter((stage) => targets[stage].trim())
        .map((stage) => [
          stage,
          {
            target: targets[stage].trim(),
            ...(stage === 'beginner' && meaning.trim() ? { meaning: meaning.trim() } : {}),
          },
        ]),
    )
    const value = await run(() =>
      admin<Imported>(key, '/contents/youtube', 'POST', {
        url,
        mode,
        taste,
        ...(start && end ? { startSec: Number(start), endSec: Number(end) } : {}),
        tasks,
        dryRun,
      }),
    )
    if (!value) return
    setResult(value)
    if (!dryRun)
      setDone((list) => [value, ...list.filter((item) => item.contentId !== value.contentId)])
  }

  async function hide(item: Imported) {
    if (item.contentId == null) return
    const ok = await run(() =>
      admin<void>(key, `/contents/${item.contentId}`, 'DELETE').then(() => true),
    )
    if (ok) setDone((list) => list.filter((entry) => entry.contentId !== item.contentId))
  }

  function pickLine(line: Line) {
    const s = Math.max(0, Math.floor(line.startSec - 1))
    setStart(String(s))
    setEnd(String(Math.min(s + 30, Math.ceil(line.endSec + 1))))
  }

  const s = Number(start)
  const e = Number(end)
  return (
    <div className={styles.body}>
      <h1>유튜브로 학습 콘텐츠 만들기 (개발용)</h1>
      <p className={styles.muted}>
        서버 {baseUrl} 의 관리자 API를 부릅니다. 만든 뒤 앱 처음 화면부터 들어가서 취향 고르기에서
        이 가수·작품을 고르면 홈 목록 맨 앞에 나와요. 자막은 비공식 방법으로 가져와서 영상에 따라 안
        될 수 있어요.
      </p>

      <section className={styles.card}>
        <div className={styles.row}>
          <label>
            관리자 키 (X-Admin-Key)
            <input type="password" value={key} onChange={(event) => saveKey(event.target.value)} />
          </label>
        </div>
        <div className={styles.row}>
          <label className={styles.wide}>
            유튜브 주소
            <input
              value={url}
              placeholder="https://www.youtube.com/watch?v=..."
              onChange={(event) => setUrl(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && url && key) void loadPreview()
              }}
            />
          </label>
          <button
            className={styles.button}
            disabled={busy || !url || !key}
            onClick={() => void loadPreview()}
          >
            자막 불러오기
          </button>
        </div>
        {error && (
          <p role="alert" className={styles.error}>
            {error}
          </p>
        )}
      </section>

      {preview && (
        <section className={styles.card}>
          <div className={styles.video}>
            {preview.thumbnailUrl && <img src={preview.thumbnailUrl} alt="" />}
            <div>
              <h2>{preview.title}</h2>
              <p className={styles.muted}>
                {preview.channel} · {preview.lengthSec ?? '?'}초 · 퍼가기{' '}
                {preview.embeddable ? '가능' : '불가 (문장만)'} · 자막{' '}
                {preview.captionKind === 'manual'
                  ? '사람이 단 자막'
                  : preview.captionKind === 'asr'
                    ? '자동 자막'
                    : '없음'}{' '}
                {preview.lines.length}줄
              </p>
            </div>
          </div>
          {preview.lines.length > 0 && (
            <>
              <p className={styles.muted}>
                줄을 누르면 그 줄부터 재생 구간을 잡아요 (최대 30초). 초록 줄이 지금 구간이에요.
              </p>
              <div className={styles.lines}>
                {preview.lines.map((line, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`${styles.line} ${line.startSec >= s && line.endSec <= e ? styles.inWindow : ''}`}
                    onClick={() => pickLine(line)}
                  >
                    <span className={styles.time}>{time(line.startSec)}</span>
                    <span>{line.text}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          <div className={styles.row}>
            <label>
              모드
              <select
                value={mode}
                onChange={(event) => setMode(event.target.value as 'kpop' | 'kdrama')}
              >
                <option value="kpop">K팝</option>
                <option value="kdrama">K드라마</option>
              </select>
            </label>
            <label>
              {mode === 'kpop' ? '가수 (취향 카드 이름)' : '작품 (취향 카드 이름)'}
              <input value={taste} onChange={(event) => setTaste(event.target.value)} />
            </label>
            <label>
              시작 초
              <input
                value={start}
                inputMode="decimal"
                onChange={(event) => setStart(event.target.value)}
              />
            </label>
            <label>
              끝 초
              <input
                value={end}
                inputMode="decimal"
                onChange={(event) => setEnd(event.target.value)}
              />
            </label>
          </div>
          <div className={styles.row}>
            {stages.map((stage) => (
              <label key={stage}>
                {stageNames[stage]} 쓸 글
                <input
                  value={targets[stage]}
                  placeholder="비우면 자막에서 추천"
                  onChange={(event) =>
                    setTargets((current) => ({ ...current, [stage]: event.target.value }))
                  }
                />
              </label>
            ))}
            <label>
              초보 뜻 (영어)
              <input value={meaning} onChange={(event) => setMeaning(event.target.value)} />
            </label>
          </div>
          <p className={styles.muted}>
            규칙: 초보 띄어쓰기 없는 단어, 중수 3어절 이하, 고수 20칸 이하. 안 맞으면 서버가 422로
            알려 줘요.
          </p>
          <div className={styles.row}>
            <button
              className={`${styles.button} ${styles.secondary}`}
              disabled={busy || !taste}
              onClick={() => void create(true)}
            >
              미리 만들어 보기 (저장 안 함)
            </button>
            <button
              className={styles.button}
              disabled={busy || !taste}
              onClick={() => void create(false)}
            >
              콘텐츠 만들기
            </button>
          </div>
        </section>
      )}

      {result && (
        <section className={styles.card}>
          <h2>
            {result.dryRun
              ? '미리 보기 결과 (저장 안 됨)'
              : `만들었어요 · 콘텐츠 ${result.contentId}`}
          </h2>
          <p>
            {result.title} · {result.source} · {time(result.startSec)}~{time(result.endSec)} · 취향
            “{result.taste.name}”{result.taste.created ? ' (새로 만듦)' : ' (있던 취향)'}
          </p>
          <ul>
            {stages.map((stage) => (
              <li key={stage}>
                {stageNames[stage]}: <b>{result.tasks[stage].target}</b>
                {result.tasks[stage].meaning ? ` (${result.tasks[stage].meaning})` : ''}{' '}
                <span className={styles.muted}>
                  {result.tasks[stage].source === 'request' ? '직접 넣음' : '자막에서 추천'}
                </span>
              </li>
            ))}
          </ul>
          <p className={styles.muted}>자막 {result.lines.length}줄이 같이 저장돼요.</p>
        </section>
      )}

      {done.length > 0 && (
        <section className={styles.card}>
          <h2>이번에 만든 콘텐츠</h2>
          <ul className={styles.done}>
            {done.map((item) => (
              <li key={item.contentId}>
                <span>
                  #{item.contentId} {item.mode === 'kpop' ? 'K팝' : 'K드라마'} · {item.taste.name} ·{' '}
                  {item.title}
                </span>
                <button
                  className={`${styles.button} ${styles.secondary}`}
                  disabled={busy}
                  onClick={() => void hide(item)}
                >
                  목록에서 내리기
                </button>
              </li>
            ))}
          </ul>
          <p className={styles.muted}>
            확인: <a href="/">앱 처음 화면</a>에서 로그인 → 모드 K팝/K드라마 → 취향에서 위 이름
            고르기 → 홈 맨 앞 콘텐츠.
          </p>
        </section>
      )}
    </div>
  )
}
