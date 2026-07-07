export interface MangaHookListItem {
  id: string;
  image: string;
  title: string;
  chapter: string;
  view: string;
  description: string;
}

export interface MangaHookListResponse {
  mangaList: MangaHookListItem[];
  metaData: any;
}

export interface MangaHookDetailChapter {
  id: string;
  name: string;
  view: string;
}

export interface MangaHookDetailResponse {
  imageUrl: string;
  name: string;
  author: string;
  status: string;
  updated: string;
  view: string;
  genres: string[];
  chapterList: MangaHookDetailChapter[];
}

export interface MangaHookChapterImage {
  title: string;
  image: string;
}

export interface MangaHookChapterResponse {
  title: string;
  currentChapter: string;
  chapterListIds: { id: string, name: string }[];
  images: MangaHookChapterImage[];
}
