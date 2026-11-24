import { useEffect, useState } from 'react'
import { listRecords, type WritingRecord } from '../data/writingRecords'

export function learningStats(records: WritingRecord[], now = new Date()) {
  const dateKey = (date: Date) => date.toLocaleDateString('sv-SE')
  const today = dateKey(now)
  const days = new Set(records.map((record) => dateKey(new Date(record.createdAt))))
  const day = new Date(now)
  let streak = 0
  if (!days.has(dateKey(day))) day.setDate(day.getDate() - 1)
  while (days.has(dateKey(day))) {
    streak++
    day.setDate(day.getDate() - 1)
  }
  return {
    count: records.filter((record) => dateKey(new Date(record.createdAt)) === today).length,
    streak,
  }
}
export function useLearningStats(enabled = true) {
  const [records, setRecords] = useState<WritingRecord[] | null>(null)
  useEffect(() => {
    if (!enabled) return
    let active = true
    listRecords()
      .then((value) => {
        if (active) setRecords(value)
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [enabled])
  return { records, ...learningStats(records ?? []) }
}
