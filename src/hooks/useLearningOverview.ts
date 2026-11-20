import { backend } from '@/api/integration'
import { useSession } from '@/app/useSession'
import { levels } from '@/data/levels'
import { useLearningStats } from './useLearningStats'
import { useProfile } from './useStudy'

const demoLevels = levels.map((level, index) => ({
  no: index + 1,
  name: level.name,
  minExp: level.exp,
}))

export function useLearningOverview() {
  const { preferences } = useSession()
  const local = useLearningStats()
  const profile = useProfile()
  const me = profile.data
  const sample = demoLevels.findLast((level) => preferences.exp >= level.minExp)!
  const userLevel = backend
    ? me?.level
    : {
        no: sample.no,
        name: sample.name,
        exp: preferences.exp,
        nextLevelExp: demoLevels.find((level) => level.minExp > preferences.exp)?.minExp ?? null,
      }
  const collection = backend ? (me?.levels ?? []) : demoLevels
  return {
    ...profile,
    userLevel,
    collection,
    nextLevel: collection.find((level) => level.minExp === userLevel?.nextLevelExp),
    image: levels[(userLevel?.no ?? 1) - 1]?.image ?? levels[0].image,
    name: backend ? me?.name : '동국',
    streak: backend ? me?.streakDays : local.records ? local.streak : undefined,
    today: backend ? me?.today : { done: local.count, goal: 3 },
    records: local.records,
  }
}
