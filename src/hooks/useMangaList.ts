import { useState, useEffect } from 'react';
import { getMangaList } from '../api/mangahook';
import { MangaHookListResponse } from '../types/mangahook';

const useMangaList = (params: string = '') => {
  const [data, setData] = useState<MangaHookListResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getMangaList(params);
        setData(res);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params]);

  return data;
};

export default useMangaList;
