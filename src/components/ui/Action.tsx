import type { ButtonHTMLAttributes } from 'react'
import { navigate } from '@/app/router'
import { useSession, type Stage } from '@/app/useSession'
import type { ScreenName } from '@/app/screens'
import { useWriting } from '@/components/WritingBoard/useWriting'

const stages: Record<string, Stage> = { 초보: 'beginner', 중수: 'mid', 고수: 'pro' }
const back: Partial<Record<ScreenName, ScreenName>> = {
  login: 'lang',
  experience: 'login',
  'stage-select': 'experience',
  'leveltest-1': 'stage-select',
  'leveltest-2': 'leveltest-1',
  'leveltest-3': 'leveltest-2',
  'leveltest-result': 'stage-select',
  'mode-select': 'stage-select',
  taste: 'mode-select',
  clip: 'home',
  settings: 'mypage',
  'jamo-digeut': 'dogam',
  'jamo-a': 'dogam',
  stroke: 'compare-beginner',
}
type Props = ButtonHTMLAttributes<HTMLButtonElement> & { kind: string; label: string }
export function Action({ kind, label, children, ...props }: Props) {
  const { screen, preferences: p, update, notify, reset } = useSession()
  const writing = useWriting()
  const learningStage: Stage = screen.endsWith('-beginner')
    ? 'beginner'
    : screen.endsWith('-mid')
      ? 'mid'
      : screen.endsWith('-pro')
        ? 'pro'
        : p.stage
  const displayedStage = learningStage
  const displayedMode =
    screen === 'home-basic'
      ? 'basic'
      : screen === 'home-drama'
        ? 'drama'
        : screen.startsWith('home')
          ? 'pop'
          : p.mode
  const stageLabel = Object.keys(stages).find((key) => stages[key] === displayedStage)!
  const selection =
    kind.startsWith('선택 카드/') || ['stage-item', 'seg-item', 'choice', 'mode'].includes(kind)
  let selected: boolean | undefined
  if (kind === 'stage-item' || (screen === 'stage-select' && selection))
    selected = label.startsWith(stageLabel)
  else if ((screen === 'lang' && selection) || kind === 'seg-item')
    selected = label.startsWith(p.language)
  else if (screen === 'experience' && selection) selected = label.startsWith(p.experience)
  else if (screen === 'taste' && selection) selected = label.startsWith(p.singer)
  else if ((screen === 'mode-select' && selection) || kind === 'mode')
    selected = label.includes(
      displayedMode === 'pop' ? 'K팝' : displayedMode === 'drama' ? 'K드라마' : '기본 연습',
    )
  else if (kind === 'check') selected = p.consent

  function go(to: ScreenName) {
    notify('')
    navigate(to)
  }
  function write(stage = learningStage) {
    go(`write-${stage}`)
  }
  function click() {
    if (kind === 'appbar-btn') {
      if (screen.startsWith('write-')) go('clip')
      else if (screen.startsWith('result-')) write()
      else if (screen.startsWith('compare-')) go(`result-${learningStage}`)
      else go(back[screen] ?? 'home')
      return
    }
    if (kind === 'tool') {
      writing.command(
        label.startsWith('한 획') ? 'undo' : label.startsWith('칸') ? 'cell' : 'clear',
      )
      return
    }
    if (kind === 'check') {
      update({ consent: !p.consent })
      return
    }
    if (kind === 'stage-item' || (screen === 'stage-select' && selection)) {
      const stage = stages[label.split(' ')[0]!]
      if (stage) {
        update({ stage })
        if (screen.startsWith('write-')) write(stage)
      }
      return
    }
    if ((screen === 'lang' && selection) || kind === 'seg-item') {
      update({ language: label.startsWith('English') ? 'English' : '한국어' })
      return
    }
    if (screen === 'experience' && selection) {
      update({ experience: label.startsWith('처음') ? '처음 배워요' : '공부해 봤어요' })
      return
    }
    if (screen === 'taste' && selection) {
      update({ singer: label.startsWith('루나틱') ? '루나틱' : '하늘별' })
      return
    }
    if (screen === 'mode-select' && selection) {
      update({
        mode: label.includes('K드라마') ? 'drama' : label.includes('기본 연습') ? 'basic' : 'pop',
      })
      return
    }
    if (kind === 'mode') {
      const mode = label.includes('K드라마')
        ? 'drama'
        : label.includes('기본 연습')
          ? 'basic'
          : 'pop'
      update({ mode })
      go(mode === 'pop' ? 'home' : mode === 'drama' ? 'home-drama' : 'home-basic')
      return
    }
    if (kind === 'tab') {
      go(
        label === '홈'
          ? p.mode === 'drama'
            ? 'home-drama'
            : p.mode === 'basic'
              ? 'home-basic'
              : 'home'
          : label === '자모 도감'
            ? 'dogam'
            : label === '쓰기 기록'
              ? 'records'
              : 'mypage',
      )
      return
    }
    if (kind === 'c-card') {
      go('clip')
      return
    }
    if (kind === 'stat') {
      go('mypage')
      return
    }
    if (kind === 'jamo') {
      const glyph = label.match(/동국체:\s*(\S+)/)?.[1]
      if (glyph === 'ㄷ' || glyph === 'ㅏ') go(glyph === 'ㄷ' ? 'jamo-digeut' : 'jamo-a')
      else
        notify(
          `${glyph ?? '이 자모'}의 상세 화면은 준비 중이에요. ㄷ과 ㅏ의 쓰는 순서를 볼 수 있어요.`,
        )
      return
    }
    if (kind === 'glyph-chip') {
      update({ stage: 'beginner' })
      write('beginner')
      return
    }
    if (kind === 'poster-play') {
      notify('디자인 미리보기예요. 실제 영상은 콘텐츠 API 연결 후 재생할 수 있어요.')
      return
    }
    if (kind === 'btn') {
      writing.command('replay')
      notify('정답을 처음부터 다시 보여 드려요.')
      return
    }
    if (kind === 'row') {
      if (label.includes('설정')) go('settings')
      else if (label.includes('가수 다시')) go('taste')
      else if (label.includes('테스트')) go('leveltest-1')
      else if (label.includes('내 정보'))
        notify(`동국 · ${p.code || 'SEJONG-07'} · 학습용 미리보기`)
      else if (screen === 'records' || screen.startsWith('jamo-'))
        go(label.includes('바다') ? 'result-beginner' : 'result-done')
      else write()
      return
    }
    if (label.includes('로그아웃')) {
      reset()
      go('lang')
      return
    }
    if (label.includes('테스트 해')) {
      go('leveltest-1')
      return
    }
    if (label.includes('순서만 크게')) {
      go('stroke')
      return
    }
    if (label === '직접 고르기') {
      go('stage-select')
      return
    }
    if (label === '정답 보기') {
      go(`compare-${learningStage}`)
      return
    }
    if (label.includes('다시 쓰기')) {
      write(screen === 'stroke' ? 'beginner' : learningStage)
      return
    }
    if (label === '내 킹세종 보기') {
      go('mypage')
      return
    }
    if (label === '홈으로') {
      go(screen === 'levelup' ? 'home-lv2' : 'home')
      return
    }
    if (label === '다음 글 쓰기' || label === '다음으로') {
      write()
      return
    }
    if (screen.startsWith('jamo-')) {
      update({ stage: 'beginner' })
      write('beginner')
      return
    }
    switch (screen) {
      case 'lang':
        go('login')
        break
      case 'login':
        if (!/^[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*$/.test(p.code.trim())) {
          notify('선생님께 받은 로그인 코드를 입력해 주세요.')
          break
        }
        go('experience')
        break
      case 'experience':
        if (p.experience === '처음 배워요') {
          update({ stage: 'beginner' })
          go('mode-select')
        } else go('stage-select')
        break
      case 'stage-select':
        go('mode-select')
        break
      case 'leveltest-1':
        go('leveltest-2')
        break
      case 'leveltest-2':
        go('leveltest-3')
        break
      case 'leveltest-3':
        go('leveltest-result')
        break
      case 'leveltest-result':
        update({ stage: 'mid' })
        go('mode-select')
        break
      case 'mode-select':
        go(p.mode === 'pop' ? 'taste' : p.mode === 'drama' ? 'home-drama' : 'home-basic')
        break
      case 'taste':
        go('home')
        break
      case 'clip':
        write()
        break
      case 'write-beginner':
        update({ stage: 'beginner' })
        go('result-beginner')
        break
      case 'write-mid':
        update({ stage: 'mid' })
        go('result-mid')
        break
      case 'write-pro':
        update({ stage: 'pro' })
        go('result-pro')
        break
      default:
        break
    }
  }
  return (
    <button
      {...props}
      type="button"
      data-action={kind}
      data-selected={selected}
      aria-pressed={selected}
      aria-label={
        kind === 'appbar-btn' ? '이전 화면' : kind === 'check' ? '쓴 글씨 저장 동의' : label
      }
      onClick={click}
    >
      {children}
    </button>
  )
}
