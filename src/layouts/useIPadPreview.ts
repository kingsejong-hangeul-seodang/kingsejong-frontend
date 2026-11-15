import { useSyncExternalStore } from 'react'

function subscribe(listener: () => void) {
  window.addEventListener('resize', listener)
  return () => window.removeEventListener('resize', listener)
}
function viewport() {
  return `${window.innerWidth},${window.innerHeight}`
}

export function useIPadPreview() {
  const dimensions = useSyncExternalStore(subscribe, viewport, () => '820,1180')
  const [width = 820, height = 1180] = dimensions.split(',').map(Number)
  return {
    enabled:
      width >= 600 &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
      new URLSearchParams(window.location.search).get('preview') !== 'ipad',
    scale: Math.min(1, (width - 64) / 844, (height - 48) / 1204),
  }
}
