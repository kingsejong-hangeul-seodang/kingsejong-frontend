import type { WritingDraft } from '@/data/writingTypes'
export type WritingRecord = WritingDraft & { id: string; createdAt: string }
const STORE = 'writing'
function database(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('hangeul-local', 1)
    request.onupgradeneeded = () => request.result.createObjectStore(STORE, { keyPath: 'id' })
    request.onerror = () => reject(request.error)
    request.onblocked = () => reject(new Error('다른 탭을 닫고 다시 시도해 주세요.'))
    request.onsuccess = () => resolve(request.result)
  })
}
async function transact<T>(
  mode: IDBTransactionMode,
  operation: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  const db = await database()
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE, mode)
    const request = operation(transaction.objectStore(STORE))
    transaction.oncomplete = () => {
      db.close()
      resolve(request.result)
    }
    transaction.onabort = transaction.onerror = () => {
      db.close()
      reject(transaction.error ?? request.error)
    }
  })
}
export async function listRecords(): Promise<WritingRecord[]> {
  const records = await transact<WritingRecord[]>('readonly', (store) => store.getAll())
  return records.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}
export async function addRecord(draft: WritingDraft) {
  const record: WritingRecord = {
    ...draft,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    cells: draft.cells.map((cell) => ({ ...cell, image: '' })),
  }
  await transact('readwrite', (store) => store.put(record))
  const records = await listRecords()
  for (const old of records.slice(100)) await deleteRecord(old.id)
  return record
}
export async function deleteRecord(id: string) {
  await transact('readwrite', (store) => store.delete(id))
}
