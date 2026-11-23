import { useEffect } from 'react'
import { replaceScreen } from '@/app/router'
import { useSession } from '@/app/useSession'

// Old bookmarks still open the selected exercise.
export default function Clip() {
  const { preferences } = useSession()
  useEffect(() => replaceScreen(`write-${preferences.stage}`), [preferences.stage])
  return null
}
