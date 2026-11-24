import { useEffect, useMemo, useState } from 'react'
import { backend, jamoRecordScope, studyApi } from '@/api/integration'
import { useSession } from '@/app/useSession'
import {
  jamoAttempt,
  readJamoAttempts,
  summarizeJamoMastery,
  type JamoPractice,
} from '@/data/jamoMastery'
import { useLearningStats } from './useLearningStats'
import type { WritingRecord } from '@/data/writingRecords'

export function useJamoMastery() {
  const { accountId } = useSession()
  const scope = jamoRecordScope(accountId)
  const { records } = useLearningStats(!backend)
  const [device, setDevice] = useState<{ scope: string; attempts: JamoPractice[] }>()

  useEffect(() => {
    if (!scope || studyApi) return
    let active = true
    const load = () => {
      if (active) setDevice({ scope, attempts: readJamoAttempts(scope) })
    }
    queueMicrotask(load)
    window.addEventListener('storage', load)
    return () => {
      active = false
      window.removeEventListener('storage', load)
    }
  }, [scope])

  const practices = useMemo<(JamoPractice & { record?: WritingRecord })[]>(
    () =>
      backend
        ? device && device.scope === scope
          ? device.attempts
          : []
        : (records ?? []).map((record) => ({
            outcomes: jamoAttempt(record),
            target: record.target,
            createdAt: record.createdAt,
            record,
          })),
    [device, records, scope],
  )
  const mastery = useMemo(
    () => summarizeJamoMastery(practices.map((practice) => practice.outcomes)),
    [practices],
  )
  return { mastery, practices }
}
