import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { SearchBar, MangaCard } from '@/components';
import useMangaSearch from '@/hooks/useMangaSearch';

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const navigate = useNavigate();

  const searchData = useMangaSearch(query);
  const loading = query !== '' && !searchData;
  const manga = searchData?.mangaList || [];

  const handleSearch = (q: string) => navigate(`/search?q=${encodeURIComponent(q)}`);
  const handleMangaClick = (mangaId: string) => navigate(`/manga/${mangaId}`);

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 tracking-tight">Search Results</h1>
        <div className="mb-12">
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>

        {loading ? (
          <div className="text-zinc-500 py-12">Searching...</div>
        ) : manga.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {manga.map((m) => (
              <MangaCard key={m.id} manga={m} onClick={handleMangaClick} />
            ))}
          </div>
        ) : (
          <div className="text-zinc-500 py-12">No results found for "{query}".</div>
        )}
      </div>
    </div>
  );
};
