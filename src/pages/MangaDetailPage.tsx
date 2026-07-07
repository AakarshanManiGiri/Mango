import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useManga from '@/hooks/useManga';

export const MangaDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const manga = useManga(id || '');
  const navigate = useNavigate();

  if (!manga) return <div className="min-h-screen bg-[#09090b] text-white flex justify-center items-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#09090b] text-[#fafafa]">
      <div className="container mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)} className="mb-6 text-zinc-400 hover:text-white transition">← Back</button>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3 lg:w-1/4">
            <img src={manga.imageUrl} alt={manga.name} className="w-full rounded-xl shadow-2xl border border-zinc-800" />
          </div>
          <div className="md:w-2/3 lg:w-3/4 flex flex-col">
            <h1 className="text-4xl font-bold mb-2">{manga.name}</h1>
            <p className="text-zinc-400 mb-6 font-medium">{manga.author}</p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {manga.genres.map(tag => (
                <span key={tag} className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs font-medium text-zinc-300">
                  {tag}
                </span>
              ))}
            </div>
            
            <div className="mb-8 p-4 bg-zinc-900/50 rounded-xl border border-zinc-800/50">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">Status</p>
                  <p className="font-medium text-zinc-200 mt-1">{manga.status}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">Views</p>
                  <p className="font-medium text-zinc-200 mt-1">{manga.view}</p>
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wider">Updated</p>
                  <p className="font-medium text-zinc-200 mt-1">{manga.updated}</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4 border-b border-zinc-800 pb-2">Chapters</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
              {manga.chapterList.map(ch => (
                <div 
                  key={ch.id} 
                  className="bg-zinc-900 border border-zinc-800 p-4 rounded-lg cursor-pointer hover:bg-zinc-800 transition flex justify-between items-center"
                  onClick={() => navigate(`/read/${id}/${ch.id}`)}
                >
                  <span className="font-medium">{ch.name}</span>
                  <span className="text-xs text-zinc-500">{ch.view}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
