import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  HomePage,
  SearchPage,
  MangaDetailPage,
  ReaderPage,
} from '@/pages';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/manga/:id" element={<MangaDetailPage />} />
        <Route path="/read/:mangaId/:chapterId" element={<ReaderPage />} />
      </Routes>
    </Router>
  );
};

export default App;
