import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { SearchBar, MangaCard } from '@/components';
import { searchManga } from '@/api/mangadex';
import { Manga } from '@/types/mangadex';

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [manga, setManga] = useState<Manga[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await searchManga(searchQuery, 20);
      const data = Array.isArray(response.data) ? response.data : [response.data];
      setManga(data);
    } catch (err) {
      setError('Failed to search manga');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (newQuery: string) => {
    navigate(`/search?q=${encodeURIComponent(newQuery)}`);
  };

  const handleMangaClick = (mangaId: string) => {
    navigate(`/manga/${mangaId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="mb-4 text-blue-400 hover:text-blue-300"
          >
              Back to Home
          </button>
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>

        {query && (
          <h2 className="text-2xl font-bold mb-6">
            Results for "{query}"
          </h2>
        )}

        {loading && (
          <div className="flex justify-center py-12">
            <p className="text-gray-400">Searching...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-900 text-red-100 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {!loading && manga.length === 0 && query && (
          <div className="text-center py-12">
            <p className="text-gray-400">No manga found for "{query}"</p>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {manga.map((m) => (
            <MangaCard
              key={m.id}
              manga={m}
              onClick={handleMangaClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
