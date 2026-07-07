import { useState, useEffect } from 'react';
import { getMangaById } from '../api/mangahook';
import { MangaHookDetailResponse } from '../types/mangahook';

const useManga = (id: string) => {
  const [data, setData] = useState<MangaHookDetailResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getMangaById(id);
        setData(res);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return data;
};

export default useManga;
