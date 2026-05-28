import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar, MangaCard } from '@/components';
import { getMangaFeed } from '@/api/mangadex';
import { Manga } from '@/types/mangadex';

export const HomePage: React.FC = () => {
  const [manga, setManga] = useState<Manga[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadLatestManga();
  }, []);

  const loadLatestManga = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getMangaFeed(20);
      const data = Array.isArray(response.data) ? response.data : [response.data];
      const uniqueManga = Array.from(
        new Map(
          data
            .filter((chapter) => chapter.relationships.some((r) => r.type === 'manga'))
            .map((chapter) => {
              const mangaRelation = chapter.relationships.find((r) => r.type === 'manga');
              return [mangaRelation?.id, mangaRelation];
            })
            .filter(([, m]) => m)
        ).values()
      ) as any[];
      setManga(uniqueManga.slice(0, 12));
    } catch (err) {
      setError('Failed to load manga');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleMangaClick = (mangaId: string) => {
    navigate(`/manga/${mangaId}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Mango</h1>

        <div className="mb-12">
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-6">Latest Updates</h2>

          {loading && (
            <div className="flex justify-center py-12">
              <p className="text-gray-400">Loading manga...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-900 text-red-100 p-4 rounded-lg mb-6">
              {error}
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
        </section>
      </div>
    </div>
  );
};
