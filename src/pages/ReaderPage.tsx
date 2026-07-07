import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useMangaChapter from '@/hooks/useMangaChapter';
import { useReader } from '@/hooks/useReader';
import { saveHistory } from '@/lib/db';
import { ChevronLeft, Settings, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ReaderPage: React.FC = () => {
  const { mangaId, chapterId } = useParams<{ mangaId: string, chapterId: string }>();
  const chapter = useMangaChapter(mangaId || '', chapterId || '');
  const [uiVisible, setUiVisible] = useState(true);
  const navigate = useNavigate();

  const pages = chapter?.images || [];
  
  const { currentPage, currentImageUrl, next, prev, isLoaded } = useReader(pages);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const hideUi = () => setUiVisible(false);
    const showUi = () => {
      setUiVisible(true);
      clearTimeout(timeout);
      timeout = setTimeout(hideUi, 2500);
    };

    window.addEventListener('mousemove', showUi);
    window.addEventListener('click', showUi);
    timeout = setTimeout(hideUi, 2500);

    return () => {
      window.removeEventListener('mousemove', showUi);
      window.removeEventListener('click', showUi);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (mangaId && chapterId) {
       saveHistory(mangaId, chapterId, currentPage);
    }
  }, [currentPage, mangaId, chapterId]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [next, prev]);

  if (!chapter) return <div className="min-h-screen bg-[#09090b] flex items-center justify-center text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#09090b] text-white relative overflow-hidden select-none">
      <AnimatePresence>
        {uiVisible && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 p-4 bg-black/60 backdrop-blur-md z-50 flex justify-between items-center border-b border-zinc-800"
          >
            <button onClick={() => navigate(-1)} className="flex items-center text-zinc-300 hover:text-white transition">
              <ChevronLeft className="mr-1" /> Back
            </button>
            <div className="text-center">
              <div className="text-sm font-bold text-zinc-100">{chapter.title}</div>
              <div className="text-xs text-zinc-400">Page {currentPage + 1} of {pages.length}</div>
            </div>
            <div className="flex items-center gap-4 text-zinc-300">
              <button className="hover:text-white transition"><List size={20} /></button>
              <button className="hover:text-white transition"><Settings size={20} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex h-screen items-center justify-center cursor-pointer" onClick={(e) => {
         const width = window.innerWidth;
         if (e.clientX < width / 3) prev();
         else if (e.clientX > (width / 3) * 2) next();
      }}>
        {!isLoaded && <div className="absolute inset-0 flex items-center justify-center animate-pulse bg-zinc-900">Loading Page...</div>}
        <img 
          src={currentImageUrl} 
          alt={`Page ${currentPage + 1}`} 
          className={`max-w-full max-h-screen object-contain transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`} 
        />
      </div>
    </div>
  );
};
