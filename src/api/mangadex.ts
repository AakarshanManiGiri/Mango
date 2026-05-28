import axios from 'axios';
import { Manga, Chapter, ChapterPages, ApiResponse } from '@/types/mangadex';

const API_BASE = 'https://api.mangadex.org';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'User-Agent': 'Mango/1.0.0 (https://github.com/AakarshanManiGiri/Mango)',
  },
});

export const searchManga = async (
  title: string,
  limit: number = 10,
  offset: number = 0
): Promise<ApiResponse<Manga>> => {
  try {
    const response = await api.get<ApiResponse<Manga>>('/manga', {
      params: {
        title,
        limit,
        offset,
        'includes[]': ['cover_art', 'author', 'artist'],
        order: { relevance: 'desc' },
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching manga:', error);
    throw error;
  }
};

export const getMangaById = async (mangaId: string): Promise<Manga> => {
  try {
    const response = await api.get<ApiResponse<Manga>>(`/manga/${mangaId}`, {
      params: {
        'includes[]': ['cover_art', 'author', 'artist'],
      },
    });
    const data = Array.isArray(response.data.data)
      ? response.data.data[0]
      : response.data.data;
    return data;
  } catch (error) {
    console.error('Error fetching manga:', error);
    throw error;
  }
};

export const getChapters = async (
  mangaId: string,
  limit: number = 20,
  offset: number = 0
): Promise<ApiResponse<Chapter>> => {
  try {
    const response = await api.get<ApiResponse<Chapter>>(
      `/manga/${mangaId}/feed`,
      {
        params: {
          limit,
          offset,
          'order[chapter]': 'desc',
          translatedLanguage: ['en'],
          'includes[]': ['scanlation_group'],
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching chapters:', error);
    throw error;
  }
};

export const getChapterPages = async (chapterId: string): Promise<ChapterPages> => {
  try {
    const response = await api.get<ChapterPages>(`/at/home/server/${chapterId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching chapter pages:', error);
    throw error;
  }
};

export const getChapterImageUrl = (
  chapterHash: string,
  imageName: string
): string => {
  return `https://uploads.mangadex.org/data/${chapterHash}/${imageName}`;
};

export const getMangaFeed = async (
  limit: number = 20,
  offset: number = 0
): Promise<ApiResponse<Chapter>> => {
  try {
    const response = await api.get<ApiResponse<Chapter>>('/chapter', {
      params: {
        limit,
        offset,
        'order[updatedAt]': 'desc',
        translatedLanguage: ['en'],
        'includes[]': ['manga', 'scanlation_group'],
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching feed:', error);
    throw error;
  }
};
