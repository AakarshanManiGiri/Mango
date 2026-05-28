import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getChapterPages, getChapterImageUrl } from '@/api/mangadex';
import { ChapterPages } from '@/types/mangadex';

export const ReaderPage: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const [chapterPages, setChapterPages] = useState<ChapterPages | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (chapterId) {
      loadChapterPages();
    }
  }, [chapterId]);

  const loadChapterPages = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getChapterPages(chapterId!);
      setChapterPages(data);
      setCurrentPage(0);
    } catch (err) {
      setError('Failed to load chapter pages');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const pages = chapterPages?.chapter.data || [];

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrevPage();
    if (e.key === 'ArrowRight') handleNextPage();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, pages.length]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <p>Loading chapter...</p>
      </div>
    );
  }

  if (error || !chapterPages) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-400 hover:text-blue-300"
          >
            Go Back
          </button>
          <div className="mt-4 bg-red-900 text-red-100 p-4 rounded-lg">
            {error}
          </div>
        </div>
      </div>
    );
  }

  const currentImageUrl = getChapterImageUrl(
    chapterPages.chapter.hash,
    pages[currentPage]
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-400 hover:text-blue-300"
          >
            Go Back
          </button>
          <p className="text-gray-400">
            Page {currentPage + 1} of {pages.length}
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <img
            src={currentImageUrl}
            alt={`Page ${currentPage + 1}`}
            className="max-w-full h-auto rounded-lg"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.alt = 'Failed to load page';
            }}
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 0}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded transition-colors"
          >
            Previous
          </button>

          <input
            type="range"
            min="0"
            max={pages.length - 1}
            value={currentPage}
            onChange={(e) => setCurrentPage(parseInt(e.target.value))}
            className="flex-1 mx-4 cursor-pointer"
          />

          <button
            onClick={handleNextPage}
            disabled={currentPage === pages.length - 1}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded transition-colors"
          >
            Next
          </button>
        </div>

        <p className="text-center text-gray-400 mt-4 text-sm">
          Use arrow keys to navigate pages
        </p>
      </div>
    </div>
  );
};
