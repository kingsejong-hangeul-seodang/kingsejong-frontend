import { createBackend } from './backend'
import { createStudyApi } from './study'

const baseUrl = import.meta.env.VITE_API_BASE_URL?.trim()
export const backend = baseUrl ? createBackend(baseUrl) : null
export function jamoRecordScope(accountId: number | null) {
  return baseUrl && accountId !== null ? `${baseUrl.replace(/\/+$/, '')}:${accountId}` : null
}
export const serverStudyApi = baseUrl ? createStudyApi(baseUrl) : null
export const writingHistoryApi = serverStudyApi
export const studyApi = import.meta.env.VITE_API_STUDY === 'false' ? null : serverStudyApi
export const demoMode =
  !backend &&
  (import.meta.env.VITE_API_MOCK === 'true' ||
    (import.meta.env.DEV && !import.meta.env.VITE_GRADING_ENDPOINT))
export const skipCodeLogin = !backend && !demoMode
