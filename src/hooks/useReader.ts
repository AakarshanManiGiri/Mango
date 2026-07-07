import { useState, useEffect, useRef } from 'react';
import { MangaHookChapterImage } from '../types/mangahook';

export const useReader = (pages: MangaHookChapterImage[], initialPage: number = 0) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [loadedPages, setLoadedPages] = useState<Set<number>>(new Set());
  const [error, setError] = useState<string | null>(null);

  const prefetchQueue = useRef<Set<number>>(new Set());

  const preloadImage = (index: number) => {
    if (index >= pages.length || loadedPages.has(index) || prefetchQueue.current.has(index)) return;
    
    prefetchQueue.current.add(index);
    const img = new Image();
    img.src = pages[index].image;
    
    img.onload = () => {
      setLoadedPages(prev => new Set(prev).add(index));
      prefetchQueue.current.delete(index);
    };
    
    img.onerror = () => {
      prefetchQueue.current.delete(index);
    };
  };

  useEffect(() => {
    // Preload current and next 3 pages
    if (pages.length > 0) {
      preloadImage(currentPage);
      preloadImage(currentPage + 1);
      preloadImage(currentPage + 2);
      preloadImage(currentPage + 3);
    }
  }, [currentPage, pages]);

  const next = () => {
    if (currentPage < pages.length - 1) setCurrentPage(p => p + 1);
  };

  const prev = () => {
    if (currentPage > 0) setCurrentPage(p => p - 1);
  };

  return {
    currentPage,
    currentImageUrl: pages.length > 0 ? pages[currentPage].image : '',
    next,
    prev,
    isLoaded: loadedPages.has(currentPage),
    error
  };
};
