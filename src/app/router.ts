import { useSyncExternalStore } from 'react'
import { screens, type ScreenName } from './routes/screens'

export function isScreen(value: string): value is ScreenName {
  return Object.hasOwn(screens, value)
}
function currentScreen(): ScreenName {
  const route = window.location.hash.replace(/^#\/?/, '')
  return isScreen(route) ? route : 'lang'
}
function subscribe(listener: () => void) {
  window.addEventListener('hashchange', listener)
  return () => window.removeEventListener('hashchange', listener)
}
export function useScreen() {
  return useSyncExternalStore(subscribe, currentScreen, () => 'lang' as const)
}
export function navigate(screen: ScreenName) {
  window.location.hash = `/${screen}`
}
export function replaceScreen(screen: ScreenName) {
  window.location.replace(`#/${screen}`)
}
