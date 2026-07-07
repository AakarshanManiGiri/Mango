import { 
  MangaHookListResponse, 
  MangaHookDetailResponse, 
  MangaHookChapterResponse 
} from '../types/mangahook';

const API_BASE = 'http://localhost:3000/api';

export const getMangaList = async (params: string = ''): Promise<MangaHookListResponse> => {
  const response = await fetch(`${API_BASE}/mangaList${params}`);
  if (!response.ok) throw new Error('Failed to fetch manga list');
  return response.json();
};

export const searchManga = async (query: string, params: string = ''): Promise<MangaHookListResponse> => {
  const response = await fetch(`${API_BASE}/search/${query}${params}`);
  if (!response.ok) throw new Error('Failed to search manga');
  return response.json();
};

export const getMangaById = async (id: string): Promise<MangaHookDetailResponse> => {
  const response = await fetch(`${API_BASE}/manga/${id}`);
  if (!response.ok) throw new Error('Failed to fetch manga details');
  return response.json();
};

export const getChapter = async (mangaId: string, chapterId: string): Promise<MangaHookChapterResponse> => {
  const response = await fetch(`${API_BASE}/manga/${mangaId}/${chapterId}`);
  if (!response.ok) throw new Error('Failed to fetch chapter');
  return response.json();
};
