import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar, MangaCard } from '@/components';
import useMangaList from '@/hooks/useMangaList';
import { getAllHistory, ReadingHistory } from '@/lib/db';

export const HomePage: React.FC = () => {
  const [history, setHistory] = useState<ReadingHistory[]>([]);
  const navigate = useNavigate();

  const mangaListData = useMangaList('?page=1&type=newest');
  const manga = mangaListData?.mangaList || [];
  // Use a heuristic loading state based on history load + manga list data
  const [historyLoaded, setHistoryLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      const hist = await getAllHistory();
      setHistory(hist);
      setHistoryLoaded(true);
    };
    load();
  }, []);

  const loading = !historyLoaded || !mangaListData;

  const handleSearch = (query: string) => navigate(`/search?q=${encodeURIComponent(query)}`);
  const handleMangaClick = (mangaId: string) => navigate(`/manga/${mangaId}`);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 tracking-tight">Mango</h1>
        <div className="mb-12">
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>

        {history.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-zinc-100">Continue Reading</h2>
            <div 
              className="bg-[#18181b] border border-[#27272a] rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-zinc-800 transition" 
              onClick={() => navigate(`/read/${history[0].mangaId}/${history[0].chapterId}`)}
            >
              <div>
                <p className="font-medium text-lg">Resume Chapter</p>
                <p className="text-sm text-zinc-400">Page {history[0].page + 1}</p>
              </div>
              <button className="px-4 py-2 bg-white text-black font-medium rounded-lg">Resume</button>
            </div>
          </section>
        )}

        <section>
          <h2 className="text-2xl font-semibold mb-6 text-zinc-100">Latest Updates</h2>
          {loading && <div className="text-zinc-500 py-12">Loading manga...</div>}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {manga.map((m) => (
              <MangaCard key={m.id} manga={m} onClick={handleMangaClick} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
