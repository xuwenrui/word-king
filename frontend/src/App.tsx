import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// 懒加载页面组件
const Home = lazy(() => import('./pages/Home'));
const WordPractice = lazy(() => import('./pages/WordPractice'));
const WordManagement = lazy(() => import('./pages/WordManagement'));
const ArticleManagement = lazy(() => import('./pages/ArticleManagement'));
const ArticleReading = lazy(() => import('./pages/ArticleReading'));

const App: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkTheme(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'theme') {
        setIsDarkTheme(e.newValue === 'dark');
        if (e.newValue === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark');
        } else {
          document.documentElement.removeAttribute('data-theme');
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    if (newTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="app">
      <Navbar isDarkTheme={isDarkTheme} onToggle={toggleTheme} />

      <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>加载中...</div>}>
        <Routes>
          <Route path="/" element={<Home isDarkTheme={isDarkTheme} />} />
          <Route path="/word-practice" element={<WordPractice isDarkTheme={isDarkTheme} />} />
          <Route path="/word-management" element={<WordManagement />} />
          <Route path="/article-management" element={<ArticleManagement />} />
          <Route path="/article-reading" element={<ArticleReading isDarkTheme={isDarkTheme} />} />
          <Route path="/article-reading/:id" element={<ArticleReading isDarkTheme={isDarkTheme} />} />
        </Routes>
      </Suspense>

      <Footer />
    </div>
  );
};

export default App;
