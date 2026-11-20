import type { Mode, Stage } from './session'
import type { ScreenName } from './routes/screens'

export function homeScreen(mode: Mode): ScreenName {
  return mode === 'drama' ? 'home-drama' : mode === 'basic' ? 'home-basic' : 'home'
}
export function learningBack(
  screen: ScreenName,
  options: {
    mode: Mode
    stage: Stage
    practiceTarget: string | null
    resultOrigin: 'records' | 'jamo-digeut' | 'jamo-a' | null
  },
): ScreenName | null {
  if (screen === 'clip' || screen.startsWith('write-'))
    return options.practiceTarget ? 'dogam' : homeScreen(options.mode)
  if (screen.startsWith('result-'))
    return options.resultOrigin ?? (options.practiceTarget ? 'dogam' : homeScreen(options.mode))
  if (screen.startsWith('compare-')) return `result-${options.stage}`
  if (screen === 'stroke' || screen === 'shape') return `compare-${options.stage}`
  return null
}
