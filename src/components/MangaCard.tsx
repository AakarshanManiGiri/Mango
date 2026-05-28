import React from 'react';
import { Manga } from '@/types/mangadex';

interface MangaCardProps {
  manga: Manga;
  onClick?: (mangaId: string) => void;
}

export const MangaCard: React.FC<MangaCardProps> = ({ manga, onClick }) => {
  const handleClick = () => {
    if (onClick) onClick(manga.id);
  };

  const getCoverImageUrl = () => {
    const coverRelation = manga.relationships.find((r) => r.type === 'cover_art');
    if (coverRelation) {
      return `https://uploads.mangadex.org/covers/${manga.id}/${coverRelation.attributes.fileName}`;
    }
    return '/placeholder.svg';
  };

  const getTitle = () => {
    const title = manga.attributes.title;
    return title['en'] || Object.values(title)[0] || 'Unknown Title';
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-gray-800"
    >
      <div className="aspect-[3/4] overflow-hidden bg-gray-700">
        <img
          src={getCoverImageUrl()}
          alt={getTitle()}
          className="w-full h-full object-cover"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.src = '/placeholder.svg';
          }}
        />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-semibold text-white truncate">
          {getTitle()}
        </h3>
        <p className="text-xs text-gray-400 mt-1">
          {manga.attributes.status}
        </p>
      </div>
    </div>
  );
};
