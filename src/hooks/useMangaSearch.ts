import { useState, useEffect } from 'react';
import { searchManga } from '../api/mangahook';
import { MangaHookListResponse } from '../types/mangahook';

const useMangaSearch = (searchQuery: string, params: string = '') => {
  const [data, setData] = useState<MangaHookListResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!searchQuery) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await searchManga(searchQuery, params);
        setData(res);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchQuery, params]);

  return data;
};

export default useMangaSearch;
