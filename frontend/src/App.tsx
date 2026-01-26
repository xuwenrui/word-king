import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// 懒加载页面组件
const Home = lazy(() => import('./pages/Home'));
const WordPractice = lazy(() => import('./pages/WordPractice'));
const WordManagement = lazy(() => import('./pages/WordManagement'));
const ArticleManagement = lazy(() => import('./pages/ArticleManagement'));
const ArticleReading = lazy(() => import('./pages/ArticleReading'));

const App: React.FC = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // 加载保存的主题
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkTheme(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    // 监听主题变化
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
      {/* 顶部导航栏 */}
      <nav className="bg-primary" style={{ 
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        backdropFilter: 'blur(20px)', 
        WebkitBackdropFilter: 'blur(20px)', 
        borderBottom: '1px solid var(--border-light)', 
        position: 'sticky', 
        top: 0, 
        zIndex: 100 
      }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src="/assets/logo.svg" alt="Word King Logo" style={{ width: '40px', height: '40px' }} />
              <Link to="/" style={{ fontSize: '24px', fontWeight: 700, color: 'var(--primary-color)', textDecoration: 'none' }}>Word King</Link>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <div className="nav">
                <Link to="/word-management" className="nav-link">单词管理</Link>
                <Link to="/article-management" className="nav-link">文章管理</Link>
                <Link to="/word-practice" className="nav-link">单词练习</Link>
                <Link to="/article-reading" className="nav-link">文章阅读</Link>
              </div>
              <button className="theme-toggle" onClick={toggleTheme}>
                <svg width="20" height="20">
                  {isDarkTheme ? (
                    <use href="/assets/icons.svg#icon-sun" />
                  ) : (
                    <use href="/assets/icons.svg#icon-moon" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>加载中...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/word-practice" element={<WordPractice />} />
          <Route path="/word-management" element={<WordManagement />} />
          <Route path="/article-management" element={<ArticleManagement />} />
          <Route path="/article-reading" element={<ArticleReading />} />
          <Route path="/article-reading/:id" element={<ArticleReading />} />
        </Routes>
      </Suspense>

      {/* 页脚 */}
      <footer>
        <div className="container">
          <p>&copy; 2026 Word King. 让英语学习更高效。</p>
        </div>
      </footer>
    </div>
  );
};

export default App;