import { createBackend } from './backend'
import { createStudyApi } from './study'

const baseUrl = import.meta.env.VITE_API_BASE_URL?.trim()
export const backend = baseUrl ? createBackend(baseUrl) : null
export const studyApi = baseUrl ? createStudyApi(baseUrl) : null
export const demoMode =
  !backend &&
  (import.meta.env.VITE_API_MOCK === 'true' ||
    (import.meta.env.DEV && !import.meta.env.VITE_GRADING_ENDPOINT))
