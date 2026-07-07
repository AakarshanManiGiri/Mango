import { useState, useEffect } from 'react';
import { getChapter } from '../api/mangahook';
import { MangaHookChapterResponse } from '../types/mangahook';

const useMangaChapter = (mangaId: string, chapterId: string) => {
  const [data, setData] = useState<MangaHookChapterResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!mangaId || !chapterId) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getChapter(mangaId, chapterId);
        setData(res);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [mangaId, chapterId]);

  return data;
};

export default useMangaChapter;
