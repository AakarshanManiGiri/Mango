import { get, set, update } from 'idb-keyval';

export interface ReadingHistory {
  mangaId: string;
  chapterId: string;
  page: number;
  timestamp: number;
}

export const saveHistory = async (mangaId: string, chapterId: string, page: number) => {
  await update('mango-history', (val) => {
    const history = (val as Record<string, ReadingHistory>) || {};
    history[mangaId] = { mangaId, chapterId, page, timestamp: Date.now() };
    return history;
  });
};

export const getHistory = async (mangaId: string): Promise<ReadingHistory | null> => {
  const history = await get<Record<string, ReadingHistory>>('mango-history');
  return history ? history[mangaId] || null : null;
};

export const getAllHistory = async (): Promise<ReadingHistory[]> => {
  const history = await get<Record<string, ReadingHistory>>('mango-history');
  return history ? Object.values(history).sort((a, b) => b.timestamp - a.timestamp) : [];
};
