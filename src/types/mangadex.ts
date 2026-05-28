// Mangadex API response types

export interface MangaAttributes {
  title: Record<string, string>;
  description: Record<string, string>;
  status: 'ongoing' | 'completed' | 'hiatus' | 'cancelled';
  year: number | null;
  contentRating: 'safe' | 'suggestive' | 'erotica' | 'pornographic';
  tags: { id: string; attributes: { name: Record<string, string> } }[];
  coverArt?: { id: string; attributes: { fileName: string } };
}

export interface Manga {
  id: string;
  type: string;
  attributes: MangaAttributes;
  relationships: { id: string; type: string; attributes?: any }[];
}

export interface ChapterAttributes {
  title: string | null;
  volume: string | null;
  chapter: string | null;
  translatedLanguage: string;
  publishAt: string;
  readableAt: string;
  updatedAt: string;
}

export interface Chapter {
  id: string;
  type: string;
  attributes: ChapterAttributes;
  relationships: { id: string; type: string; attributes?: any }[];
}

export interface ChapterPages {
  chapter: {
    hash: string;
    data: string[];
    dataSaver: string[];
  };
}

export interface ApiResponse<T> {
  result: 'ok' | 'error';
  data: T | T[];
  limit?: number;
  offset?: number;
  total?: number;
}
