import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import WordPractice from './pages/WordPractice';
import WordManagement from './pages/WordManagement';
import ArticleManagement from './pages/ArticleManagement';
import ArticleReading from './pages/ArticleReading';

const App: React.FC = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/word-practice" element={<WordPractice />} />
        <Route path="/word-management" element={<WordManagement />} />
        <Route path="/article-management" element={<ArticleManagement />} />
        <Route path="/article-reading/:id" element={<ArticleReading />} />
      </Routes>
    </div>
  );
};

export default App;