import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMangaById, getChapters } from '@/api/mangadex';
import { Manga, Chapter } from '@/types/mangadex';

export const MangaDetailPage: React.FC = () => {
  const { mangaId } = useParams<{ mangaId: string }>();
  const [manga, setManga] = useState<Manga | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (mangaId) {
      loadMangaDetails();
    }
  }, [mangaId]);

  const loadMangaDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const mangaData = await getMangaById(mangaId!);
      setManga(mangaData);

      const chaptersResponse = await getChapters(mangaId!);
      const chaptersData = Array.isArray(chaptersResponse.data)
        ? chaptersResponse.data
        : [chaptersResponse.data];
      setChapters(chaptersData);
    } catch (err) {
      setError('Failed to load manga details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getCoverImageUrl = () => {
    if (!manga) return '/placeholder.svg';
    const coverRelation = manga.relationships.find((r) => r.type === 'cover_art');
    if (coverRelation) {
      return `https://uploads.mangadex.org/covers/${manga.id}/${coverRelation.attributes.fileName}`;
    }
    return '/placeholder.svg';
  };

  const getTitle = () => {
    if (!manga) return 'Unknown';
    const title = manga.attributes.title;
    return title['en'] || Object.values(title)[0] || 'Unknown Title';
  };

  const getDescription = () => {
    if (!manga) return '';
    const desc = manga.attributes.description;
    return desc['en'] || Object.values(desc)[0] || 'No description available';
  };

  const handleChapterClick = (chapterId: string) => {
    navigate(`/read/${chapterId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <p>Loading manga details...</p>
      </div>
    );
  }

  if (error || !manga) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => navigate('/')}
            className="text-blue-400 hover:text-blue-300"
          >
            ← Back to Home
          </button>
          <div className="mt-4 bg-red-900 text-red-100 p-4 rounded-lg">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/')}
          className="mb-8 text-blue-400 hover:text-blue-300"
        >
          Back to Home
        </button>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <img
              src={getCoverImageUrl()}
              alt={getTitle()}
              className="w-full rounded-lg shadow-lg"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src = '/placeholder.svg';
              }}
            />
            <div className="mt-4">
              <p className="text-sm text-gray-400">Status</p>
              <p className="font-semibold capitalize">
                {manga.attributes.status}
              </p>
            </div>
          </div>

          <div className="md:col-span-3">
            <h1 className="text-4xl font-bold mb-2">{getTitle()}</h1>
            <p className="text-gray-400 mb-6">{getDescription()}</p>

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Chapters ({chapters.length})</h2>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {chapters.map((chapter) => (
                  <div
                    key={chapter.id}
                    onClick={() => handleChapterClick(chapter.id)}
                    className="p-3 bg-gray-800 hover:bg-gray-700 rounded cursor-pointer transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">
                          {chapter.attributes.title ||
                            `Chapter ${chapter.attributes.chapter}`}
                        </p>
                        <p className="text-sm text-gray-400">
                          {new Date(
                            chapter.attributes.publishAt
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      <span className="text-blue-400"></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
