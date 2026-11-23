import type { ContentDetail, ContentItem, Profile } from './backend'
import type {
  JamoDetail,
  JamoList,
  LevelTestStep,
  StrokeReference,
  TasteItem,
  WritingPage,
} from './study'

export function createCatalogCache() {
  return {
    lists: new Map<string, Promise<ContentItem[]>>(),
    details: new Map<string, Promise<ContentDetail>>(),
    profiles: new Map<string, Promise<Profile>>(),
    jamoLists: new Map<string, Promise<JamoList>>(),
    jamoDetails: new Map<string, Promise<JamoDetail>>(),
    writings: new Map<string, Promise<WritingPage>>(),
    strokes: new Map<string, Promise<StrokeReference>>(),
    tastes: new Map<string, Promise<TasteItem[]>>(),
    levelTests: new Map<string, Promise<LevelTestStep[]>>(),
  }
}

export type CatalogCache = ReturnType<typeof createCatalogCache>
