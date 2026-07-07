import React from 'react';
import { MangaHookListItem } from '@/types/mangahook';

interface MangaCardProps {
  manga: MangaHookListItem;
  onClick: (id: string) => void;
}

export const MangaCard: React.FC<MangaCardProps> = ({ manga, onClick }) => {
  return (
    <div 
      className="group relative rounded-xl overflow-hidden cursor-pointer transition transform hover:-translate-y-1 hover:shadow-xl bg-zinc-900 border border-zinc-800"
      onClick={() => onClick(manga.id)}
    >
      <div className="aspect-[2/3] overflow-hidden">
        <img 
          src={manga.image} 
          alt={manga.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-sm line-clamp-2 text-zinc-200 group-hover:text-white">{manga.title}</h3>
        <p className="text-xs text-zinc-500 mt-1">{manga.chapter}</p>
      </div>
    </div>
  );
};
